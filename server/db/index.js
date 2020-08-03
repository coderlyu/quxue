const mongoose = require('mongoose');
const DB_NAME = 'community'

// 远程服务器的, 上传服务器记得把这些去掉注释
const DB_PORT = 39000
const DB_URL = '47.106.68.248'

// 本地的
// const DB_PORT = 27017
// const DB_URL = 'localhost'
// mongoose.set('useCreateIndex', true) //加上这个
// mongoose.set('useFindAndModify', false)
let option = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, option)
const db = mongoose.connection
let dbPromise = new Promise((resolve, reject) => {
    db.once('open', err => {
        if (!err) {
            // resolve(mongoose)
            resolve()
        } else {
            reject(err)
            console.log(err)
        }
    })
})
module.exports = dbPromise