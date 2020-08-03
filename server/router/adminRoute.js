let express = require('express')
let router = new express.Router()
let bodyParser = require('body-parser')
let userModel = require('../db/model/user')
let orderModel = require('../db/model/order')
const questionModel = require('../db/model/question')
const tokenUtil = require('../utils/token')
// 引入工具
var tools = require('../utils/index')
const NAME = 'admin'

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

/**
 * 登录
 * 必须参数 （{ user_number，password }）
 * user_number：登录账号
 */
router.post(`/${NAME}/login`, async (req, res) => {
  let result = {
      code: 0,
      data: [],
      count: '',
      msg: ''
  }
  try{
      let user = {
        user_number: '',
        password: ''
      }
      user = Object.assign(user, req.body)
      let one_user = await userModel.findOne({ user_number: user.user_number, del_flag: 0, type: 1 })
      if (one_user) {
          if (one_user.password === user.password) {
              let new_user = {
                  id: one_user.id,
                  name: one_user.name,
                  user_number: one_user.user_number,
                  age: one_user.age,
                  sex: one_user.sex,
                  avatar: one_user.avatar,
                  intro: one_user.intro,
                  create_time: one_user.create_time,
                  address: one_user.address,
                  balance: one_user.balance
              }
              result.code = 1
              result.msg = '登录成功'
              result.data = new_user
              result.count = 1
              let token = tokenUtil.createToken(one_user)
              result.token = token
          } else {
              result.msg = '密码错误'
          }
      } else {
          result.msg = '用户不存在'
      }
  } catch (err) {
      result.msg = err
  }
  res.json(result)
})
/**
 * 获取order列表（需要验证token，经超级用户可以获取）
 */
router.post(`/${NAME}/getOrders`, tools.autotoken, async (req, res) => {
  let result = {
      code: 0,
      data: [],
      count: '',
      msg: '',
      total: 0
  }
  try{
      let query = {
        page: 1,
        number: 10,
        del_flag: 0
      }
      query = Object.assign(query, req.body)
      let page = parseInt(query.page)
      let number = parseInt(query.number)
      let users = null
      const token = req.headers['authorization-token']
      const { payload } = tokenUtil.decodeToken(token)
      const login_user = payload.data
      users = await userModel.findOne({ del_flag: 0, id: login_user.id, type: 1 })
      console.log('user---1')
      if (!users) {
        result.msg = '用户不存在'
        res.json(result)
        return
      }
      let orders = null
      orders = await orderModel.aggregate([ // 联表查询
        {
          $lookup: {
            from:"users",
            localField:"user_id",
            foreignField:"id",
            as:"User"
          },
        }, {
          $lookup: {
            from:"products",
            localField:"product_id",
            foreignField:"id",
            as:"Product"
          }
        }, {
          $lookup: {
            from:"u_addresses",
            localField:"address_id",
            foreignField:"id",
            as:"Address"
          }
        }, {
          $match: {
            "del_flag": 0
          }
        }, {
          $project:{ info: 1, status: 1, id: 1, number: 1, price: 1, total_price: 1, _id: 0, create_time: 1,
            User: { id: 1, name: 1, avatar: 1, create_time: 1 },
            Product: { id: 1, imageList: 1, name: 1, imgUrl: 1, create_time: 1 },
            Address: { id: 1, detail_address: 1, name: 1, phone: 1}
          }
        }
      ])
      if (!orders) {
        result.msg = '订单获取失败'
        res.json(result)
        return
      }
      result.code = 1
      result.total = orders.length
      result.data = orders.slice(parseInt(page -1)*number, parseInt(page * number))
      result.msg = '查询成功'
  } catch (err) {
      result.msg = err
  }
  res.json(result)
})

module.exports = router