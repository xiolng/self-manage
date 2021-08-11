<!--xiolng-->
<!--Default-->
<!--2021/6/29-->
<!--9:17-->
<template>
  <div class="marketing-home">
    <a-row :gutter="20" type="flex">
      <a-col
        style="width: 260px; margin-bottom: 20px;"
        v-for="item in list"
        :key="item.marketingId"
      >
        <a-card @click="$router.push(`${item.marketingUrl}`)">
          <div class="item-box">
            <a-avatar :src="`/files/${item.icon}`" shape="square" :size="200" />
            <div class="item-name">{{item.marketingName}}</div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  import { marketingListApi } from "@/api/MarketingManageApi"

  export default {
    name: "Default",
    data () {
      return {
        list: []
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      getList () {
        marketingListApi().then(res => {
          if (res.data.code == '200') {
            this.list = res.data.data.sort((a, b) => a > b)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .marketing-home {
    .item-box {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      .item-name {
        font-size: 20px;
      }
    }
  }
</style>
