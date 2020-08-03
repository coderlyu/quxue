import request from '@/utils/request.js'

const NAME = 'comments'

export function toUpdateComment (data) {
  return request({
    url: `/${NAME}/update`,
    method: 'post',
    data
  })
}

export function updateSupport (data) { // 点赞
  return request({
    url: `/${NAME}/updateSupport`,
    method: 'get',
    params: data
  })
}
