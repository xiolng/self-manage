<!--xiolng-->
<!--CreateGoodsSort-->
<!--2021/6/18-->
<!--15:18-->
<template>
  <div class="CreateGoodsSort">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item
          label="分类名称"
          :label-col="{span: 4}"
          :wrapper-col="{span: 14}"
        >
          <a-input
            v-decorator="[
              'categoryName',
              {
                rules: [{ required: true, message: '请输入分类名称' }]
              },
            ]"
            placeholder="请输入分类名称"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  import { getProductCategoryByIdApi } from "@/api/GoodsManageApi"

  export default {
    name: 'CreateGoodsSort',
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
      this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        getProductCategoryByIdApi({ productCategoryId: this.editId }).then(res => {
          const defualtData = ['categoryName']
          if (res.data.code === '200') {
            const { data } = res.data
            Object.keys(defualtData).map(v => {
              this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
            })
          }
        })
      },
    },
  }
</script>

<style scoped>
  .CreateGoodsSort {

  }
</style>
