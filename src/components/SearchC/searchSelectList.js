/**
 * 搜索关键字
 * @type {{PayList: {name: string, key: string}[]}}
 */
const searchSelectList = {
  // 员工列表
  GoodsList: [
    {
      key: 'productName',
      name: '商品名称'
    },
    {
      key: 'realname',
      name: '真实姓名'
    },
  ],
  // 角色列表
  RoleManage: [
    {
      key: 'roleName',
      name: '角色名'
    },
  ],
  // 号池管理列表
  NumberPoolManage: [
    {
      key: 'numberPoolId',
      name: '号池ID'
    },
    {
      key: 'numberPoolName',
      name: '号池名称'
    },
  ],

}
export default searchSelectList
