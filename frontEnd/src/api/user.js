import request from '@/utils/request.js'

const NAME = 'user'

export function login (data) {
  return request({
    url: `/${NAME}/login`,
    method: 'post',
    data
  })
}
export function register (data) {
  return request({
    url: `/${NAME}/register`,
    method: 'post',
    data
  })
}
export function getInfo (data) {
  return request({
    url: `/${NAME}/info`,
    method: 'get',
    params: data
  })
}
export function getInfoById (data) {
  return request({
    url: `/${NAME}/infoById`,
    method: 'get',
    params: data
  })
}
export function friends (data) {
  return request({
    url: `/${NAME}/friends`,
    method: 'post',
    data
  })
}
export function toDelete (data) {
  return request({
    url: `/${NAME}/delete`,
    method: 'get',
    params: data
  })
}
export function toUpdate (data) {
  return request({
    url: `/${NAME}/update`,
    method: 'post',
    data
  })
}
export function getDetail (data) {
  return request({
    url: `/${NAME}/detail`,
    method: 'get',
    params: data
  })
}
export function findUsers (data) {
  return request({
    url: `/${NAME}/find`,
    method: 'post',
    data
  })
}
export function toFollow (data) { // 关注好友
  return request({
    url: `/${NAME}/toFollow`,
    method: 'get',
    params: data
  })
}
export function clearFollow (data) { // 取消关注好友
  return request({
    url: `/${NAME}/clearFollow`,
    method: 'get',
    params: data
  })
}
export function getFriends () { // 获取好友列表
  return request({
    url: `/${NAME}/friends`,
    method: 'get'
  })
}
export function reCharge (data) { // 账户充值
  return request({
    url: `/${NAME}/reCharge`,
    method: 'post',
    data
  })
}
export function getUserActives () { // 获取用户最近的20条动态，按时间排序（用户自己的）
  return request({
    url: `/${NAME}/getUserActive`,
    method: 'get'
  })
}
export function getUserFriendsActives () { // 获取用户关注好友最近的20条动态，按时间排序（用户好友的）
  return request({
    url: `/${NAME}/getUserFriendsActive`,
    method: 'get'
  })
}
export function getFriendsAllActives (data) { // 获取用户关注好友的所有动态，按时间排序（用户好友的，可分页）
  return request({
    url: `/${NAME}/getFriendsAllActive`,
    method: 'post',
    data
  })
}
export function getUserOrders (data) { // 获取用户的订单列表(根据时间排序，可分页)
  return request({
    url: `/${NAME}/getUserOrders`,
    method: 'post',
    data
  })
}
