<!--xiolng-->
<!--GoodsSort-->
<!--2021/6/18-->
<!--10:47-->
<template>
  <div class="GoodsSort">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '分类名称', key: 'categoryName'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="visible = true, isEdit = null">新建</a-button>
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="productCategoryId"
      @change="pageChange"
    >
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, isEdit = record.productCategoryId"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.productCategoryId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <!--添加弹窗-->
    <create-goods-sort
      v-if="visible"
      ref="createGoodsSort"
      :visible="visible"
      :edit-id="isEdit"
      @cancel="visible = false, isEdit = null"
      @create="saveCategory"
    />
  </div>
</template>

<script>

  import SearchC from "@/components/SearchC/SearchC"
  import {
    deleteProductCategoryApi,
    pageProductCategoryApi,
    saveProductCategoryApi,
    updateProductCategoryApi
  } from "@/api/GoodsManageApi"
  import CreateGoodsSort from "@/views/GoodsManage/GoodsSort/CreateGoodsSort"

  const column = [
    {
      title: '分类名称',
      dataIndex: 'categoryName'
    },
    {
      title: '创建人',
      dataIndex: 'createName'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: "GoodsSort",
    components: { CreateGoodsSort, SearchC },
    data () {
      return {
        column,
        pages: {
          current: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true
        }, // 分页
        searchName: {}, // 搜索关键字
        dataSource: [],
        visible: false,
        isEdit: null
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
        pageProductCategoryApi({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          const { data, code, total } = res.data
          if (code === '200') {
            this.dataSource = data
            this.pages.total = total
          }
        })
      },
      /**
       * 删除
       * @param productCategoryId
       */
      deleteItem (productCategoryId) {
        deleteProductCategoryApi({
          productCategoryId
        }).then(res => {
          const { code } = res.data
          if (code === '200') {
            this.$message.success('删除成功')
            this.getList()
          }
        })
      },
      saveCategory () {
        this.$refs.createGoodsSort.form.validateFields((err, val) => {
          if (!err) {
            const func = this.isEdit ? updateProductCategoryApi : saveProductCategoryApi
            func({
              [this.isEdit ? 'productCategoryId' : '']: this.isEdit,
              ...val
            }).then(res => {
              if (res.data.code == '200') {
                this.$message.success('保存成功')
                this.getList()
              }
              this.isEdit = null
              this.visible = false
            })
          }
        })
      },
      /**
       * 搜索、筛选
       * @param value
       */
      getSearch (value) {
        this.searchName = value
        this.getList()
      },
      /**
       * 分页、跳转
       * @param pagination
       */
      pageChange (pagination) {
        this.pages = {
          ...this.pages,
          ...pagination,
          pageNum: pagination.current
        }
        this.getList()
      },
    }
  }
</script>

<style scoped lang="less">
  .GoodsSort {

  }
</style>
