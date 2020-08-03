let express = require('express')
let router = new express.Router()
let bodyParser = require('body-parser')
let userModel = require('../db/model/user')
let productModel = require('../db/model/product')
let tokenUtil = require('../utils/token')
const qs = require('qs')
let orderModel = require('../db/model/order')
// 引入工具
var tools = require('../utils/index')
let db = require('../db/index')
const NAME = 'product'
const ID_HEAD = '19003'

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

/**
 * 新增(需验证token)
 * 必须参数 （{  name, price, old_price, coupon }）
 */
router.post(`/${NAME}/create`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { name, price, old_price, coupon, imageList, imgUrl } = req.body
        if ( !name || !price || !old_price || !coupon || !imageList || !imgUrl) {
            result.msg = '所需参数不能为空'
            res.json(result)
            return
        }
        const token = req.headers['authorization-token']
        let { payload } = tokenUtil.decodeToken(token)
        let login_user = payload.data
        let admin = await userModel.findOne({ del_flag: 0, id: login_user.id })
        if (!admin) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let product_num = await productModel.find({}).countDocuments() + 1
        let product = {
            id: ID_HEAD + tools.PrefixZero(product_num, 5),
            user_id: login_user.id,
            name,
            price,
            old_price,
            coupon,
            imageList,
            imgUrl
        }
        product = Object.assign(product, req.body)
        let create_product = await productModel.create(product, { new: true })
        if (!create_product) {
            result.msg = '创建失败'
        } else {
            result.data = create_product
            result.count = 1
            result.msg = '创建成功'
            result.code = 1
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 修改(需验证token)
 * 必须参数 （{ p_id, name, price, old_price, coupon }）
 */
router.post(`/${NAME}/update`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { p_id, name, price, old_price, coupon } = req.body
        if (!p_id || !name || !price || !old_price || !coupon) {
            result.msg = '所需参数不能为空'
            res.json(result)
            return
        }
        let product = {
            id: p_id,
            name,
            price,
            old_price,
            coupon
        }
        product = Object.assign(product, req.body)
        let find_produce = await productModel.findOne({id: p_id, del_flag: 0})
        if (find_produce) {
            let new_product = await productModel.findOneAndUpdate({id: p_id, del_flag: 0 }, product ,{ new: true })
            if (new_product) {
                result.data = new_product
                result.code = 1
                result.count = 1
                result.msg = '修改成功'
            } else {
                result.msg = '修改失败'
            }
        } else {
            result.msg = '修改的商品不存在'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 删除(需验证token)
 * 必须参数 （{ p_id }）
 */
router.post(`/${NAME}/delete`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { p_id} = req.body
        if (!p_id) {
            result.msg = '所需参数不能为空'
            res.json(result)
            return
        }
        let find_produce = await productModel.findOne({ id: p_id, del_flag: 0 })
        if (find_produce) {
            find_produce.del_flag = 1
            let new_product = await productModel.findOneAndUpdate({id: p_id, del_flag: 0 }, find_produce ,{ new: true })
            if (new_product) {
                result.data = new_product
                result.code = 1
                result.count = 1
                result.msg = '删除成功'
            } else {
                result.msg = '删除失败'
            }
        } else {
            result.msg = '删除的商品不存在'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 查询(需验证token)
 * 必须参数（{ p_id }）
 */
router.post(`/${NAME}/detail`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { p_id } = req.body
        if (!p_id) {
            result.msg = '所需参数不能为空'
            res.json(result)
            return
        }
        let find_produce = await productModel.findOne({ id: p_id, del_flag: 0 }, { del_flag: 0, _id: 0 })
        if (find_produce) {
            result.data = find_produce
            result.code = 1
            result.count = 1
            result.msg = '查询成功'
        } else {
            result.msg = '查询的商品不存在'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 获取商品列表（需验证token）
 */
router.post(`/${NAME}/getProductList`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: '',
        total: 0
    }
    try {
        let query = {
          number: 10,
          page: 1
        }
        query = Object.assign(query, req.body)
        query.number = parseInt(query.number)
        query.page = parseInt(query.page)
        const token = req.headers['authorization-token']
        let { payload } = tokenUtil.decodeToken(token)
        let user = payload.data
        let admin = await userModel.findOne({ del_flag: 0, id: user.id })
        if (!admin) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let productList = await productModel.find({ del_flag: 0 }, { _id: 0 })
        if (productList) {
          result.total = productList.length
          let arr = productList.slice((query.page - 1) * query.number, query.page * query.number)
          result.code = 1
          result.data = arr
          result.count = arr.length
          result.msg = '获取成功'
        } else {
          result.msg = '获取失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 购买商品（需验证token）
 */
router.post(`/${NAME}/toBuyProducts`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    const token = req.headers['authorization-token']
    let { payload } = tokenUtil.decodeToken(token)
    let user = payload.data
    let admin = await userModel.findOne({ del_flag: 0, id: user.id })
    if (!admin) {
        result.msg = '用户不存在'
        res.json(result)
        return
    }
    let productList = {}
    let userMoney = admin.balance
    let allPrice = 0
    productList = Object.assign(productList, qs.parse(req.body))
    let count = 0
    let second_count = 0
    try {
        await Promise.all(Object.keys(productList).map(async (key) => {
            let { id, number, message, addressId, address  } =  productList[key]
            number = parseInt(number)
            let product = await productModel.findOne({ id: id, del_flag: 0})
            allPrice += product.price * number
            if(product.price * number > userMoney) {
                throw '用户余额不足'
            }
            if (product.stock <= 0 || number > product.stock) {
                throw '商品库存不足'
            }
        }))
        if (allPrice > userMoney) {
            throw '用户余额不足'
        }
        let o_num =  await orderModel.find({}).countDocuments() + 1
        let order_n = []
        Object.keys(productList).forEach((e, i) => {
          order_n.push(o_num)
          o_num += 1
        })
        await Object.keys(productList).map(async (key, index) => {
            let { id, number, message, addressId, address } =  productList[key]
            let product = await productModel.findOne({ id: id, del_flag: 0 })
            second_count = 1
            number = parseInt(number)
            let new_user = await userModel.findOneAndUpdate({ id: admin.id, del_flag: 0}, { $inc: { balance: - (product.price * number) }}, { new: true})     
            if (!new_user) {
              throw '信息修改失败'
            }
            second_count = 2
            let new_product = await productModel.findOneAndUpdate({ id: id, del_flag: 0}, { $inc: { sell_number: number, stock: -number}}, { new: true})
            if (!new_product) {
              throw '信息修改失败'
            }
            let order = {
              id: '19005' +  tools.PrefixZero(order_n[index], 5),
              user_id: admin.id,
              product_id: product.id,
              address_id: addressId,
              number: number,
              info: message,
              price: product.price,
              total_price: number * product.price
            }
            second_count = 3
            let orders = await orderModel.create(order)
            if (!orders) {
              throw '订单创建失败'
            }
            count += 1
            second_count = 0
        })
        result.code = 1
        result.msg = '成功'
    } catch (err) {
        console.log('err')
        console.log('count: ' + count)
        console.log('second_count: ' + second_count)
        result.msg = err
        let arr = Object.keys(productList).slice(0, 1)
        if (count === 0 && second_count !== 0) {
            await Promise.all(arr.map(async (key) => {
                let { id, number, message, addressId, address } =  productList[key]
                number = parseInt(number)
                let product = await productModel.findOne({ id: id, del_flag: 0})
                if (second_count === 2) {
                    await userModel.findOneAndUpdate({ id: admin.id, del_flag: 0}, { $inc: { balance: product.price * number }})
                } else if (second_count === 3) {
                    await userModel.findOneAndUpdate({ id: admin.id, del_flag: 0}, { $inc: { balance: product.price * number }})
                    await productModel.findOneAndUpdate({ id: id, del_flag: 0 }, { $inc: { sell_number: -number, stock: number}})
                }
                count -= 1
            }))
        }
        while (count > 0) {
            let arr = Object.keys(productList).slice(0, count)
            await Promise.all(arr.map(async (key) => {
                let { id, number, message, addressId, address } =  productList[key]
                number = parseInt(number)
                let product = await productModel.findOne({ id: id, del_flag: 0})
                if (second_count === 0) {
                    let orderList = await orderModel.find({}).sort({ _id: -1 })
                    let del_order = orderList[0]
                    if (!del_order) {
                        await orderModel.deleteOne({ id: del_order.id })
                    }
                    await userModel.findOneAndUpdate({ id: admin.id, del_flag: 0}, { $inc: { balance: product.price * number }})
                    await productModel.findOneAndUpdate({ id: id, del_flag: 0 }, { $inc: { sell_number: -number, stock: number}})
                } else if (second_count === 2) {
                    await userModel.findOneAndUpdate({ id: admin.id, del_flag: 0}, { $inc: { balance: product.price * number }})
                } else if (second_count === 3) {
                    await userModel.findOneAndUpdate({ id: admin.id, del_flag: 0}, { $inc: { balance: product.price * number }})
                    await productModel.findOneAndUpdate({ id: id, del_flag: 0 }, { $inc: { sell_number: -number, stock: number}})
                }
                count -= 1
            }))
        }
    }
    res.json(result)
})
/**
 * 修改订单（需验证token）
 */
router.post(`/${NAME}/toUpDateOrderStatus`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    let { status, id } = req.body
    if (!status || !id) {
      result.msg = '参数不能为空'
      res.json(result)
      return
    }
    const token = req.headers['authorization-token']
    let { payload } = tokenUtil.decodeToken(token)
    let user = payload.data
    let admin = await userModel.findOne({ del_flag: 0, id: user.id })
    if (!admin) {
        result.msg = '用户不存在'
        res.json(result)
        return
    }
    try {
      let find_order = await orderModel.findOne({ id: id, del_flag: 0 })
      if (!find_order) {
        result.msg = '订单不存在'
        res.json(result)
        return
      }
      let update_order = await orderModel.findOneAndUpdate({ id: id, del_flag: 0 }, { $set: { status: status }})
      if (!update_order) {
        result.msg = '修改失败'
        res.json(result)
        return
      }
      result.msg = '订单修改成功'
      result.code = 1
      result.count = 0
    } catch (err) {
      result.msg = err
    }
    res.json(result)
})
module.exports = router