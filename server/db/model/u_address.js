var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var u_addressSchema = new Schema({
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
    name: { // 收货人名字
        type: String,
        required: true
    },
    phone: { // 收货人手机号
        type: String,
        required: true
    },
    province: { // 省份
        type: String,
        required: true
    },
    city: { // 城市
        type: String,
        required: true
    },
    area: { // 地区
        type: String,
        required: true
    },
    areaCode: { // 地区编码
        type: String,
        required: true
    },
    detail_address: { // 详细地址
        type: String,
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
    post_code: { // 邮政编码
        type: String,
        required: false,
        default: ''
    },
    default_flag: { //默认标识，0不是，1是
        type: Number,
        required: false,
        default: 0,
        index: true
    }
})

var u_addressModel = mongoose.model('u_address', u_addressSchema)
module.exports = u_addressModel