const express = require('express')
let router = new express.Router()

router.get('/chat', function (req, res, next) {
  res.render('test')
})

router.io = function (io) {
  io.on('connection', function (socket) {
    console.log('connected')
  })
  return io
}
module.exports = router