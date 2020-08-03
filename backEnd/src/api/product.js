import request from '@/utils/request.js'
const NAME = 'product'

export function getProductList (data) { // 获取商品列表，可分页
  return request({
    url: `/${NAME}/getProductList`,
    method: 'post',
    data
  })
}
export function getOrderList (data) { // 获取订单列表，可分页
  return request({
    url: '/admin/getOrders',
    method: 'post',
    data
  })
}
