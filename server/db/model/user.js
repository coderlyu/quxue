var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id: {
        type: String, // 学号类型为字符串
        required: true, // 限制该项为必填项
        unique: true, // 限制学号是唯一的
        index: true
    },
    name: { // 昵称
        type: String,
        required: true
    },
    user_number: { // 用户名
        type: String,
        required: true,
        unique: true // 登录账号必须唯一
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false,
        default: 0
    },
    sex: { // 0为女生，1为男生，2为未知
        type: Number, 
        required: false,
        default: 2
    },
    avatar: {
        type: String,
        required: false,
        default: ''
    },
    intro: {
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
    friends_ids: { // 好友id，逗号分隔
        type: String,
        required: false,
        default: '',
        index: true
    },
    balance: {
        type: Number,
        default: 0
    },
    address_ids: { // 收货地址id，逗号分隔
        type: String,
        required: false,
        default: ''
    },
    address: { // 住址，不同于address_ids，
        type: String,
        required: false,
        default: ''
    },
    type: { // 0为普通用户，1为管理员
      type: Number,
      default: 0
    }
})

var userModel = mongoose.model('user', userSchema)
module.exports = userModel