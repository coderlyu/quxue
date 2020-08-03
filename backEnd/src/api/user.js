import request from '@/utils/request.js'

export function login (data) { // 管理员登录
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function getInfo (data) { // 通过token拉去管理员信息
  return request({
    url: '/user/info',
    method: 'get',
    params: data
  })
}

export function getUserList (data) { // 获取用户列表，可分页
  return request({
    url: '/user/find',
    method: 'post',
    params: data
  })
}
