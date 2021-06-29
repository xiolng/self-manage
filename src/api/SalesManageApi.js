/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = ``
// 删除优惠券
export const deleteCouponApi = params => Http.get(
  `${BASE_URL}/coupon/coupon/deleteCoupon`,
  { params }
)
// 优惠券详情
export const getCouponIdApi = params => Http.get(
  `${BASE_URL}/coupon/coupon/getCouponId`,
  { params }
)
// 启用
export const enableCouponApi = params => Http.get(
  `${BASE_URL}/coupon/coupon/enableCoupon`,
  { params }
)
// 禁用
export const disableCouponApi = params => Http.get(
  `${BASE_URL}/coupon/coupon/disableCoupon`,
  { params }
)
// 优惠券追加
export const addCouponApi = params => Http.get(
  `${BASE_URL}/coupon/coupon/addCoupon`,
  { params }
)
// 优惠券追加记录
export const addCouponRecordApi = params => Http.get(
  `${BASE_URL}/coupon/coupon/addCouponRecord`,
  { params }
)
// 场景列表
export const sceneListApi = params => Http.get(
  `${BASE_URL}/coupon/scene/sceneList`,
  { params }
)
// 场景详情
export const getSceneByIdApi = params => Http.get(
  `${BASE_URL}/coupon/scene/getSceneById`,
  { params }
)
// 优惠券列表
export const pageCouponApi = data => Http.post(
  `${BASE_URL}/coupon/coupon/pageCoupon`,
  data
)
// 优惠券保存
export const saveCouponApi = data => Http.post(
  `${BASE_URL}/coupon/coupon/saveCoupon`,
  data
)

// 优惠券更新
export const updateCouponApi = data => Http.post(
  `${BASE_URL}/coupon/coupon/updateCoupon`,
  data
)
