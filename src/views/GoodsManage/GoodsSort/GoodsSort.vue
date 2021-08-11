<!--xiolng-->
<!--GoodsSort-->
<!--2021/6/18-->
<!--10:47-->
<template>
  <div class="GoodsSort">
    <!--筛选、添加-->
    <!--<a-row type="flex" justify="space-between" align="top" class="mb-20">-->
    <!--  <a-col span="20">-->
    <!--    <search-c-->
    <!--      @get-list="getSearch"-->
    <!--      :search-list="[-->
    <!--        {name: '分类名称', key: 'categoryName'}-->
    <!--        ]"-->
    <!--    />-->
    <!--  </a-col>-->
    <!--  <a-col>-->
    <!--    <a-button type="primary" @click="visible = true, isEdit = null">新建</a-button>-->
    <!--  </a-col>-->
    <!--</a-row>-->
    <!--&lt;!&ndash;table-list&ndash;&gt;-->
    <!--<a-table-->
    <!--  :columns="column"-->
    <!--  :treeList="treeList"-->
    <!--  :pagination="pages"-->
    <!--  rowKey="productCategoryId"-->
    <!--  @change="pageChange"-->
    <!--&gt;-->
    <!--  <div slot="operation" slot-scope="text, record">-->
    <!--    <a-row type="flex">-->
    <!--      <a-col>-->
    <!--        <a-button-->
    <!--          type="primary"-->
    <!--          size="small"-->
    <!--          class="mr-10"-->
    <!--          @click="visible = !visible, isEdit = record.productCategoryId"-->
    <!--        >编辑-->
    <!--        </a-button>-->
    <!--      </a-col>-->
    <!--      <a-col>-->
    <!--        <a-popconfirm-->
    <!--          title="确定要删除吗？"-->
    <!--          @confirm="deleteItem(record.productCategoryId)"-->
    <!--        >-->
    <!--          <a-button type="danger" size="small">删除</a-button>-->
    <!--        </a-popconfirm>-->
    <!--      </a-col>-->
    <!--    </a-row>-->
    <!--  </div>-->
    <!--</a-table>-->
    <!--&lt;!&ndash;添加弹窗&ndash;&gt;-->
    <!--<create-goods-sort-->
    <!--  v-if="visible"-->
    <!--  ref="createGoodsSort"-->
    <!--  :visible="visible"-->
    <!--  :edit-id="isEdit"-->
    <!--  @cancel="visible = false, isEdit = null"-->
    <!--  @create="saveCategory"-->
    <!--/>-->
    <!--菜单树-->
    <Tree
      :data="treeList"
      :render="renderContent"
      :arrow-size="20"
      style="max-width: 500px;"
    ></Tree>
    <Modal
      v-model="showModal"
      :title="`${showAdd ? '新增' : showEdit ? '编辑' : '删除'}菜单`"
      :footer-hide="!showDel"
      @on-cancel="modalCancel"
      @on-ok="showDel ? delRole() : ''"
    >
      <!--添加菜单-->
      <AddMenu v-if="showAdd" :callback="addMenu" :menu-data="menuData" />
      <EditMenu v-if="showEdit" :callback="addMenu" :menu-data="menuData" />
      <!--删除角色-->
      <Row type="flex" justify="center" align="middle" :gutter="10" v-if="showDel">
        <Col>
          <a-icon type="exclamation-circle" style="color: #f90; font-size: 30px;"></a-icon>
        </Col>
        <Col>
          <span>确定删除 {{removeName}} 吗 ？</span>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>

  import {
    deleteProductCategoryApi,
    listProductCategoryApi,
  } from "@/api/GoodsManageApi"
  import { renderContent, rootFun, treeMenu } from "@/utils/menu"
  import EditMenu from "@/views/GoodsManage/GoodsSort/EditMenu"
  import AddMenu from "@/views/GoodsManage/GoodsSort/AddMenu"

  export default {
    name: "GoodsSort",
    components: { AddMenu, EditMenu },
    data () {
      return {
        treeList: [
          {
            title: '目录',
            expand: true,
            productCategoryId: 0,
            render: rootFun.bind(this),
            // 菜单列表
            children: []
          }
        ],
        showModal: false, // 弹窗组件，多个添加，编辑，删除，共用一个
        showAdd: false, // 添加弹窗
        showEdit: false, // 编辑弹窗
        showDel: false, // 删除弹窗
        menuData: {}, // 选中菜单内容
        renderContent: renderContent.bind(this), // 菜单列表 增删改 按钮
        removeName: ''
      }
    },
    created () {
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        listProductCategoryApi({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          const { data, code } = res.data
          if (code === '200') {
            this.treeList[0].children = treeMenu(data, 'productCategoryId')
          }
        })
      },
      // 添加菜单
      addMenu () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.showDel = false
        this.menuData = {}
        this.getList()
      },
      /**
       * 删除角色弹窗
       * @param data 获取删除id
       */
      removeRole (data) {
        this.removeName = data.menuName
        this.removeRoleId = data.productCategoryId
        this.showModal = true
        this.showDel = true
      },
      delRole () {
        deleteProductCategoryApi({
          productCategoryId: this.removeRoleId
        }).then(res => {
          if (res.data.code === '200') {
            this.getList()
            this.$store.dispatch('commitMenus')
            this.$message.success('删除成功')
            this.showDel = false
          }
        })
      },
      // 取消关闭弹窗
      modalCancel () {
        this.showModal = false
        this.showAdd = false
        this.showEdit = false
        this.showDel = false
        this.menuData = {}
      }
    }
  }
</script>

<style scoped lang="less">
  .GoodsSort {
    /deep/ .ivu-tree-children {
      .ivu-tree-arrow {
        margin-right: 5px;

        .ivu-icon {
          font-size: 20px;
        }
      }

      .ivu-tree-title {
        width: 100%;

        &:hover {
          background: #fff;
        }

        &:active {
          background: #fff;
        }
      }

      .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
        background-color: #fff
      }
    }
  }
</style>
