var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    id: {
        type: String, // 类型为字符串
        required: true, // 限制该项为必填项
        unique: true, // 限制id是唯一的
        index: true // 使用索引
    },
    user_id: {
        type: String,
        required: true,
        index: true
    },
    product_id: {
        type: String,
        required: true,
        index: true
    },
    address_id: {
      type: String,
      required: true
    },
    number: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    info: {  // 买家留言
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
    status: { // 订单状态（0：已支付，1：运输中，2：已签收，3：交易完成）
        type: Number,
        default: 0
    }
})

var orderModel = mongoose.model('order', orderSchema)
module.exports = orderModel