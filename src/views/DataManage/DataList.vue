<!--xiolng-->
<!--DataList-->
<!--2021/6/28-->
<!--9:58-->
<template>
  <div class="DataList">
    <a-card class="mb-20">
      <div slot="title">
        <a-row type="flex" :gutter="20">
          <a-col>
            <div style="line-height: 32px; font-size: 18px;">访客统计</div>
          </a-col>
          <a-col>
            <span>按日期：</span>
            <a-radio-group v-model="saleDate" @change="getVisitor(saleDate, saleCount)">
              <a-radio-button value="YEAR">年</a-radio-button>
              <a-radio-button value="MONTH">月</a-radio-button>
              <a-radio-button value="DAY">天</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col>
            <span>数量：</span>
            <a-radio-group v-model="saleCount" @change="getVisitor(saleDate, saleCount)">
              <a-radio-button :value="10">10</a-radio-button>
              <a-radio-button :value="50">50</a-radio-button>
              <a-radio-button :value="100">100</a-radio-button>
              <a-radio-button :value="200">200</a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>

      <my-echarts type="line" :ec-data="saleData" v-if="saleData.data && saleData.data.length" />
    </a-card>
    <a-card>
      <div slot="title">
        <a-row type="flex" :gutter="20">
          <a-col>
            <div style="line-height: 32px; font-size: 18px;">订单统计</div>
          </a-col>
          <a-col>
            <span>按日期：</span>
            <a-radio-group v-model="orderDate" @change="getOrder(saleDate, saleCount)">
              <a-radio-button value="YEAR">年</a-radio-button>
              <a-radio-button value="MONTH">月</a-radio-button>
              <a-radio-button value="DAY">天</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col>
            <span>数量：</span>
            <a-radio-group v-model="orderCount" @change="getOrder(saleDate, saleCount)">
              <a-radio-button :value="10">10</a-radio-button>
              <a-radio-button :value="50">50</a-radio-button>
              <a-radio-button :value="100">100</a-radio-button>
              <a-radio-button :value="200">200</a-radio-button>
            </a-radio-group>
          </a-col>
        </a-row>
      </div>
      <my-echarts type="bar" :ec-data="orderData" v-if="orderData.data && orderData.data.length" />
    </a-card>
  </div>
</template>

<script>

  import MyEcharts from "@/components/echarts/my-echarts"
  import { statisticsOrderApi, statisticsVisitorApi } from "@/api/HomeApi"

  export default {
    name: "DataList",
    components: { MyEcharts },
    data () {
      return {
        saleData: {},
        saleDate: 'DAY',
        saleCount: 10,
        orderData: {},
        orderDate: 'DAY',
        orderCount: 10
      }
    },
    mounted () {
      this.getVisitor()
      this.getOrder()
    },
    methods: {
      getVisitor (type = 'DAY', count = 10) {
        statisticsVisitorApi({
          count,
          statisticsType: type
        }).then(res => {
          const { data, code, msg } = res.data
          if (code == '200') {
            this.$set(this, 'saleData', {})
            this.$set(this.saleData, 'mmdd', data.map(v => v.statisticsDate))
            this.$set(this.saleData, 'data', data.map(v => ({ name: v.statisticsDate, value: v.visitorCount })))
          }
        })
      },
      getOrder (type = 'DAY', count = 10) {
        statisticsOrderApi({
          count,
          statisticsType: type
        }).then(res => {
          const { data, code, msg } = res.data
          if (code == '200') {
            this.$set(this, 'orderData', {})
            this.$set(this.orderData, 'mmdd', data.map(v => v.orderDate))
            this.$set(this.orderData, 'data', data.map(v => ({ name: v.orderDate, value: v.sumOrderCount })))
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .DataList {

  }
</style>
