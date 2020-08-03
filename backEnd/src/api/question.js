import request from '@/utils/request.js'
const NAME = 'question'

export function getList (data) { // 获取问题列表
  return request({
    url: `/${NAME}/getList`,
    method: 'post',
    data
  })
}
