let express = require('express')
let router = new express.Router()
const bodyParser = require('body-parser')
const p_categoryModel = require('../db/model/p_category')
const userModel = require('../db/model/user')
// 引入工具
const tools = require('../utils/index')

const NAME = 'p_category'
const ID_HEAD = '19004' // 商品分类的头部id

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
/**
 * 创建 （验证token）
 * 必须参数 { p_c_id，u_id，name }
 */
router.post(`/${NAME}/create`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
        let { p_c_id, u_id, name } = req.body
        if (!p_c_id || !u_id || !name) {
            result.msg = '参数不能为空'
            res.json(result)
        }
        let user = await userModel.findOne({ id: u_id })
        if (!user) {
            result.msg = '用户不存在'
            res.json(result)
            return
        }
        let category_num = p_categoryModel.find({}).countDocuments() + 1
        let category = {
            id: ID_HEAD + tools.PrefixZero(category_num, 3),
            name,
            user_id: u_id
        }
        category = Object.assign(category, req.body)
        let update_category = p_categoryModel.findOneAndUpdate({ id: p_c_id, del_flag: 0 },category, { new: true })
        if (update_category) {
            result.data = update_category
            result.count = 1
            result.msg = '创建成功'
            result.code = 1
        } else {
            result.msg = '创建失败'
        }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 根据id获取商品分类详情 （验证token）
 *  必须参数 { p_c_id }
 */
router.get(`/${NAME}/detail`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
       let { p_c_id } = req.query
       if (!p_c_id) {
           result.msg = '所需参数不能为空'
           res.json(result)
           return
       }
       let find_category = await p_categoryModel.findOne({ id: p_c_id, del_flag: 0 })
       if (find_category) {
            result.code = 1
            result.msg = '查询成功'
            result.data = find_category
            result.count = 1
       } else {
           result.msg = '查询的商品分类不存在'
       }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 修改（验证token）
 * 必须参数（{ p_c_id，name }）
 */
router.post(`/${NAME}/update`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
       let { p_c_id } = req.body
       if (!p_c_id) {
           result.msg = '所需参数不能为空'
           res.json(result)
           return
       }
       let category = {
            name
       }
       category = Object.assign(category, req.body)
       let find_category = await p_categoryModel.findOne({ id: p_c_id, del_flag: 0 })
       if (find_category) {
            let update_category = await p_categoryModel.findOneAndUpdate({ id: p_c_id, del_flag: 0}, category, { new: true })
            if( update_category) {
                result.code = 1
                result.msg = '修改成功'
                result.data = update_category
                result.count = 1
            } else {
                result.msg = '修改失败'
            }
       } else {
           result.msg = '商品分类不存在'
       }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})
/**
 * 删除（验证token）
 * 必须参数（{ p_c_id }）
 */
router.post(`/${NAME}/delete`, async (req, res) => {
    let result = {
        code: 0,
        data: [],
        count: '',
        msg: ''
    }
    try {
       let { p_c_id } = req.body
       if (!p_c_id) {
           result.msg = '所需参数不能为空'
           res.json(result)
           return
       }
       let find_category = await p_categoryModel.findOne({ id: p_c_id, del_flag: 0 })
       if (find_category) {
            find_category.del_flag = 1
            let update_category = await p_categoryModel.findOneAndUpdate({ id: p_c_id, del_flag: 0}, find_category, { new: true })
            if( update_category) {
                result.code = 1
                result.msg = '删除成功'
                result.data = update_category
                result.count = 1
            } else {
                result.msg = '删除失败'
            }
       } else {
           result.msg = '商品分类不存在'
       }
    } catch (err) {
        result.msg = err
    }
    res.json(result)
})

module.exports = router