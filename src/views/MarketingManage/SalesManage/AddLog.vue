<!--xiolng-->
<!--AddLog-->
<!--2021/6/28-->
<!--14:43-->
<template>
  <div class="AddLog">
    <!--筛选、添加-->
    <!--<a-row type="flex" justify="space-between" align="top" class="mb-20">-->
    <!--  <a-col span="20">-->
    <!--    <search-c-->
    <!--      @get-list="getSearch"-->
    <!--      :search-list="[-->
    <!--        {name: '用户名', key: 'username'}-->
    <!--        ]"-->
    <!--    />-->
    <!--  </a-col>-->
    <!--</a-row>-->
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="createTime"
      @change="pageChange"
    >
      <!--<div slot="operation" slot-scope="text, record">-->
      <!--  <a-row type="flex">-->
      <!--    <a-col>-->
      <!--      <a-button-->
      <!--        type="primary"-->
      <!--        size="small"-->
      <!--        class="mr-10"-->
      <!--        @click="visible = !visible, isEdit = record.id"-->
      <!--      >编辑-->
      <!--      </a-button>-->
      <!--    </a-col>-->
      <!--    <a-col>-->
      <!--      <a-popconfirm-->
      <!--        title="确定要删除吗？"-->
      <!--        @confirm="deleteItem(record.id)"-->
      <!--      >-->
      <!--        <a-button type="danger" size="small">删除</a-button>-->
      <!--      </a-popconfirm>-->
      <!--    </a-col>-->
      <!--  </a-row>-->
      <!--</div>-->
    </a-table>
  </div>
</template>

<script>

  import { addCouponRecordApi } from "@/api/SalesManageApi"

  const column = [
    {
      title: '添加时间',
      dataIndex: 'createTime'
    },
    {
      title: '添加数量',
      dataIndex: 'addCount'
    },
  ]
  export default {
    name: "AddLog",
    data () {
      return {
        column,
        pages: {
          current: 1,
          pageNum: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true
        }, // 分页
        searchName: {}, // 搜索关键字
        dataSource: [],
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        addCouponRecordApi({
          couponId: this.$route.query.id
        }).then(res => {
          const { data, code, total } = res.data
          if (code === '200') {
            this.dataSource = data
            this.pages.total = total || data.length
          }
        })
      },
      /**
       * 删除
       * @param id
       */
      deleteItem (id) {
        userDeleteApi({
          id
        }).then(res => {
          const { code } = res
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
  .AddLog {

  }
</style>
