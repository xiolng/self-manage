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
  { params }
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

// 删除菜单
export const deleteKingDistrictApi = params => Http.get(
  `${BASE_URL}/system/kingDistrict/deleteKingDistrict`,
  { params }
)

// 查询菜单
export const getKingDistrictApi = params => Http.get(
  `${BASE_URL}/system/kingDistrict/getKingDistrict`,
  { params }
)

// 菜单列表
export const pageKingDistrictApi = data => Http.post(
  `${BASE_URL}/system/kingDistrict/pageKingDistrict`,
  data
)

// 保存菜单
export const saveKingDistrictApi = data => Http.post(
  `${BASE_URL}/system/kingDistrict/saveKingDistrict`,
  data
)

// 更新菜单
export const updateKingDistrictApi = data => Http.post(
  `${BASE_URL}/system/kingDistrict/updateKingDistrict`,
  data
)

// 删除橱窗
export const deleteShowWindowApi = params => Http.get(
  `${BASE_URL}/system/showWindow/deleteShowWindow`,
  { params }
)
// 禁用橱窗
export const displayShowWindowApi = params => Http.get(
  `${BASE_URL}/system/showWindow/displayShowWindow`,
  { params }
)
// 启用橱窗
export const enableShowWindowApi = params => Http.get(
  `${BASE_URL}/system/showWindow/enableShowWindow`,
  { params }
)

// 查询橱窗
export const getShowWindowApi = params => Http.get(
  `${BASE_URL}/system/showWindow/getShowWindow`,
  { params }
)

// 橱窗列表
export const pageShowWindowApi = data => Http.post(
  `${BASE_URL}/system/showWindow/pageShowWindow`,
  data
)

// 保存橱窗
export const saveShowWindowApi = data => Http.post(
  `${BASE_URL}/system/showWindow/saveShowWindow`,
  data
)

// 更新橱窗
export const updateShowWindowApi = data => Http.post(
  `${BASE_URL}/system/showWindow/updateShowWindow`,
  data
)

// 删除banner
export const deleteShopBannerApi = params => Http.get(
  `${BASE_URL}/system/shopBanner/deleteShopBanner`,
  { params }
)

// 查询banner
export const getShopBannerApi = params => Http.get(
  `${BASE_URL}/system/shopBanner/getShopBanner`,
  { params }
)

// banner列表
export const pageShopBannerApi = data => Http.post(
  `${BASE_URL}/system/shopBanner/pageShopBanner`,
  data
)

// 保存banner
export const saveShopBannerApi = data => Http.post(
  `${BASE_URL}/system/shopBanner/saveShopBanner`,
  data
)

// 更新banner
export const updateShopBannerApi = data => Http.post(
  `${BASE_URL}/system/shopBanner/updateShopBanner`,
  data
)
