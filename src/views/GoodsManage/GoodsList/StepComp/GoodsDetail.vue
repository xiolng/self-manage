<!--xiolng-->
<!--GoodsDetail-->
<!--2021/7/7-->
<!--10:40-->
<template>
  <div class="GoodsDetail">
    <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
      <a-form-item
        label="商品描述"
      >
        <editor-comp
          :detail="productDetail"
          upload-img-url="/api/file/upload"
          @input="val => form.setFieldsValue({productDetail: val})"
          v-decorator="[
            `productDetail`,
            {
              initialValue: productDetail,
              rules: [{required: true, message: '请输入店铺描述'}]
            }
          ]"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

  import EditorComp from "@/components/EditorComp"

  export default {
    name: 'GoodsDetail',
    components: { EditorComp },
    props: {
      productDetail: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
      }
    },
    mounted () {
      setTimeout(() => {
        this.productDetail && this.form.getFieldDecorator(`productDetail`, { initialValue: this.productDetail })
      }, 100)
    },
    methods: {},
  }
</script>

<style scoped>
  .GoodsDetail {

  }
</style>
