const tokenUtil = require('./token')

/**
* 自定义函数名：PrefixZero
* @param num： 被操作数
* @param n： 固定的总位数
*/
function PrefixZero(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}
// 获取访问者的ip
function getIPAddress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
//获取时间作为上传文件名的唯一标识,在时间的基础上再在最后加上随机生成的一串数字
function getNowFormatDate() {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  month = month < 10 ? '0' + month : month
  strDate = strDate < 10 ? '0' + strDate : strDate
  hour = hour < 10 ? '0' + hour : hour
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  var currentdate = year.toString() + month.toString() + strDate.toString() + hour.toString() + minute.toString() + second.toString()
  var endId = currentdate.toString() + PrefixZero(parseInt(Math.random() * 10000), 5).toString()
  return endId
}

// 验证token中间件，是否存在，是否过期。
function autotoken(req, res, next) {
  let result = {
    code: 0,
    data: [],
    count: '',
    msg: ''
  }
  const token = req.headers['authorization-token']
  if (token == undefined) {
    result.msg = '不存在token'
    result.code = 4
    res.json(result)
    return
  } else {
    if (tokenUtil.decodeToken(token)) { // 判断是否存在token
      if (tokenUtil.checkToken(token)) { // 判断token是否过期
        next()
      } else {
        result.msg = 'token已过期'
        result.code = 2
        res.json(result)
        return
      }
    } else {
      result.msg = '无效的token,请重新登录'
      result.code = 4
      res.json(result)
      return
    }
  }
}
// 对象数组去重
function uniqueObject(arr) {
  if (arr.length === 0) {
    return []
  }
  //存放的是字符串形式的数组。
  var tempArr = []
  //将数组对象转成数组字符串。
  var newStr = arrToString(arr)
  newStr.sort()

  //先放置第一个
  var temp = newStr[0]
  tempArr.push(temp)
  // 数组去重
  for (var i = 1; i < newStr.length; i++) {
    if (newStr[i] !== temp) {
      temp = newStr[i]  //放置到集合里面。
      tempArr.push(newStr[i])
    }
  }
  //上面，集合还是字符串形式的数组，需要转换成json对象的形式。
  var newArr = []
  // 新数组字符串转成数组对象
  for (var i = 0; i < tempArr.length; i++) {
    newArr.push(JSON.parse(tempArr[i]))
  }
  return newArr
}
/**
 * 
 * @param arr 对象数组
 * @returns {Array} 转换成字符串的数组
 */
function arrToString(arr) {
  var newArr = []
  if (arr.length !== 0) {
    for (var i = 0; i < arr.length; i++) { //对每一个对象数据进行处理。
      //将每一个对象里面的属性key 进行重新排序，变成新的对象。
      var thisObj = sortObject(arr[i])
      //将json对象，转换成字符串
      var thisStr = JSON.stringify(thisObj)
      // 去除空格及\t空白字符
      thisStr = thisStr.replace(/(\s|[\\t])/g, '')
      //里面放置字符串
      newArr.push(thisStr)
    }
  }
  return newArr
}
/**
 * 
 * @param obj 对象
 * @returns 将对象按照key值进行排序。
 */
function sortObject(obj) {
  var keyArr = []
  for (var item in obj) { //把所有的key放置在一个数组里面。
    keyArr.push(item)
  }
  keyArr.sort() //排序，按照字符进行排序。
  var newObj = {} //还是json对象
  for (var i = 0; i < keyArr.length; i++) {
    newObj[keyArr[i]] = obj[keyArr[i]]
  }
  //处理成 键=值的数组形式。
  //console.log("值是:"+JSON.stringify(newObj));
  return newObj
}

function isArray(arr) {
  return Object.prototype.toString.call(arr).slice(8, -1) === 'Array';
}

function isObject(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}
/**
 * 判断两数是否全等
 * @param {*} compareA 需要比较的数
 * @param {*} compareB 需要比较的数
 */
function isEqual(compareA, compareB) {

  var result = true;
  var follow = async function (compareA, compareB) {
    let A = compareA,
      B = compareB;
    if (!isArray(A) && !isArray(B) && !isObject(A) && !isObject(B)) {
      return result = (A === B) ? result : false;
    } else if (isArray(A) && isArray(B)) {
      if (A.length < B.length) {
        A = compareB
        B = compareA
      }
      for (let key in A) {
        // if (A[key] && B[key]) { // 无法判断 Boolean 类型的数据
        if (A.hasOwnProperty(key) && B.hasOwnProperty(key)) {
          if ((isArray(A[key]) && isArray(B[key])) || (isObject(A[key]) && isObject(B[key]))) {
            return follow(A[key], B[key])
          }
          if (A[key] === B[key]) {
            continue;
          }
          return result = false;
        }
        return result = false;
      }
      return;
    }
    if (isObject(A) && isObject(B)) {
      if (Object.keys(A).length < Object.keys(B).length) {
        A = compareB
        B = compareA
      }
      for (let obj in A) {
        // if (A[obj] && B[obj]) { // 无法判断 Boolean 类型的数据
        if (A.hasOwnProperty(obj) && B.hasOwnProperty(obj)) {
          if ((isArray(A[obj]) && isArray(B[obj])) || (isObject(A[obj]) && isObject(B[obj]))) {
            return follow(A[obj], B[obj])
          }
          if (A[obj] === B[obj]) {
            continue;
          }
          return result = false;
        }
        return result = false;
      }
      return;
    }
    return result = false;
  }
  follow(compareA, compareB)
  return result;
}
function duplicateRemoval(arr) {
  let _arr = []
  for (let key1 in arr) {
    let isHave = false
    for (let key2 in _arr) {
      if (isEqual(arr[key1], _arr[key2])) {
        isHave = true
      }
    }
    if (!isHave) {
      _arr.push(arr[key1])
    }
  }
  return _arr
}
module.exports = {
  PrefixZero, getIPAddress, getNowFormatDate, autotoken, uniqueObject, duplicateRemoval
}