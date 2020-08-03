let express = require('express')
let router = new express.Router()
const bodyParser = require('body-parser')
const addressModel = require('../db/model/u_address')
const userModel = require('../db/model/user')
// 引入工具
const tools = require('../utils/index')
const tokenUtil = require('../utils/token')

const NAME = 'address'
const ID_HEAD = '19002' // 收货地址的头部id

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
/**
 * 创建 （验证token）
 * 必须参数 { name, phone, province, city, area }
 */
router.post(`/${NAME}/create`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { name, phone, province, city, area, areaCode } = req.body
        if (!name || !phone || !province || !city || !area || !areaCode) {
            result.msg = '参数不能为空'
            res.json(result)
            return
        }
        const token = req.headers['authorization-token']
        let decode_user = tokenUtil.decodeToken(token)
        let user = decode_user.payload.data
        let admin = await userModel.findOne({ id: user.id, del_flag: 0 })
        if (!admin) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let address_num = await addressModel.find({}).countDocuments() + 1
        let address = {
            id: ID_HEAD + tools.PrefixZero(address_num, 7),
            name: '',
            user_id: user.id,
            phone: '',
            province: '',
            city: '',
            area: '',
            areaCode: ''
        }
        address = Object.assign(address, req.body)
        if (address.hasOwnProperty('default_flag') && address.default_flag === '1') {
            // await addressModel.update({ user_id: user.id, default_flag: 1 }, { default_flag: 0 },  { multi: true }) // 已启用
            await addressModel.updateMany({ user_id: user.id, default_flag: 1 }, { default_flag: 0 },  { multi: true })
        }
        let create_address = await addressModel.create(address)
        if (create_address) {
            let new_address = {
                area: create_address.area,
                city: create_address.area,
                default_flag: create_address.default_flag,
                detail_address: create_address.detail_address,
                id: create_address.id,
                name: create_address.name,
                phone: create_address.phone,
                post_code: create_address.post_code,
                province: create_address.province,
                user_id: create_address.user_id,
                areaCode: create_address.areaCode
            }
            result.msg = '创建成功'
            result.code = 1
            result.count = 1
            result.data = new_address
        } else {
            result.msg = '创建失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 根据id获取收货地址详情 （验证token）
 *  必须参数 { a_id }
 */
router.get(`/${NAME}/detail`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
       let { a_id } = req.query
       if (!a_id) {
           result.msg = '所需参数不能为空'
           res.json(result)
           return
       }
       const token = req.headers['authorization-token']
       let decode_user = tokenUtil.decodeToken(token)
       let user = decode_user.payload.data
       let admin = await userModel.findOne({ id: user.id, del_flag: 0 })
       if (!admin) {
           result.msg = '用户不存在'
           res.json(result)
           return
       }
       let find_address = await addressModel.findOne({ id: a_id, del_flag: 0 }, { _id: 0, create_time: 0, del_flag: 0 })
       if (find_address) {
            result.code = 1
            result.msg = '查询成功'
            result.data = find_address
            result.count = 1
       } else {
           result.msg = '查询的收货地址不存在'
       }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 修改（验证token）
 * 必须参数（{ a_id，name, phone, province, city, area }）
 */
router.post(`/${NAME}/update`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { id, name, phone, province, city, area, areaCode } = req.body
        if (!id || !name || !phone || !province || !city || !area || !areaCode) {
            result.msg = '所需参数不能为空'
            res.json(result)
            return
        }
        let address = {
                name,
                phone,
                province,
                city,
                area,
                areaCode
        }
        address = Object.assign(address, req.body)
        const token = req.headers['authorization-token']
        let decode_user = tokenUtil.decodeToken(token)
        let user = decode_user.payload.data
        let admin = await userModel.findOne({ id: user.id, del_flag: 0 })
        if (!admin) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        if (address.hasOwnProperty('default_flag') && address.default_flag === '1') {
          // await addressModel.update({ user_id: admin.id, default_flag: 1 }, { default_flag: 0 },  { multi: true }) update已弃用
          await addressModel.updateMany({ user_id: admin.id, default_flag: 1 }, { default_flag: 0 })
        }
        delete address.id
        delete address.user_id
        let find_address = await addressModel.findOne({ id: id, del_flag: 0 })
        if (find_address) {
            let update_address = await addressModel.findOneAndUpdate({ id: id, del_flag: 0}, { $set: address }, { new: true })
            if( update_address) {
                let new_address = {
                    area: update_address.area,
                    areaCode: update_address.areaCode,
                    city: update_address.city,
                    default_flag: update_address.default_flag,
                    detail_address: update_address.detail_address,
                    id: update_address.id,
                    name: update_address.name,
                    phone: update_address.phone,
                    post_code: update_address.post_code,
                    province: update_address.province,
                    user_id: update_address.user_id
                }
                result.code = 1
                result.msg = '修改成功'
                result.data = new_address
                result.count = 1
            } else {
                result.msg = '修改失败'
            }
        } else {
            result.msg = '收货地址不存在'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 删除（验证token）
 * 必须参数（{ a_id }）
 */
router.post(`/${NAME}/delete`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { a_id } = req.body
        if (!a_id) {
            result.msg = '所需参数不能为空'
            res.json(result)
            return
        }
        const token = req.headers['authorization-token']
        let decode_user = tokenUtil.decodeToken(token)
        let user = decode_user.payload.data
        let admin = await userModel.findOne({ id: user.id, del_flag: 0 })
        if (!admin) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let update_address = await addressModel.findOneAndUpdate({ id: a_id, del_flag: 0 }, { $set: { del_flag: 1 } }, { new: true })
        if (update_address) {
            result.code = 1
            result.msg = '删除成功'
            result.data = update_address
            result.count = 1
        } else {
            result.msg = '删除失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 获取用户自己的收货地址（验证token）
 */
router.get(`/${NAME}/getAddressListByUserId`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        const token = req.headers['authorization-token']
        let decode_user = tokenUtil.decodeToken(token)
        let user = decode_user.payload.data
        let admin = await userModel.findOne({ id: user.id, del_flag: 0 })
        if (!admin) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let find_address = await addressModel.find({ user_id: user.id, del_flag: 0 }, { _id: 0, create_time: 0, del_flag: 0 })
        if (find_address) {
            result.code = 1
            result.msg = '获取成功'
            result.data = find_address
            result.count = find_address.length
        } else {
            result.msg = '获取失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})

module.exports = router