<!--xiolng-->
<!--List-->
<!--2021/6/26-->
<!--7:44-->
<template>
  <div class="List">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '优惠券名称', key: 'couponName'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="$router.push(`/marketingManage/salesManage/CreateSale`)">新建</a-button>
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="couponId"
      @change="pageChange"
    >
      <div slot="addCoupon" slot-scope="text, record">
        <a-button type="primary" size="small" class="mr-10" @click="addVisible = true, editId = record.couponId">追加
        </a-button>
        <a-button size="small" @click="$router.push(`/marketingManage/SalesManage/AddLog?id=${record.couponId}`)">追加记录</a-button>
      </div>
      <div slot="couponStatus" slot-scope="text, record" style="display: flex; align-items: center;">
        <a-tag :color="text == 1 ? 'cyan':'red'">{{text == 0 ? '未启用':'启用'}}</a-tag>
        <a-switch :checked="text == 1 ? true: false" @click="changeStatus(record)" />
      </div>
      <div slot="couponType" slot-scope="text">
        <a-tag color="cyan">{{text == 0 ? '满减券':'折扣券'}}</a-tag>
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="$router.push(`/marketingManage/salesManage/createSale?id=${record.couponId}`)"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.couponId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <create-add-coupon
      v-if="addVisible"
      :visible="addVisible"
      :edit-id="editId"
      @cancel="addVisible = false, editId = null"
      @create="addVisible = false, editId = null, getList()"
    />
  </div>
</template>

<script>

  import SearchC from "@/components/SearchC/SearchC"
  import { deleteCouponApi, disableCouponApi, enableCouponApi, pageCouponApi } from "@/api/SalesManageApi"
  import CreateAddCoupon from "@/views/MarketingManage/SalesManage/CreateAddCoupon"

  const column = [
    {
      title: '优惠券名称',
      dataIndex: 'couponName'
    },
    {
      title: '投放数量',
      dataIndex: 'launchCount'
    },
    {
      title: '剩余数量',
      dataIndex: 'launchAllowance'
    },
    {
      title: '优惠券状态',
      dataIndex: 'couponStatus',
      scopedSlots: { customRender: 'couponStatus' }
    },
    {
      title: '优惠券类型',
      dataIndex: 'couponType',
      scopedSlots: { customRender: 'couponType' }
    },
    {
      title: '投放结束时间',
      dataIndex: 'launchEndTime'
    },
    {
      title: '追加',
      dataIndex: 'couponType1',
      scopedSlots: { customRender: 'addCoupon' }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: "List",
    components: { CreateAddCoupon, SearchC },
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
        addVisible: false,
        editId: null
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        pageCouponApi({
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
      changeStatus (item) {
        const func = item.couponStatus == 1 ? disableCouponApi : enableCouponApi
        func({
          couponId: item.couponId
        }).then(res => {
          if (res.data.code == '200') {
            this.$message.success('操作成功')
            this.getList()
          }
        })
      },
      /**
       * 删除
       * @param couponId
       */
      deleteItem (couponId) {
        deleteCouponApi({
          couponId
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
  .List {

  }
</style>
