let express = require('express')
let router = new express.Router()
const bodyParser = require('body-parser')
const questionModel = require('../db/model/question')
const commentsModel = require('../db/model/q_comments')
const userModel = require('../db/model/user')
// 引入工具
const tools = require('../utils/index')

const NAME = 'comments'
const ID_HEAD = '19007' // 新建文章的头部id

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))
/**
 * 通过问题id添加评论
 * 必须参数 { q_id, u_id， content，c_id：看下面的解释}
 * 可选参数 { title，first_comment，user_avatar}
 * q_id：问题id，u_id：用户id，content：评论内容，first_comment：是否第一条评论，0为否，1为是
 * 如果对某条评论进行评论，必须要有 { c_id }
 */
router.post(`/${NAME}/create`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { q_id, u_id, content } = req.body
        if (!q_id || !u_id || !content) {
            result.msg = '参数不能为空'
            res.json(result)
        }
        let user = await userModel.findOne({ id: u_id, del_flag: 0 })
        if (!user) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let comments_num = await commentsModel.find({}).countDocuments() + 1
        let q_obj = {
            id: ID_HEAD + tools.PrefixZero(comments_num, 6),
            question_id: q_id,
            user_avatar: user.avatar || 'user_avatar',
            content,
            user_name: user.name || '',
            user_id: u_id
        }
        q_obj = Object.assign(q_obj, req.body)
        if (!q_obj.hasOwnProperty('first_comment') ||(q_obj.hasOwnProperty('first_comment') && q_obj.first_comment === '1')) {
            q_obj.comment_flag = + new Date();
        } else {
            let c_id = req.body.c_id
            if(!c_id) {
                result.msg = '对评论进行追评的参数不能为空'
                res.json(result)
                return
            }
            let comments = await commentsModel.findOne({id: c_id, del_flag: 0})
            if (!comments) {
                result.msg = '需要追评的评论不存在'
                res.json(result)
                return
            }
            q_obj.comment_flag = comments.comment_flag
        }
        let new_comments = await commentsModel.create(q_obj)
        if(new_comments) {
            result.code = 1
            result.msg = '评论成功'
            result.data = new_comments
            result.count = 1
        } else {
            result.msg = '评论失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 根据评论id获取评论详情
 *  必须参数 { c_id }
 */
router.get(`/${NAME}/detail`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
       let { c_id } = req.query
       if (!c_id) {
           result.msg = '所需参数不能为空'
           res.json(result)
       }
       let find_comments = await commentsModel.findOne({id: c_id, del_flag: 0})
       if (find_comments) {
            result.code = 1
            result.msg = '查询成功'
            result.data = find_comments
            result.count = 1
       } else {
           result.msg = '查询的评论不存在'
       }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 根据评论id修改评论消息（未完成） TODO
 *  必须参数 { c_id }
 */
router.post(`/${NAME}/update`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        // TODO
       let { c_id } = req.query
       if (!c_id) {
           result.msg = '所需参数不能为空'
           res.json(result)
       }
       let find_comments = await commentsModel.findOne({id: c_id, del_flag: 0})
       if (find_comments) {
            result.code = 1
            result.msg = '查询成功'
            result.data = find_comments
            result.count = 1
       } else {
           result.msg = '查询的评论不存在'
       }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 根据评论id增加点赞数量
 *  必须参数 { c_id }
 */
router.get(`/${NAME}/updateSupport`, tools.autotoken, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
       let { c_id } = req.query
       if (!c_id) {
           result.msg = '所需参数不能为空'
           res.json(result)
       }
       let find_comments = await commentsModel.findOne({ id: c_id, del_flag: 0 })
       if (find_comments) {
            // find_comments.support += 1
            let update_C = await commentsModel.findOneAndUpdate({ id: c_id, del_flag: 0 }, {$inc: {support: 1}}, {new: true})
            if (update_C) {
                result.code = 1
                result.msg = '修改成功'
                result.data = update_C
                result.count = 1
            } else {
                result.msg = '修改失败'
            }
            
       } else {
           result.msg = '查询的评论不存在'
       }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
module.exports = router