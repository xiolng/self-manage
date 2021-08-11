/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = ``
// 营销列表
export const marketingListApi = params => Http.get(
  `${BASE_URL}/marketing/tenantMarketing/marketingList`,
  { params }
)
// 营销详情
export const marketingIdApi = params => Http.get(
  `${BASE_URL}/marketing/tenantMarketing/marketingId`,
  { params }
)
