let express = require('express')
let router = new express.Router()
let bodyParser = require('body-parser')
let userModel = require('../db/model/user')
let orderModel = require('../db/model/order')
const questionModel = require('../db/model/question')
const tokenUtil = require('../utils/token')
// 引入工具
var tools = require('../utils/index')
const NAME = 'user'
const ID_HEAD = '19001'

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

/**
 * 注册
 * 必须参数（{ user_number，name， password}）
 */
router.post(`/${NAME}/register`, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: ''
  }
  try {
    let { user_number, name, password } = req.body
    if (!user_number || !name || !password) {
      result.msg = '所需参数不能为空'
      res.json(result)
      return
    }
    let user_num = await userModel.find({}).countDocuments() + 1
    let user = {
      id: ID_HEAD + tools.PrefixZero(user_num, 5),
      name,
      user_number,
      password
    }
    user = Object.assign(user, req.body)
    let find_user = await userModel.findOne({ user_number: user.user_number, del_flag: 0 })
    if (find_user) {
      result.msg = '账号已存在，请换个账号试试'
    } else {
      let create_user = await userModel.create(user)
      if (!create_user) {
        result.msg = '注册失败'
        res.json(result)
        return
      }
      result.msg = '注册成功'
      result.data = create_user
      result.count = 1
      result.code = 1
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
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
  try {
    let user = {
      user_number: '',
      password: ''
    }
    user = Object.assign(user, req.body)
    let one_user = await userModel.findOne({ user_number: user.user_number, del_flag: 0, type: 0 })
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
 * 获取关注好友列表(需验证token)
 */
router.get(`/${NAME}/friends`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: ''
  }
  try {
    const token = req.headers['authorization-token']
    let decode_user = tokenUtil.decodeToken(token)
    let user = decode_user.payload.data
    let admin = await userModel.findOne({ id: user.id, del_flag: 0 })
    if (!admin) {
      result.msg = '不存在该用户'
      res.json(result)
    }
    let friends = admin.friends_ids
    let arr
    if (friends === '') {
      arr = []
    } else {
      arr = friends.split(',')
    }
    // await arr.forEach(async (element) => {
    //     let find_friend = await userModel.findOne({ id: element, del_flag: 0 }, { _id: 0, id: 1, name: 1, avatar: 1, intro: 1, sex: 1, address: 1})
    //     console.log(element, find_friend)
    //     result.data.push(find_friend)
    // })
    // result.data = await bianli(arr)
    await Promise.all(arr.map(async function (item) {
      let find_friend = await userModel.findOne({ id: item, del_flag: 0 }, { _id: 0, id: 1, name: 1, avatar: 1, intro: 1, sex: 1, address: 1 })
      result.data.push(find_friend)
    }
    ))
    result.count = result.data.length
    result.msg = '查询成功'
    result.code = 1
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 添加（删除好友）好友(需验证token)，根据查询用户id,以及需要添加的好友friend_id
 * 需要的参数 { id, friend_id, type = 1 }
 * type: 0: 删除，1：添加
 */
router.post(`/${NAME}/followFriend`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: '',
    msg: ''
  }
  try {
    let user_id = req.body.id
    let friend_id = req.body.friend_id
    let type = req.body.type || 1
    if (!user_id || !friend_id) {
      result.msg = '所需参数不能为空'
      res.json(result)
    }
    let find_user = await userModel.findOne({ id: user_id, del_flag: 0 }) // 查询自身是否存在
    let find_friend = await userModel.findOne({ id: friend_id, del_flag: 0 }) // 查询需要添加的好友是否存在
    if (!find_user || !find_friend) {
      result.msg = '不存在该用户'
      res.json(result)
    }
    let ids = find_user.friends_ids.split(',')
    if (type === 1) {
      ids.push(find_friend.id)
    } else {
      let i = ids.findIndex(elem => elem === friend_id)
      if (i !== -1)
        ids.splice(i, 1)
    }
    let str_ids = ids.join(',')
    find_user.friends_ids = str_ids // 将查询的friends_ids更新
    let update_user = await userModel.findOneAndUpdate({ id: find_user.id, del_flag: 0 }, find_user, { new: true })
    if (!update_user) {
      result.msg = '修改失败'
      res.json(result)
    }
    result.data = update_user
    result.count = 1
    result.msg = '修改成功'
    result.code = 1
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 删除（需验证token）
 * 必须参数（{ u_id }）
 */
router.get(`/${NAME}/delete`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: '',
    msg: ''
  }
  try {
    let { u_id } = req.query
    if (!u_id) {
      result.msg = '所需参数不能为空'
      res.json(result)
    }
    let find_user = await userModel.findOne({ id: u_id, del_flag: 0 }) // 查询自身是否存在
    if (!find_user) {
      result.msg = '不存在该用户'
      res.json(result)
      return
    }
    find_user.del_flag = 1
    let update_user = await userModel.findOneAndUpdate({ id: find_user.id, del_flag: 0 }, find_user, { new: true })
    if (!update_user) {
      result.msg = '删除失败'
      res.json(result)
      return
    }
    result.data = update_user
    result.count = 1
    result.msg = '删除成功'
    result.code = 1
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 修改自身信息（需验证token）
 * 必须参数（{ id，name，password }）
 * user_number：用户账号唯一，不可变
 */
router.post(`/${NAME}/update`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: '',
    msg: ''
  }
  try {
    let { id } = req.body
    if (!id) {
      result.msg = '所需参数不能为空'
      res.json(result)
    }
    let token = req.headers['authorization-token']
    let decode_user = tokenUtil.decodeToken(token)
    if (decode_user.payload.data.id !== id) {
      result.msg = '非本人操作'
      res.json(result)
      return
    }
    let find_user = await userModel.findOne({ id: id, del_flag: 0 }) // 查询自身是否存在
    if (!find_user) {
      result.msg = '不存在该用户'
      res.json(result)
      return
    }
    let { password } = req.body
    if (password) {
      if (password === find_user.password) {
        let { new_password } = req.body
        if (new_password) {
          find_user.password = new_password
        }
      } else {
        result.msg = '密码错误'
        res.json(result)
        return
      }
    }
    // 将无法修改的属性删除，防止修改了
    let mid = req.body
    delete mid.user_number
    delete mid.create_time
    delete mid.id
    delete mid.balance
    find_user = Object.assign(find_user, mid)
    let update_user = await userModel.findOneAndUpdate({ id: id, del_flag: 0 }, find_user, { new: true })
    if (!update_user) {
      result.msg = '修改失败'
      res.json(result)
      return
    }
    let new_user = {
      id: update_user.id,
      name: update_user.name,
      user_number: update_user.user_number,
      age: update_user.age,
      sex: update_user.sex,
      avatar: update_user.avatar,
      intro: update_user.intro,
      create_time: update_user.create_time,
      address: update_user.address,
      balance: update_user.balance
    }
    result.data = new_user
    result.count = 1
    result.msg = '修改成功'
    result.code = 1
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 查询（需验证token）
 * 必须参数（{ u_id }）
 */
router.get(`/${NAME}/detail`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: ''
  }
  try {
    let { u_id } = req.body
    if (!u_id) {
      result.msg = '所需参数不能为空'
      res.json(result)
    }
    let find_user = await userModel.findOne({ id: u_id, del_flag: 0 }, { _id: 0, id: 1, name: 1, user_number: 1, age: 1, sex: 1, avatar: 1, intro: 1, address: 1 }) // 查询是否存在
    if (!find_user) {
      result.msg = '不存在该用户'
      res.json(result)
      return
    }
    result.data = find_user
    result.count = 1
    result.msg = '查询成功'
    result.code = 1
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 根据token获取当前用户的信息
 * 必须参数{{ token }}
 */
router.get(`/${NAME}/info`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: '',
    msg: ''
  }
  try {
    const token = req.headers['authorization-token']
    let decode_user = tokenUtil.decodeToken(token)
    console.log(decode_user.payload.data)
    let user = decode_user.payload.data
    let find_user = await userModel.findOne({ id: user.id, del_flag: 0 })
    if (find_user) {
      let new_user = {
        id: find_user.id,
        name: find_user.name,
        user_number: find_user.user_number,
        age: find_user.age,
        sex: find_user.sex,
        avatar: find_user.avatar,
        intro: find_user.intro,
        create_time: find_user.create_time,
        address: find_user.address,
        balance: find_user.balance
      }
      result.code = 1
      result.count = 1
      result.msg = '拉取用户信息成功'
      result.data = new_user
    } else {
      result.msg = '拉取用户信息失败'
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 根据用户id获取用户的信息
 * 必须参数{{ u_id }}
 */
router.get(`/${NAME}/infoById`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: '',
    msg: ''
  }
  try {
    let { u_id } = req.query
    if (!u_id) {
      result.msg = '所需参数不能为空'
      res.json(result)
    }
    let find_user = await userModel.findOne({ id: u_id, del_flag: 0 })
    if (find_user) {
      let new_user = {
        id: find_user.id,
        name: find_user.name,
        user_number: find_user.user_number,
        age: find_user.age,
        sex: find_user.sex,
        avatar: find_user.avatar,
        intro: find_user.intro,
        create_time: find_user.create_time,
        address: find_user.address,
        balance: find_user.balance
      }
      result.code = 1
      result.count = 1
      result.msg = '获取用户信息成功'
      result.data = new_user
    } else {
      result.msg = '获取用户信息失败'
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 查询，根据账号精确查询或者根据昵称进行模糊查询（除了自己，支持分页）
 * 可选参数 { page, number, content }
 * page：查询第几页，number：每一页的数量，content：模糊查询的内容
 */
router.post(`/${NAME}/find`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: '',
    total: 0
  }
  try {
    let { content } = req.body
    let user = {
      del_flag: 0,
      page: 1,
      number: 10
    }
    user = Object.assign(user, req.body)
    let page = parseInt(user.page)
    let number = parseInt(user.number)
    // delete question.page
    // delete question.number
    let users = null
    const token = req.headers['authorization-token']
    const { payload } = tokenUtil.decodeToken(token)
    const login_user = payload.data
    if (!content) {
      users = await userModel.find({ del_flag: 0, id: { $nin: login_user.id } }, { id: 1, name: 1, user_number: 1, age: 1, sex: 1, avatar: 1, intro: 1, create_time: 1, address: 1, balance: 1, _id: 0 })
    } else {
      let query = new RegExp(content, 'i') // 模糊查询参数
      user_a = await userModel.find({ del_flag: 0, $or: [{ 'name': query }], id: { $nin: login_user.id } }, { id: 1, name: 1, user_number: 1, age: 1, sex: 1, avatar: 1, intro: 1, create_time: 1, address: 1, balance: 1, _id: 0 })
      user_b = await userModel.find({ del_flag: 0, user_number: content, id: { $nin: login_user.id } }, { id: 1, name: 1, user_number: 1, age: 1, sex: 1, avatar: 1, intro: 1, create_time: 1, address: 1, balance: 1, _id: 0 })
      let tmp = user_a.concat(user_b)
      // console.log(tmp)
      // console.log(new Set(tmp))
      // users = Array.from(new Set(tmp))
      users = tools.duplicateRemoval(tmp)
    }
    if (users) {
      let admin = await userModel.findOne({ del_flag: 0, id: login_user.id })
      let arr = admin.friends_ids.split(',')
      result.total = users.length
      users = users.slice((page - 1) * number, page * number)
      for (let i = 0; i < users.length; i++) {
        let item = {
          address: users[i].address,
          age: users[i].age,
          avatar: users[i].avatar,
          balance: users[i].balance,
          create_time: users[i].create_time,
          id: users[i].id,
          intro: users[i].intro,
          name: users[i].name,
          sex: users[i].sex,
          user_number: users[i].user_number,
          isFollow: false
        }
        if (arr.findIndex(e => e === users[i].id) > -1) {
          item.isFollow = true
        }
        users.splice(i, 1, item)
      }
      // users.forEach((item, index) => {
      //   Object.defineProperty(users[index], 'isFollow', {
      //     set(newVal) {
      //       value = newVal
      //     },
      //     get() { return value }
      //   })
      //   users[index].isFollow = false
      //   if (arr.findIndex(e => e === item.id) > -1) {
      //     console.log('users----->')
      //     users[index].isFollow = true
      //     console.log(users[index])
      //   }
      // })
      result.code = 1
      result.count = 1
      result.msg = '获取用户信息成功'
      result.data = users
    } else {
      result.msg = '获取用户信息失败'
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 根据用户id，关注好友（需要进行token验证）
 * 必须参数{ u_id }
 * 说明：u_id：需要关注的用户id
 */
router.get(`/${NAME}/toFollow`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: ''
  }
  try {
    let { u_id } = req.query
    if (!u_id) {
      result.msg = '所需参数不能为空'
      res.json(result)
      return
    }
    const token = req.headers['authorization-token']
    let { payload } = tokenUtil.decodeToken(token)
    let login_user = payload.data
    let user = await userModel.findOne({ del_flag: 0, id: u_id })
    if (!user) {
      result.msg = '用户不存在'
      res.json(result)
      return
    }
    let admin = await userModel.findOne({ del_flag: 0, id: login_user.id })
    let friends = admin.friends_ids
    let arr
    if (friends === '') {
      arr = []
    } else {
      arr = friends.split(',')
    }
    let index = arr.findIndex(ele => ele === user.id)
    if (index === -1) {
      arr.push(user.id)
      let tmp_str = arr.join(',')
      let update_U = await userModel.findOneAndUpdate({ del_flag: 0, id: login_user.id }, { $set: { friends_ids: tmp_str } }, { new: true })
      if (!update_U) {
        result.msg = '修改失败'
      } else {
        result.code = 1
        result.msg = '修改成功'
        result.data = {
          id: user.id
        }
        result.count = 1
      }
    } else {
      result.code === 1
      result.msg = '已关注该好友，无需继续关注'
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 根据用户id，取消关注好友（需要进行token验证）
 * 必须参数{ u_id }
 * 说明：u_id：需要关注的用户id
 */
router.get(`/${NAME}/clearFollow`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: ''
  }
  try {
    let { u_id } = req.query
    if (!u_id) {
      result.msg = '所需参数不能为空'
      res.json(result)
      return
    }
    const token = req.headers['authorization-token']
    let { payload } = tokenUtil.decodeToken(token)
    let login_user = payload.data
    let user = await userModel.findOne({ del_flag: 0, id: u_id })
    if (!user) {
      result.msg = '用户不存在'
      res.json(result)
      return
    }
    let admin = await userModel.findOne({ del_flag: 0, id: login_user.id })
    let friends = admin.friends_ids
    let arr
    if (friends === '') {
      arr = []
    } else {
      arr = friends.split(',')
    }
    let index = arr.findIndex(ele => ele === user.id)
    if (index > -1) {
      let tmp_str
      arr.splice(index, 1)
      if (arr.length === 0) {
        tmp_str = ''
      } else {
        tmp_str = arr.join(',')
      }
      let update_U = await userModel.findOneAndUpdate({ del_flag: 0, id: login_user.id }, { $set: { friends_ids: tmp_str } }, { new: true })
      if (!update_U) {
        result.msg = '修改失败'
      } else {
        result.code = 1
        result.msg = '修改成功'
        result.data = {
          id: user.id
        }
        result.count = 1
      }
    } else {
      result.code = 1
      result.msg = '未关注该好友，无需取消关注'
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 根据充值（需要进行token验证）
 */
router.post(`/${NAME}/reCharge`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: ''
  }
  try {
    let { balance } = req.body
    if (!balance) {
      result.msg = '必须参数不能为空'
      res.json(result)
      return
    }
    balance = parseInt(balance)
    const token = req.headers['authorization-token']
    let { payload } = tokenUtil.decodeToken(token)
    let login_user = payload.data
    let user = await userModel.findOne({ del_flag: 0, id: login_user.id })
    if (!user) {
      result.msg = '用户不存在'
      res.json(result)
      return
    }
    // let admin = await userModel.findOne({ del_flag: 0, id: login_user.id })
    let admin = await userModel.findOneAndUpdate({ del_flag: 0, id: login_user.id }, { $inc: { balance: balance } }, { new: true })
    if (!admin) {
      result.msg = '充值失败'
    } else {
      result.msg = '充值成功'
      result.data = {
        user_number: admin.user_number,
        balance: admin.balance,
        name: admin.name,
        id: admin.id
      }
      result.count = 1
      result.code = 1
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 获取用户的最近动态(根据时间排序，最多20条)（需要进行token验证）
 */
router.get(`/${NAME}/getUserActive`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: ''
  }
  try {
    const token = req.headers['authorization-token']
    let { payload } = tokenUtil.decodeToken(token)
    let user = payload.data
    let admin = await userModel.findOne({ del_flag: 0, id: user.id })
    if (!admin) {
      result.msg = '用户不存在'
      res.json(result)
      return
    }
    let actives = await questionModel.find({ del_flag: 0, user_id: admin.id, type: 1 }, { _id: 0, del_flag: 0, category_ids: 0, comment_ids: 0, collection_num: 0 }).sort({ _id: -1 }).limit(20)
    if (!actives) {
      result.msg = '获取失败'
    } else {
      result.msg = '获取成功'
      result.data = actives
      result.count = actives.length
      result.code = 1
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 获取用户关注好友的最近动态(根据时间排序，最多20条)（需要进行token验证）
 */
router.get(`/${NAME}/getUserFriendsActive`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: ''
  }
  try {
    const token = req.headers['authorization-token']
    let { payload } = tokenUtil.decodeToken(token)
    let user = payload.data
    let admin = await userModel.findOne({ del_flag: 0, id: user.id })
    if (!admin) {
      result.msg = '用户不存在'
      res.json(result)
      return
    }
    let arr = null
    let friends = admin.friends_ids
    if (friends === '') {
      arr = []
    } else {
      arr = friends.split(',')
    }
    let actives = []
    await Promise.all(arr.map(async (item) => {
      let f_user = await userModel.findOne({ del_flag: 0, id: item })
      let f_actives = await questionModel.find({ del_flag: 0, user_id: item, type: 1 }, { _id: 0, del_flag: 0, category_ids: 0, comment_ids: 0, collection_num: 0 })
      let tmp_arr = []
      f_actives.forEach(item => {
        let tmp = {
          avatar: f_user.avatar,
          id: item.id,
          like: item.like,
          support: item.support,
          info: item.info,
          create_time: item.create_time,
          type: item.type,
          user_id: item.user_id,
          imgUrl: item.imgUrl,
          title: item.title,
          content: item.content
        }
        tmp_arr.push(tmp)
      })
      actives = actives.concat(tmp_arr)
    }))
    if (!actives) {
      result.msg = '获取失败'
    } else {
      actives.sort((a, b) => {
        return ((+ new Date(b.create_time)) - (+ new Date(a.create_time)))
      })
      let split_arr = actives.splice(0, 20)
      result.msg = '获取成功'
      result.data = split_arr
      result.count = split_arr.length
      result.code = 1
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 获取用户关注好友的所有动态(根据时间排序，可分页)（需要进行token验证）
 */
router.post(`/${NAME}/getFriendsAllActive`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: '',
    total: 0
  }
  try {
    let query = {
      number: 10,
      page: 1
    }
    query = Object.assign(query, req.body)
    let number = parseInt(query.number)
    let page = parseInt(query.page)
    const token = req.headers['authorization-token']
    let { payload } = tokenUtil.decodeToken(token)
    let user = payload.data
    let admin = await userModel.findOne({ del_flag: 0, id: user.id })
    if (!admin) {
      result.msg = '用户不存在'
      res.json(result)
      return
    }
    let arr = null
    let friends = admin.friends_ids
    if (friends === '') {
      arr = []
    } else {
      arr = friends.split(',')
    }
    let actives = []
    await Promise.all(arr.map(async (item) => {
      let f_user = await userModel.findOne({ del_flag: 0, id: item })
      let f_actives = await questionModel.find({ del_flag: 0, user_id: item, type: 1 }, { _id: 0, del_flag: 0, category_ids: 0, comment_ids: 0, collection_num: 0 })
      let tmp_arr = []
      f_actives.forEach(item => {
        let tmp = {
          avatar: f_user.avatar,
          id: item.id,
          like: item.like,
          support: item.support,
          info: item.info,
          create_time: item.create_time,
          type: item.type,
          user_id: item.user_id,
          imgUrl: item.imgUrl,
          title: item.title,
          content: item.content
        }
        tmp_arr.push(tmp)
      })
      actives = actives.concat(tmp_arr)
    }))
    if (!actives) {
      result.msg = '获取失败'
    } else {
      actives.sort((a, b) => {
        return (+ new Date(b.create_time) - (+ new Date(a.create_time)))
      })
      result.total = actives.length
      let split_arr = actives.splice((page - 1) * number, page * number)
      result.msg = '获取成功'
      result.data = split_arr
      result.count = split_arr.length
      result.code = 1
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
/**
 * 获取用户的订单列表(根据时间排序，可分页)（需要进行token验证）
 */
router.post(`/${NAME}/getUserOrders`, tools.autotoken, async (req, res) => {
  let result = {
    code: 0,
    data: [],
    count: 0,
    msg: '',
    total: 0
  }
  try {
    let query = {
      number: 5,
      page: 1,
      status: 0
    }
    query = Object.assign(query, req.body)
    let number = parseInt(query.number)
    let page = parseInt(query.page)
    if (query.status === 'all') {
      delete query.status
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
    let orders = null
    if (query.hasOwnProperty('status')) {
      orders = await orderModel.aggregate([ // 联表查询
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "id",
            as: "User"
          },
        }, {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "id",
            as: "Product"
          }
        }, {
          $lookup: {
            from: "u_addresses",
            localField: "address_id",
            foreignField: "id",
            as: "Address"
          }
        }, {
          $match: {
            "del_flag": 0,
            "status": parseInt(query.status)
          }
        }, {
          $project: {
            info: 1, status: 1, id: 1, number: 1, price: 1, total_price: 1,
            User: { id: 1, name: 1, avatar: 1 },
            Product: { id: 1, imageList: 1, name: 1, imgUrl: 1 },
            Address: { id: 1, detail_address: 1, name: 1, phone: 1 }
          }
        }
      ])
    } else {
      orders = await orderModel.aggregate([ // 联表查询
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "id",
            as: "User"
          },
        }, {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "id",
            as: "Product"
          }
        }, {
          $lookup: {
            from: "u_addresses",
            localField: "address_id",
            foreignField: "id",
            as: "Address"
          }
        }, {
          $match: {
            "del_flag": 0
          }
        }, {
          $project: {
            info: 1, status: 1, id: 1, number: 1, price: 1, total_price: 1,
            User: { id: 1, name: 1, avatar: 1 },
            Product: { id: 1, imageList: 1, name: 1, imgUrl: 1 },
            Address: { id: 1, detail_address: 1, name: 1, phone: 1 }
          }
        }
      ])
    }
    if (!orders) {
      result.msg = '获取失败'
    } else {
      orders.sort((a, b) => {
        return (+ new Date(b.create_time) - (+ new Date(a.create_time)))
      })
      result.total = orders.length
      let split_arr = orders.splice((page - 1) * number, page * number)
      result.msg = '获取成功'
      result.data = split_arr
      result.count = split_arr.length
      result.code = 1
    }
  } catch (err) {
    result.msg = err
  }
  res.json(result)
})
module.exports = router