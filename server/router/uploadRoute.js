var express = require('express')
var multer = require('multer') // 文件上传
var tools = require('../utils/index') // 工具
var router = new express.Router()

// var baseUrl = 'http://127.0.0.1:3002/'
var baseUrl = 'http://47.106.68.248:3002/'
var imgUrl = 'public/uploads/'
// var dateNow = tools.getNowFormatDate()
var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: imgUrl,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null, tools.getNowFormatDate() + file.originalname + '.' + file.mimetype.replace('image/', ''))
    }
})
var upload = multer({
    storage: storage
})
// 图片上传
router.post('/upload', upload.any(), function (req, res, next) {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let files = req.files
        console.log(files)
        files.forEach(item => {
            result.data.push(baseUrl + item.path.replace(/\\/g, "/").replace("public/", ""))
        })
        result.code = 1
        result.msg = '文件上传成功'
        result.count = result.data.length
        console.log(result)
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
// 导出
module.exports = router