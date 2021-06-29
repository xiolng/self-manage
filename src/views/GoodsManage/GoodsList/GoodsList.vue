<!--xiolng-->
<!--GoodsList-->
<!--2021/6/18-->
<!--10:46-->
<template>
  <div class="GoodsList">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '商品名称', key: 'productName'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="$router.push('goodsDetail')">新建</a-button>
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="false"
      rowKey="productId"
      @change="pageChange"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
    >
      <div slot="productCover" slot-scope="text">
        <a-avatar :src="'/files/'+text" />
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button-group class="mr-10">
              <a-button size="small" type="primary" :disabled="!!record.isPut" @click="upProduct(record)">
                <a-icon type="vertical-align-top" />
                上架
              </a-button>
              <a-button size="small" type="danger" :disabled="!record.isPut" @click="downProduct(record)">下架
                <a-icon type="vertical-align-bottom" />
              </a-button>
            </a-button-group>
          </a-col>
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="$router.push(`goodsDetail?productId=${record.productId}`)"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.productId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <a-row type="flex" justify="space-between" class="mt-20">
      <a-col>
        <page-c :total="pages.total" @callback="val => {pages.pageSize = val.pageSize, pages.current = val.current, getList()}" />
      </a-col>
      <a-col>
        <span>批量操作：</span>
        <a-select default-value="1" style="width: 120px" @change="handleChange" class="mr-10">
          <a-select-option value="1">
            批量上架
          </a-select-option>
          <a-select-option value="2">
            批量下架
          </a-select-option>
        </a-select>
        <a-button @click="selectedsOption" type="primary" :disabled="!selectedRowKeys.length">确定</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>

  import SearchC from "@/components/SearchC/SearchC"
  import {
    batchIsPutApi,
    batchNotPutApi,
    deleteProductApi,
    isPutApi,
    notPutApi,
    pageProductApi
  } from "@/api/GoodsManageApi"
  import PageC from "@/components/PageC/PageC"

  const column = [
    {
      title: '商品图片',
      dataIndex: 'productCover',
      scopedSlots: { customRender: 'productCover' }
    },
    {
      title: '商品名称',
      dataIndex: 'productName'
    },
    {
      title: '单价',
      dataIndex: 'productPrice'
    },
    {
      title: '销量',
      dataIndex: 'salesVolume'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '30%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: "GoodsList",
    components: { PageC, SearchC },
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
        selectedRowKeys: [],
        selectedsValue: 1
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log(selectedRows, 'selectedRowKeys changed: ', selectedRowKeys
        )

        this.selectedRowKeys = selectedRows.map(v => v.productId)
      },
      handleChange (value) {
        this.selectedsValue = value
      },
      selectedsOption () {
        const func = this.selectedsValue == 1 ? batchIsPutApi : batchNotPutApi
        func({
          productIds: this.selectedRowKeys.toString()
        }).then(res => {
          if (res.data.code == '200') {
            this.$message.success('操作成功')
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      upProduct (item) {
        isPutApi({
          productId: item.productId
        }).then(res => {
          if (res.data.code == '200') {
            this.$message.success('操作成功')
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      downProduct (item) {
        notPutApi({
          productId: item.productId
        }).then(res => {
          if (res.data.code == '200') {
            this.$message.success('操作成功')
            this.getList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      // 获取列表
      getList () {
        pageProductApi({
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
       * @param id
       */
      deleteItem (productId) {
        deleteProductApi({
          productId
        }).then(res => {
          const { code } = res.data
          if (code === '200') {
            this.$message.success('删除成功')
            this.getList()
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
  .GoodsList {

  }
</style>
