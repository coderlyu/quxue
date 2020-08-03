const express = require('express')
const app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)
// const http = require("http").createServer(app)
// const socketio = require('./utils/socketio')
// socketio.getSocketio(http)
const path = require('path')
const userRoute = require('./router/userRoute')
const questionRoute = require('./router/questionRoute')
const commentsRoute = require('./router/commentsRoute')
const productRoute = require('./router/productRoute')
const addressRoute = require('./router/addressRoute')
const uploadRoute = require('./router/uploadRoute')
const adminRoute = require('./router/adminRoute')

const db = require('./db/index.js')
//设置跨域请求
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild, authorization-token')
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next();
})
// 连接数据库之后的操作
db.then(() => {
    app.use(userRoute) // 跟用户有关的路由
    app.use(questionRoute) // 跟问题有关的路由
    app.use(commentsRoute) // 跟评论有关的路由
    app.use(productRoute) // 跟商品有关的路由
    app.use(addressRoute) // 跟商品有关的路由
    app.use(uploadRoute) // 跟文件上传有关的路由
    app.use(adminRoute) // 跟文件上传有关的路由
    app.use(express.static(path.join(__dirname, 'public'))) // 向外暴露静态资源
    // app.listen(3000, err => {
    //     if (!err) {
    //         console.log('server is running at http://localhost:3000')
    //         console.log('server is running at http://127.0.0.1:3000')
    //     } else {
    //         console.log(err)
    //     }
    // })
    server.listen(3002, err => {
        if (!err) {
            console.log('server is running at http://localhost:3002')
            console.log('server is running at http://127.0.0.1:3002')
        } else {
            console.log(err)
        }
    })
    let users = {}
    io.on('connection', function (socket) {
        socket.on('disconnect', () => {
            if (users[socket.id]) {
              console.log(users[socket.id]  + '离开了聊天室')
              delete users[socket.id]
            }
        })
        socket.on('getUserInfo', (userId) => { // 获取登录用户的id，并保存
          if (!users[socket.id]) {
            users[socket.id] = userId
          }
        })
        socket.on('singleChatById',({ from, to, msg }) => {
            console.log('收到来自' + from + '给' + to + '的消息是：' + msg)
            let isOnline = false
            Object.keys(users).forEach(item => {
                if(to === users[item]) {
                  isOnline = true
                    io.to(item).emit('receiveMessage',{ from, to, msg })
                    console.log('消息已发送给：' + item)
                }
            })
            if (!isOnline) {
              io.to(socket.id).emit('tips',{ from: '系统', to, msg: '对方不在线' })
            }
        })
    })
    console.log('数据库连接成功')
}).catch(err => {
    console.log('数据库连接失败')
})