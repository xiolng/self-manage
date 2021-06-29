/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = ``
// 获取列表
export const getShopApi = params => Http.get(
  `${BASE_URL}/system/shop/getShop`,
  {params}
)
// 详情
export const saveShopApi = data => Http.post(
  `${BASE_URL}/system/shop/saveShop`,
  data
)
// 删除
export const updateShopApi = data => Http.post(
  `${BASE_URL}/system/shop/updateShop`,
  data
)
