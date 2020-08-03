var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    id: {
        type: String, // 类型为字符串
        required: true, // 限制该项为必填项
        unique: true, // 限制id是唯一的
        index: true,
        trim: true
    },
    name: { // 产品名
        type: String,
        required: true
    },
    user_id: { // 上传者
        type: String,
        required: true,
        index: true
    },
    stock: { // 库存
        type: Number,
        required: false,
        default: 0
    },
    sell_number: { // 销售数量
        type: Number,
        required: false,
        default: 0
    },
    imageList: { // 商品图片
        type: Array,
        required: true
    },
    imgUrl: { // 加入购物车时选中商品后显示的图片
        type: String,
        required: true
    },
    price: { // new价格
        type: Number,
        required: true
    },
    old_price: { // old价格
        type: Number,
        required: true
    },
    coupon: { // 优惠金额
        type: Number,
        required: true
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

var productModel = mongoose.model('product', productSchema)
module.exports = productModel