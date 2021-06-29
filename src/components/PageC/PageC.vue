<template>
  <div class="page-box">
    <!--分页-->
    <a-pagination
      :total="total"
      :current="pages.current"
      show-size-changer
      :page-size="pages.pageSize"
      @change="setCurrent"
      @showSizeChange="setLimit"
    />
  </div>
</template>

<script>
  export default {
    props: {
      total: Number,
      callback: Function
    },
    data () {
      return {
        pages: {
          current: 1,
          pageSize: 10
        },
        callData: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      // 设置分页
      setCurrent (data) {
        this.pages.current = data
        this.callData.pageNum = data
        this.$emit('callback', this.callData)
      },
      // 每页数量
      setLimit (data, size) {
        this.pages.pageSize = size
        this.callData.pageSize = size
        this.$emit('callback', this.callData)
      }
    }
  }
</script>

<style scoped lang="less">

</style>
