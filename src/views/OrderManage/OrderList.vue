<!--xiolng-->
<!--OrderList-->
<!--2021/6/18-->
<!--15:48-->
<template>
  <div class="OrderList">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '买家地址', key: 'buyerAddress'},
            {name: '买家姓名', key: 'buyerName'},
            {name: '买家电话', key: 'buyerTel'}
            ]"
        />
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="orderId"
      @change="pageChange"
      expandRowByClick
    >
      <div slot="expandedRowRender" slot-scope="record" style="padding: 0 20px; background: #fff;">
        <a-row
          type="flex"
          justify="start"
          align="middle"
          v-for="(item, index) in record.orderDetailListOutDTOList"
          :key="index"
          style=" padding: 10px 0; border-bottom: 1px solid #eee;"
          :style="{marginBottom: (index > record.orderDetailListOutDTOList.length - 1) ? '20px':''}"
        >
          <a-col span="1">
            <a-avatar :src="`/files/${item.productCover}`" />
          </a-col>
          <a-col span="4">
            <div class="ellipsis">{{item.productName}}</div>
          </a-col>
          <a-col span="6">
            订单日期：{{item.createTime}}
          </a-col>
          <a-col span="2" style="color: red">
            ￥{{item.productPrice}}
          </a-col>
          <a-col span="2" style="color: red">
            x{{item.productNumber}}
          </a-col>
        </a-row>
        <a-row type="flex" justify="space-between" style="padding: 20px 0;">
          <a-col>
            总价格： <span style="color: red;">
            {{record.orderPrice}}
          </span> 元
          </a-col>
          <a-col>
            收货地址： {{record.buyerAddress}}
          </a-col>
        </a-row>
      </div>
      <div slot="orderStatus" slot-scope="text">
        <a-tag :color="(text == 3 || text == 9) ? 'cyan':'red'">
          {{orderStatus[text]}}
        </a-tag>
      </div>
      <div slot="payStatus" slot-scope="text">
        <a-tag :color="(text == 4) ? 'cyan':'red'">
          {{payStatus[text]}}
        </a-tag>
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col v-if="record.orderStatus == 2 && record.payStatus == 4">
            <a-button @click.stop="visible = true, editId = record.orderId" type="primary" size="small" class="mr-10">发货</a-button>
          </a-col>
          <a-col>
            <a-button
              :disabled="record.orderStatus <=2 || record.orderStatus == 8"
              type="primary"
              size="small"
              class="mr-10"
              @click.stop="visible = true, editId = record.orderId"
            >更新物流
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              :disabled="record.orderStatus !== 8"
              title="确定要删除吗？"
              @confirm="deleteItem(record.orderId)"
            >
              <a-button @click.stop="" :disabled="record.orderStatus !== 8" type="danger" size="small">取消订单</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <!--更新物流信息-->
    <logistics-no
      v-if="visible"
      ref="logistic"
      :visible="visible"
      :edit-id="editId"
      @cancel="visible = false, editId = null"
      @create="visible = false, editId = null, getList()"
    />
  </div>
</template>

<script>

  import SearchC from "@/components/SearchC/SearchC"
  import { cancelOrderApi, pageOrderApi } from "@/api/OrderManageApi"
  import { orderStatus, payStatus } from "@/utils/statusBase"
  import LogisticsNo from "@/views/SystemManage/RoleManage/LogisticsNo"

  const column = [
    {
      title: '订单编号',
      dataIndex: 'orderNo'
    },
    {
      title: '订单状态',
      dataIndex: 'orderStatus',
      scopedSlots: { customRender: 'orderStatus' }
    },
    {
      title: '支付状态',
      dataIndex: 'payStatus',
      scopedSlots: { customRender: 'payStatus' }
    },
    {
      title: '买家姓名',
      dataIndex: 'buyerName'
    },
    {
      title: '买家电话',
      dataIndex: 'buyerTel'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: "OrderList",
    components: { LogisticsNo, SearchC },
    data () {
      return {
        column,
        orderStatus,
        payStatus,
        pages: {
          current: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true
        }, // 分页
        searchName: {}, // 搜索关键字
        dataSource: [],
        visible: false,
        editId: null
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
        pageOrderApi({
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
       * @param orderId
       */
      deleteItem (orderId) {
        cancelOrderApi({
          orderId
        }).then(res => {
          const { code } = res
          if (code === '200') {
            this.$message.success('取消成功')
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
  .OrderList {

  }
</style>
