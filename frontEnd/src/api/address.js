import request from '@/utils/request.js'

const NAME = 'address'

export function createAddress (data) {
  return request({
    url: `/${NAME}/create`,
    method: 'post',
    data
  })
}
export function updateAddress (data) {
  return request({
    url: `/${NAME}/update`,
    method: 'post',
    data
  })
}
export function deleteAddress (data) {
  return request({
    url: `/${NAME}/delete`,
    method: 'post',
    data
  })
}
export function getAddressListByUserId () {
  return request({
    url: `/${NAME}/getAddressListByUserId`,
    method: 'get'
  })
}
export function getAddressDetailById (data) {
  return request({
    url: `/${NAME}/detail`,
    method: 'get',
    params: data
  })
}
