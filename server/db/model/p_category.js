var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var p_categorySchema = new Schema({
    id: {
        type: String, // 类型为字符串
        required: true, // 限制该项为必填项
        unique: true, // 限制id是唯一的
        index: true
    },
    name: { // 类名
        type: String,
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
    }
})

var p_categoryModel = mongoose.model('p_category', p_categorySchema)
module.exports = p_categoryModel