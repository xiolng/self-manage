/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const statisticsSalesVolume = data => Http.post(
  `${BASE_URL}/system/statistics/statisticsSalesVolume`,
  data
)
// 详情
export const getSystemIdeaByIdApi = params => Http.get(
  `${BASE_URL}/systemIdea/getSystemIdeaById`,
  { params }
)
// 删除
export const deleteSystemIdeaByIdApi = params => Http.get(
  `${BASE_URL}/systemIdea/deleteSystemIdeaById`,
  { params }
)

// 统计收益
export const statisticsProfitApi = params => Http.get(
  `${BASE_URL}/system/statistics/statisticsProfit`,
  { params }
)

// 统计订单
export const statisticsOrderApi = params => Http.get(
  `${BASE_URL}/system/statistics/statisticsOrder`,
  { params }
)
// 统计指定日期收益
export const statisticsProfitByDateApi = params => Http.get(
  `${BASE_URL}/system/statistics/statisticsProfitByDate`,
  { params }
)
// 统计访客
export const statisticsVisitorApi = params => Http.get(
  `${BASE_URL}/system/statistics/statisticsVisitor`,
  { params }
)
