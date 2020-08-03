var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var q_commentsSchema = new Schema({
    id: {
        type: String, // 类型为字符串
        required: true, // 限制该项为必填项
        unique: true, // 限制id是唯一的
        index: true
    },
    user_id: { // 用户id
        type: String,
        required: true,
        index: true
    },
    question_id: { // 问题id
        type: String,
        required: true,
        index: true
    },
    title: { // 标题
        type: String,
        required: false
    },
    like: { // 喜欢数量
        type: Number,
        required: false,
        default: 0
    },
    collection_num: { // 收藏数量
        type: Number,
        required: false,
        default: 0
    },
    support: { // 点赞数量
        type: Number,
        required: false,
        default: 0
    },
    content: {
        type: Schema.Types.Mixed, // 接收所有数据类型
        required: true,
        default: ''
    },
    user_avatar: {
        type: String,
        required: true,
        default: ''
    },
    user_name: {
        type: String,
        required: true,
        default: ''
    },
    first_comment: { // 是否第一条评论，0为不是第一条评论，1为是
        type: Number,
        required: false,
        default: 1,
        index: true
    },
    comment_flag: { //以当前时间戳作为唯一标识，具有相同标识的可以归为同一条评论下的，以id从小到大排就是评论的顺序
        type: String, 
        required: true,
        default: + new Date(),
        index: true
    },
    info: {
        type: Schema.Types.Mixed, // 接收所有数据类型
        required: false,
        default: ''
    },
    create_time: { // 创建时间
        type: Date,
        default: Date.now()
    },
    del_flag: {
        type: Number,
        default: 0, // 0 为未删除，1为删除
        index: true
    }
})

var q_commentsModel = mongoose.model('q_comments', q_commentsSchema)
module.exports = q_commentsModel