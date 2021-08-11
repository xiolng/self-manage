<!--xiolng-->
<!--CreateAddCoupon-->
<!--2021/6/28-->
<!--14:49-->
<template>
  <div class="CreateAddCoupon">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel')"
      @ok="saveAdd"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="追加数量">
          <a-input-number
            placeholder="请输入数量"
            v-decorator="[
              `addCount`,
              {
                rules: [{required: true, message: '请输入数量'}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  import { addCouponApi } from "@/api/SalesManageApi"

  export default {
    name: 'CreateAddCoupon',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
      }
    },
    mounted () {
    },
    methods: {
      saveAdd () {
        this.form.validateFields((err, val) => {
          if (!err) {
            addCouponApi({
              addCount: val.addCount,
              couponId: this.editId
            }).then(res => {
              this.$emit('create')
              if (res.data.code == '200') {
                this.$message.success('追加成功')
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped>
  .CreateAddCoupon {

  }
</style>
