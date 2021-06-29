/**
 * @author: xiolng
 * @file TenantManageApi
 * @date 2020/10/23
 * @time 9:51
 */
import Http from '@/api/Http'

const BASE_URL = ``
// 批量上架
export const batchIsPutApi = params => Http.get(
  `${BASE_URL}/system/product/batchIsPut`,
  { params }
)
// 批量下架
export const batchNotPutApi = params => Http.get(
  `${BASE_URL}/system/product/batchNotPut`,
  { params }
)
// 上架
export const isPutApi = params => Http.get(
  `${BASE_URL}/system/product/isPut`,
  { params }
)
// 下架
export const notPutApi = params => Http.get(
  `${BASE_URL}/system/product/notPut`,
  { params }
)
// 商品列表
export const pageProductApi = data => Http.post(
  `${BASE_URL}/system/product/pageProduct`,
  data
)
// 保存商品
export const saveProductApi = data => Http.post(
  `${BASE_URL}/system/product/saveProduct`,
  data
)
// 更新商品
export const updateProductApi = data => Http.post(
  `${BASE_URL}/system/product/updateProduct`,
  data
)
// 商品详情
export const getProductByIdApi = params => Http.get(
  `${BASE_URL}/system/product/getProductById`,
  { params }
)
// 删除商品
export const deleteProductApi = params => Http.get(
  `${BASE_URL}/system/product/deleteProduct`,
  { params }
)
/** *******************商品分类****************/
// 删除分类*
export const deleteProductCategoryApi = params => Http.get(
  `${BASE_URL}/system/productCategory/deleteProductCategory`,
  { params }
)

// 获取详情分类*
export const getProductCategoryByIdApi = params => Http.get(
  `${BASE_URL}/system/productCategory/getProductCategoryById`,
  { params }
)

// 查询所有分类*
export const listProductCategoryApi = params => Http.get(
  `${BASE_URL}/system/productCategory/listProductCategory`,
  { params }
)

// 分页查询分类*
export const pageProductCategoryApi = data => Http.post(
  `${BASE_URL}/system/productCategory/pageProductCategory`,
  data
)
// 新建分类*
export const saveProductCategoryApi = data => Http.post(
  `${BASE_URL}/system/productCategory/saveProductCategory`,
  data
)

// 修改分类*
export const updateProductCategoryApi = data => Http.post(
  `${BASE_URL}/system/productCategory/updateProductCategory`,
  data
)
