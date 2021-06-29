<!--xiolng-->
<!--LogisticsNo-->
<!--2021/6/21-->
<!--9:09-->
<template>
  <div class="LogisticsNo">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel')"
      @ok="pushGoods"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="物流公司">
          <a-input
            v-decorator="[
              'logisticsName',
              {
                rules: [{ required: true, message: '请输入物流公司' }]
              },
            ]"
            placeholder="请输入物流公司名称"
          />
        </a-form-item>
        <a-form-item label="物流单号">
          <a-input
            v-decorator="[
              'logisticsNo',
              {
                rules: [{ required: true, message: '请输入物流单号' }]
              },
            ]"
            placeholder="请输入物流单号"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  import { getOrderLogisticsApi, sendProductApi, updateOrderLogisticsApi } from "@/api/OrderManageApi"

  export default {
    name: 'LogisticsNo',
    components: {},
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        logisticData: {}
      }
    },
    mounted () {
      this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        getOrderLogisticsApi({ orderId: this.editId }).then(res => {
          const defualtData = ['logisticsName', 'logisticsNo', 'orderId', 'orderLogisticsId']
          if (res.data.code === '200') {
            const { data } = res.data
            this.logisticData = data
            Object.keys(defualtData).map(v => {
              this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
            })
          }
        })
      },
      pushGoods () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const func = this.logisticData.orderLogisticsId ? updateOrderLogisticsApi : sendProductApi
            func({
              ...val,
              orderId: this.editId,
              orderLogisticsId: this.logisticData.orderLogisticsId
            }).then(res => {
              const { code, msg } = res.data
              if (code == '200') {
                this.$message.success('发货成功')
                this.$emit('create')
              } else {
                this.$message.error(msg)
                this.$emit('cancel')
              }
            })
          }
        })
      },
    },
  }
</script>

<style scoped>
  .LogisticsNo {

  }
</style>
