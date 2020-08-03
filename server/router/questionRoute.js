let express = require('express')
let router = new express.Router()
const bodyParser = require('body-parser')
const questionModel = require('../db/model/question')
const userModel = require('../db/model/user')
const commentsModel = require('../db/model/q_comments')
// 引入工具
const tools = require('../utils/index')
const tokenUtil = require('../utils/token')

const NAME = 'question'
const ID_HEAD = '19006' // 新建问题的头部id
// const COMMENT_ID_HEAD = '19007' // 新建评论的头部id

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

/**
 * 创建一个问题
 * 必须参数 { user_id, title, content }
 * user_id:  用户id， title： 标题， content： 内容,
 */
router.post(`/${NAME}/create`, tools.autotoken, async (req, res) => {
    // req.body
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        // console.log(req.body)
       let { user_id, content, title, imgUrl } = req.body
       if (!user_id || !content || !title || !imgUrl) {
           result.msg = '所需参数不能为空'
           res.json(result)
           return
       }
       let question_num = await questionModel.find({}).countDocuments() + 1
       let question = {
            id: ID_HEAD + tools.PrefixZero(question_num, 5),
            user_id: '',
            imgUrl: imgUrl,
            title: '',
            content: '',
            info: '',
            category_ids: ''
       }
       question = Object.assign(question, req.body)
       let create_q = await questionModel.create(question)
       if (!create_q) {
            result.msg = '创建失败'
       } else {
            result.count = 1
            result.data = create_q
            result.msg = '创建成功'
            result.code = 1
       }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 删除（验证token）
 * 必须参数（{ u_id, q_id }）
 */
router.post(`/${NAME}/delete`, tools.autotoken, async (req, res) => {
    // req.body
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
       let { q_id } = req.body
       if (!q_id) {
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
       let find_q = await questionModel.findOne({ id: q_id, del_flag: 0 })
       if (!find_q) {
            result.msg = '删除的问题不存在'
            res.json(result)
            return
       }
       let delete_q = await questionModel.findOneAndUpdate({ id: q_id, del_flag: 0 },{ $set: { del_flag: 1} }, { new: true })
       if (!delete_q) {
            result.msg = '删除失败'
            res.json(result)
            return
       }
        result.count = 1
        result.data = delete_q
        result.msg = '删除成功'
        result.code = 1
       
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 通过id获取文章详情， （需要验证token）
 * 必须参数 { q_id }
 * q_id： 文章id
 */
router.get(`/${NAME}/detail`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        const token = req.headers['authorization-token']
        let { payload } = tokenUtil.decodeToken(token)
        let user = payload.data
        let admin = await userModel.findOne({ del_flag: 0, id: user.id })
        let arr = []
        let friends = admin.friends_ids
        if (friends !== '') {
            arr = friends.split(',')
        }
        let { q_id } = req.query
        if (!q_id) {
            result.msg = '所需参数不能为空'
        }
        let find_q = await questionModel.findOne({ id: q_id, del_flag: 0 })
        if (!find_q) {
            result.msg = '查询问题不存在'
        } else {
            let user_id = find_q.user_id
            let User = await userModel.findOne({ id: user_id, del_flag: 0 })
            if (User) {
                let index = arr.findIndex(item => item === User.id)
                let tmp_user = {
                    avatar: User.avatar,
                    id: User.id,
                    name: User.name,
                    intro: User.intro,
                    isFollow: index > -1
                }
                result.data[0] = tmp_user
            } else {
                result.data[0] = {}
            }
            result.data[1] = find_q
            result.count = 1
            result.msg = '查询成功'
            result.code = 1
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 修改获取文章详情， （需要验证token）
 */
router.post(`/${NAME}/update`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { id, content, title, imgUrl } = req.body
        if (!id || !content || !title || !imgUrl) {
            result.msg = '所需参数不能为空'
            res.json(result)
            return
        }
        let question = {
            id,
            content,
            title,
            imgUrl
        }
        question = Object.assign(question, req.body)
        const token = req.headers['authorization-token']
        let { payload } = tokenUtil.decodeToken(token)
        let user = payload.data
        let admin = await userModel.findOne({ del_flag: 0, id: user.id })
        if (!admin) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let find_q = await questionModel.findOne({ id: id, del_flag: 0 })
        if (!find_q) {
            result.msg = '问题不存在'
            res.json(result)
            return
        } else {
            let update_new = await questionModel.findOneAndUpdate({ id: id, del_flag: 0 }, { $set: question }, { new: true })
            if (!update_new) {
                result.msg = '修改失败'
            } else {
                result.data = update_new
                result.count = 1
                result.msg = '查询成功'
                result.code = 1
            }
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 根据问题q_id获取评论（支持分页）（验证token）
 * 必须参数 { q_id }
 * 可选参数 { page, number}
 * q_id： 查询问题id，page：查询第几页，number：每一页的数量
 */
router.post(`/${NAME}/getCommentsById`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: '',
        total: 0
    }
    try {
        let { q_id } = req.body
        if (!q_id) {
            result.msg = '参数不能为空'
            res.json(result)
            return
        }
        let question = {
            question_id: q_id,
            first_comment: 1,
            del_flag: 0,
            page: 1,
            number: 10
        }
        question = Object.assign(question, req.body)
        let page = parseInt(question.page)
        let number = parseInt(question.number)
        delete question.page
        delete question.number
        if (question.hasOwnProperty('q_id')) {
            delete question.q_id
        }
        let comments = await commentsModel.find(question)
        if (comments) {
            comments.sort(function(a, b) {
                return ((+ new Date(b.create_time)) - (+ new Date(a.create_time)))
            })
            let total = comments.length
            comments = comments.slice((page - 1) * number, page * number)
            result.code = 1
            result.data = comments
            result.msg = '查询成功'
            result.count = comments.length
            result.total = total
        } else {
            result.msg = '查询失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 获取问题列表（支持分页）
 * 可选参数 { page, number}
 * page：查询第几页，number：每一页的数量
 */
router.post(`/${NAME}/getList`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: 0,
        msg: '',
        total: 0
    }
    try {
        let question = {
            del_flag: 0,
            page: 1,
            number: 10,
            type: 1
        }
        question = Object.assign(question, req.body)
        let page = parseInt(question.page)
        let number = parseInt(question.number)
        delete question.page
        delete question.number
        let questions = await questionModel.find(question, { _id: 0, del_flag: 0 })
        // console.log(questions)
        if (questions) {
            questions.sort(function(a, b){
                return ((+ new Date(b.create_time)) - (+ new Date(a.create_time)))
            })
            let total = questions.length
            questions = questions.slice((page - 1) * number, page * number)
            result.code = 1
            result.data = questions
            result.msg = '查询成功'
            result.count = questions.length
            result.total = total
        } else {
            result.msg = '查询失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 模糊查询, 根据内容或者标题进行模糊查询（支持分页）
 * 可选参数 { page, number, content }
 * page：查询第几页，number：每一页的数量，content：模糊查询的内容
 */
router.post(`/${NAME}/find`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: 0,
        msg: '',
        total: 0
    }
    try {
        let { content }  = req.body
        let question = {
            del_flag: 0,
            page: 1,
            number: 10
        }
        question = Object.assign(question, req.body)
        let page = parseInt(question.page)
        let number = parseInt(question.number)
        // delete question.page
        // delete question.number
        let questions = null
        if (!content) {
            questions = await questionModel.find({ del_flag: 0 })
        } else {
            let query= new RegExp(content, 'i') // 模糊查询参数
            questions = await questionModel.find({ del_flag: 0, type: 1, $or:[{ 'info': query }, { 'title': query }, { 'content': query }]}, { _id: 0, del_flag: 0 })
        }
        if (questions) {
            let total = questions.length
            questions = questions.slice((page - 1) * number, page * number)
            result.code = 1
            result.data = questions
            result.msg = '查询成功'
            result.count = questions.length
            result.total = total
        } else {
            result.msg = '查询失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 根据问题id修改点赞
 * 参数 { q_id }
 * 说明 q_id：问题id
 */
router.get(`/${NAME}/updateSupport`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: 0,
        msg: ''
    }
    try {
        let { q_id }  = req.query
        if (!q_id) {
            result.msg = '所需参数不能为空'
            res.json(result)
            return
        }
        let find_q = await questionModel.findOneAndUpdate({ del_flag: 0, id: q_id, type: 1 }, { $inc: { support: 1 } }, { new: true })
        if (find_q) {
            result.code = 1
            result.data = find_q
            result.msg = '修改成功'
            result.count = 1
        } else {
            result.msg = '修改失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
* 根据用户id获取所有的问题列表（需要验证token）
*/
router.post(`/${NAME}/getQuestionsByUserId`, tools.autotoken, async (req, res) => {
    let result = {
       code: 0,
       data: [],
       count: 0,
       msg: '',
       total: 0
    }
    try {
        const token = req.headers['authorization-token']
        let decode_user = tokenUtil.decodeToken(token)
        let user = decode_user.payload.data
        let q_findObj = {
            number: 10,
            page: 1
        }
        q_findObj = Object.assign(q_findObj, req.body)
        let number = parseInt(q_findObj.number)
        let page = parseInt(q_findObj.page)
        let admin = await userModel.findOne({ id: user.id, del_flag: 0 })
        if (!admin) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let questions = await questionModel.find({ del_flag: 0, user_id: user.id, type: 1 }, { _id: 0, del_flag: 0 })
        if(questions) {
            let total = questions.length
            questions = questions.slice((page - 1) * number, page * number)
            result.code = 1
            result.data = questions
            result.msg = '查询成功'
            result.count = questions.length
            result.total = total
        } else {
            result.msg = '查询出错'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
module.exports = router