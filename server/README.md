# express后台接口

## 说明

* 分为db数据库文件夹，专门用来连接数据库和表模型
* router文件夹，包含本系统中用到的获取数据的路由
* 在app.js中将这些数据库和路由连接起来，入口

## 自定义约定的状态码
格式

```
    let result = {
        code: 0, // 状态码
        data: [], // 获取的数据
        count: '', // 获取到的数据的数量
        msg: '' // 返回的信息
    }
```
### 状态码说明
// "serve": "node-dev app.js"
* 0 参数错误
* 1 获取到正确的数据
* 2 token过期
* 3 服务器出错
* 4 无效或者token不存在