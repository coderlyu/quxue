import request from '@/utils/request.js'

const NAME = 'product'

export function createProduct (data) {
  return request({
    url: `/${NAME}/create`,
    method: 'post',
    data
  })
}
/**
 *
 * @param {*} data
 */
export function getProductList (data) {
  return request({
    url: `/${NAME}/getProductList`,
    method: 'post',
    data
  })
}

export function getProductDetailById (data) {
  return request({
    url: `/${NAME}/detail`,
    method: 'post',
    data
  })
}
export function toBuyProducts (data) {
  return request({
    url: `/${NAME}/toBuyProducts`,
    method: 'post',
    data
  })
}
// 修改订单状态
export function toUpDateOrderStatus (data) {
  return request({
    url: `/${NAME}/toUpDateOrderStatus`,
    method: 'post',
    data
  })
}
