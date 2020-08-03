import request from '@/utils/request.js'

const NAME = 'question'

export function publicQuestion (data) {
  return request({
    url: `/${NAME}/create`,
    method: 'post',
    data
  })
}
export function getList (data) {
  return request({
    url: `/${NAME}/getList`,
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
export function submitComment (data) {
  return request({
    url: `/comments/create`,
    method: 'post',
    data
  })
}
export function getCommentsById (data) {
  return request({
    url: `/${NAME}/getCommentsById`,
    method: 'post',
    data
  })
}
export function findQuestion (data) {
  return request({
    url: `/${NAME}/find`,
    method: 'post',
    data
  })
}
export function updateQSupport (data) { // 点赞
  return request({
    url: `/${NAME}/updateSupport`,
    method: 'get',
    params: data
  })
}
export function getQuestionsByUserId (data) { // 获取用户问题列表，可分页
  return request({
    url: `/${NAME}/getQuestionsByUserId`,
    method: 'post',
    data
  })
}
export function toDeleteQuestion (data) { // 根据id，删除问题
  return request({
    url: `/${NAME}/delete`,
    method: 'post',
    data
  })
}
export function updateQuestion (data) { // 修改问题
  return request({
    url: `/${NAME}/update`,
    method: 'post',
    data
  })
}
