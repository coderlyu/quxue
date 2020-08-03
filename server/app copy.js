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
    // app.use(function(req, res, next) {
    //   res.header('Access-Control-Allow-Origin', '*')
    //   res.header('Access-Control-Allow-Headers', 'Content-Type')
    //   res.header('Access-Control-Allow-Methods', '*')
    //   res.header('Content-Type', 'application/json;charset=utf-8')
    //   next()
    // })
    app.use(userRoute) // 跟用户有关的路由
    app.use(questionRoute) // 跟问题有关的路由
    app.use(commentsRoute) // 跟评论有关的路由
    app.use(productRoute) // 跟商品有关的路由
    app.use(addressRoute) // 跟商品有关的路由
    app.use(uploadRoute) // 跟文件上传有关的路由
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
    io.use((socket, next) => {
        // 用户身份，
        let identification = socket.handshake.query.Identification
        // console.log(socket)
        if (identification) {
            // let user = {
            //     id: identification,
            //     client: socket.id
            // }
            // users.push(user)
            users[socket.id] = identification
          return next()
        }
        return next(new Error('非法连接'))
    })
    io.on('connection', function (socket) {
        console.log(users[socket.id] + '进入了聊天室')
        console.log('当前连接用户', users)
        socket.on('disconnect', () => {
            console.log(users[socket.id]  + '离开了聊天室')
            delete users[socket.id]
            console.log('当前连接用户', users)
        })
        socket.on('singleChatById',({ from, to, msg }) => {
            console.log('收到来自' + from + '给' + to + '的消息是：' + msg)
            // console.log('当前连接用户', users)
            Object.keys(users).forEach(item => {
                if(to === users[item]) {
                    io.to(item).emit('receiveMessage',{ from, to, msg })
                    console.log('消息已发送给：' + item)
                }
                if (from === users[item]) {
                  io.to(item).emit('receiveMessage',{ from, to, msg })
                  console.log('消息已发送给：' + item)
                }
            })
        })
    })
    console.log('数据库连接成功')
}).catch(err => {
    console.log('数据库连接失败')
})