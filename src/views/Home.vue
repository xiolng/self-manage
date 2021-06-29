<template>
  <div class="home main-content">
    <a-card style="margin-bottom: 20px;" :head-style="{fontSize: '20px'}">
      <div slot="title" style="font-size: 16px;">收益概览</div>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card>
            <a-row :gutter="10" type="flex" justify="center" align="middle">
              <a-col>
                <a-statistic
                  title="今日收益"
                  :value="11.28"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: '#cf1322' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon type="arrow-up" />
                  </template>
                </a-statistic>
              </a-col>
              <a-col>
                <a-icon type="euro" style="font-size: 4vw; color: #dd4a68;" />
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card>
            <a-row :gutter="10" type="flex" justify="center" align="middle">
              <a-col>
                <a-statistic
                  title="昨日收益"
                  :value="11.28"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: '#cf1322' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon type="arrow-up" />
                  </template>
                </a-statistic>
              </a-col>
              <a-col>
                <a-icon type="dollar" style="font-size: 4vw; color: #d9b104;" />
              </a-col>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card>
            <a-row :gutter="10" type="flex" justify="center" align="middle">
              <a-col>
                <a-statistic
                  title="近30天收益"
                  :value="11.28"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: '#cf1322' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon type="arrow-up" />
                  </template>
                </a-statistic>
              </a-col>
              <a-col>
                <a-icon type="transaction" style="font-size: 4vw; color: #30a6ff;" />
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-row :gutter="20">
      <a-col span="12">
        <a-card style="margin-bottom: 20px;" :head-style="{fontSize: '20px'}">

          <div slot="title" style="font-size: 16px;">访客量</div>
          <my-echarts type="line" :ec-data="saleData" v-if="saleData.data.length" />
        </a-card>
      </a-col>
      <a-col span="12">
        <a-card :head-style="{fontSize: '20px'}">
          <div slot="title" style="font-size: 16px;">销量统计</div>
          <my-echarts type="pie" :ec-data="{...orderData, toolTitle: '销量统计'}" v-if="orderData.data.length" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import MyEcharts from "../components/echarts/my-echarts"
  import { statisticsProfitApi, statisticsSalesVolume, statisticsVisitorApi } from "../api/HomeApi"
  import { statisticsProductApi } from "@/api/OrderManageApi"

  export default {
    name: 'Home',
    components: { MyEcharts },
    data () {
      return {
        saleData: { mmdd: [], data: [] },
        orderData: { mmdd: [], data: [] }
      }
    },
    mounted () {
      this.getPrice()
      this.getSales()
      this.getOrder()
    },
    methods: {
      getPrice () {
        statisticsProfitApi({
          count: 100,
          statisticsType: 'DAY'
        }).then(res => {
          if (res.data.code == '200') {
            console.log(res.data.data)
          }
        })
      },
      getSales () {
        statisticsVisitorApi({
          count: 100,
          statisticsType: 'DAY'
        }).then(res => {
          const { data, code, msg } = res.data
          if (code == '200') {
            this.saleData.mmdd = data.map(v => v.statisticsDate)
            this.saleData.data = data.map(v => ({ name: v.statisticsDate, value: v.visitorCount }))
          }
        })
      },
      getOrder () {
        statisticsProductApi({
          startTime: '2021-04-01',
          endTime: '2021-06-17'
        }).then(res => {
          const { data, code, msg } = res.data
          if (code == '200') {
            this.orderData.mmdd = data.map(v => v.productName)
            this.orderData.data = data.map(v => ({ name: v.productName, value: v.salesVolume }))
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .home {
    .title-txt {
      margin-bottom: 20px;
      font-size: 20px;
    }
  }
</style>
