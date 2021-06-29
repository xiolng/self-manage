/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = ``
// 取消订单
export const cancelOrderApi = params => Http.get(
  `${BASE_URL}/system/order/cancelOrder`,
  { params }
)
// 订单详情
export const getOrderByIdApi = params => Http.get(
  `${BASE_URL}/system/order/getOrderById`,
  { params }
)
// 订单列表
export const pageOrderApi = data => Http.post(
  `${BASE_URL}/system/order/pageOrder`,
  data
)
// 订单统计
export const statisticsProductApi = data => Http.post(
  `${BASE_URL}/system/order/statisticsProduct`,
  data
)

// 获取物流信息
export const getOrderLogisticsApi = params => Http.get(
  `${BASE_URL}/system/order/getOrderLogistics`,
  { params }
)
// 发货
export const sendProductApi = data => Http.post(
  `${BASE_URL}/system/order/sendProduct`,
  data
)
// 更新物流信息
export const updateOrderLogisticsApi = data => Http.post(
  `${BASE_URL}/system/order/updateOrderLogistics`,
  data
)
