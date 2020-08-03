var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    id: {
        type: String, // 类型为字符串
        required: true, // 限制该项为必填项
        unique: true, // 限制id是唯一的
        index: true
    },
    user_id: {
        type: String,
        required: true,
        index: true
    },
    title: { // 标题
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
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
    comment_ids: {
        type: String,
        required: false,
        default: ''
    },
    content: {
        type: Schema.Types.Mixed, // 接收所有数据类型
        required: true
    },
    info: {  // 描述
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
    },
    category_ids: { // 分类id，逗号分隔
        type: String,
        required: false,
        default: ''
    },
    type: { // 问题类型，0为未发表（草稿），1为已发表
        type: Number,
        required: false,
        default: 1,
        index: true
    }
})

var questionModel = mongoose.model('question', questionSchema)
module.exports = questionModel