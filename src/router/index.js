/**
 * 路由列表
 * {
 *  @param path: 路径,
 *  @param name: 路由名称,
 *  @param component: 模板,
 *  @param meta: 附加信息{
 *    name: 菜单名称,
 *    icon: 菜单图标,
 *    hideMenu: 是否隐藏菜单,
 *    activeUrl: 匹配选中菜单
 *  },
 * }
 */
const routes = [
  {
    path: '/',
    redirect: 'home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MainLayout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home'),
        meta: {
          name: '概况',
          icon: 'home',
          activeUrl: '/'
        }
      },
      {
        path: '/shopManage',
        component: () => import('@/views/ShopManage'),
        meta: {
          name: '店铺管理',
          icon: 'shop',
          activeUrl: '/shopManage'
        },
        children: [
          {
            path: 'detail',
            name: 'detail',
            component: () => import('@/views/ShopManage/ShopManage'),
            meta: {
              name: '店铺信息',
              icon: 'setting',
              activeUrl: '/shopManage/detail'
            }
          },
          {
            path: 'menu',
            name: 'menu',
            component: () => import('@/views/ShopManage/ShopMenu'),
            meta: {
              name: '店铺菜单',
              icon: 'setting',
              activeUrl: '/shopManage/menu'
            }
          },
          {
            path: 'showWindow',
            name: 'showWindow',
            component: () => import('@/views/ShopManage/ShopShowWindow'),
            meta: {
              name: '店铺橱窗',
              icon: 'setting',
              activeUrl: '/shopManage/showWindow'
            }
          },
          {
            path: 'banner',
            name: 'banner',
            component: () => import('@/views/ShopManage/ShopBanner'),
            meta: {
              name: '轮播图',
              icon: 'setting',
              activeUrl: '/shopManage/banner'
            }
          },
        ]
      },
      {
        path: '/goodsManage',
        component: () => import('@/views/GoodsManage'),
        meta: {
          name: '商品管理',
          icon: 'setting',
          activeUrl: '/goodsManage'
        },
        children: [
          {
            path: 'goodsList',
            name: 'goodsList',
            component: () => import('@/views/GoodsManage/GoodsList/GoodsList'),
            meta: {
              name: '商品列表',
              icon: 'usergroup-add',
              searchKey: 'GoodsList',
              activeUrl: '/goodsManage/goodsList'
            },
          },
          {
            path: 'saveGoods',
            name: 'saveGoods',
            component: () => import('@/views/GoodsManage/GoodsList/SaveGoods'),
            meta: {
              name: '新建、编辑',
              icon: 'usergroup-add',
              hideMenu: true,
              activeUrl: '/goodsManage/goodsList'
            },
          },
          {
            path: 'goodsSort',
            name: 'goodsSort',
            component: () => import('@/views/GoodsManage/GoodsSort/GoodsSort'),
            meta: {
              name: '商品分类',
              icon: 'cluster',
              searchKey: 'GoodsSort',
              activeUrl: '/goodsManage/goodsSort'
            }
          },
          {
            path: 'postageManage',
            name: 'postageManage',
            component: () => import('@/views/GoodsManage/PostageManage'),
            meta: {
              name: '邮费管理',
              icon: 'cluster',
              searchKey: 'GoodsSort',
              activeUrl: '/goodsManage/postageManage'
            }
          },
          {
            path: 'specGroup',
            name: 'specGroup',
            component: () => import('@/views/GoodsManage/SpecGroup'),
            meta: {
              name: '规格组',
              icon: 'cluster',
              searchKey: 'GoodsSort',
              activeUrl: '/goodsManage/specGroup'
            }
          },
          {
            path: 'specParam',
            name: 'specParam',
            component: () => import('@/views/GoodsManage/SpecParam'),
            meta: {
              name: '规格属性',
              icon: 'cluster',
              hideMenu: true,
              searchKey: 'GoodsSort',
              activeUrl: '/goodsManage/specGroup'
            }
          },
        ]
      },
      {
        path: '/orderManage',
        name: 'orderManage',
        component: () => import('@/views/OrderManage'),
        meta: {
          name: '订单管理',
          icon: 'cluster',
          activeUrl: '/orderManage'
        },
        children: [
          {
            path: 'orderList',
            name: 'orderList',
            component: () => import('@/views/OrderManage/OrderList'),
            meta: {
              name: '订单列表',
              icon: 'cluster',
              activeUrl: '/orderManage/orderList'
            }
          }
        ]
      },
      {
        path: `/marketingManage`,
        name: 'marketingManage',
        component: () => import('@/views/MarketingManage'),
        meta: {
          name: '营销管理',
          icon: 'cluster',
          activeUrl: '/marketingManage'
        },
        children: [
          {
            path: `default`,
            name: 'default',
            component: () => import('@/views/MarketingManage/Default'),
            meta: {
              name: '营销列表',
              icon: 'cluster',
              activeUrl: '/marketingManage/default'
            }
          },
          {
            path: 'salesManage',
            name: 'salesManage',
            component: () => import('@/views/MarketingManage/SalesManage'),
            meta: {
              name: '优惠券管理',
              icon: 'cluster',
              hideMenu: true,
              activeUrl: '/marketingManage/default'
            },
            children: [
              {
                path: 'salesList',
                name: 'salesList',
                component: () => import('@/views/MarketingManage/SalesManage/List'),
                meta: {
                  name: '优惠券列表',
                  icon: 'cluster',
                  activeUrl: '/marketingManage/default'
                }
              },
              {
                path: 'createSale',
                name: 'createSale',
                component: () => import('@/views/MarketingManage/SalesManage/CreateSale'),
                meta: {
                  name: '优惠券管理',
                  icon: 'cluster',
                  hideMenu: true,
                  activeUrl: '/marketingManage/default'
                }
              },
              {
                path: 'addLog',
                name: 'addLog',
                component: () => import('@/views/MarketingManage/SalesManage/AddLog'),
                meta: {
                  name: '优惠券管理',
                  icon: 'cluster',
                  hideMenu: true,
                  activeUrl: '/marketingManage/default'
                }
              }
            ]
          },
        ]
      },
      {
        path: '/dataManage',
        name: 'dataManage',
        component: () => import('@/views/DataManage'),
        meta: {
          name: '数据管理',
          icon: 'cluster',
          activeUrl: '/dataManage'
        },
        children: [
          {
            path: 'dataList',
            name: 'dataList',
            component: () => import('@/views/DataManage/DataList'),
            meta: {
              name: '数据看板',
              icon: 'cluster',
              activeUrl: '/dataManage/dataList'
            }
          },
        ]
      }
    ]
  },
  {
    path: '/signin',
    component: () => import('@/views/Login'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('@/views/Login/Login'),
        activeUrl: '/signin'
      }
    ]
  },
  {
    path: '/403',
    name: 'noAccess',
    component: () => import('@/views/noAccess')
  },
  {
    path: '*',
    name: 'noPage',
    component: () => import('@/views/noPage')
  }
]

export default routes
