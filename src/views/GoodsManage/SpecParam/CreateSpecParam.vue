<!--xiolng-->
<!--CreateSpecParam-->
<!--2021/7/5-->
<!--15:17-->
<template>
  <div class="CreateSpecParam">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel')"
      @ok="saveForm"
    >
      <a-form :form="form" :label-col="{span: 6}" :wrapper-col="{span: 16}">
        <a-form-item label="规格属性名称">
          <a-input
            placeholder="请输入规格属性名称"
            v-decorator="[
              `paramName`,
              {
                rules: [{required: true, message: '请输入规格属性名称'}]
              }
            ]"
          />
        </a-form-item>
        <!--<a-form-item label="关联商品分类">-->
        <!--  <a-select-->
        <!--    placeholder="请选择商品分类"-->
        <!--    mode="multiple"-->
        <!--    v-decorator="[-->
        <!--      `productCategoryId`,-->
        <!--      {-->
        <!--        initialValue: [],-->
        <!--        rules: [{required: true, message: '请选择商品分类'}]-->
        <!--      }-->
        <!--    ]"-->
        <!--  >-->
        <!--    <a-select-option-->
        <!--      v-for="item in categoryList"-->
        <!--      :key="item.productCategoryId"-->
        <!--      :value="item.productCategoryId"-->
        <!--    >-->
        <!--      {{item.categoryName}}-->
        <!--    </a-select-option>-->
        <!--  </a-select>-->
        <!--</a-form-item>-->
        <!--<a-form-item label="关联规格组">-->
        <!--  <a-select-->
        <!--    placeholder="请选择规格组"-->
        <!--    v-decorator="[-->
        <!--      `specGroupId`,-->
        <!--      {-->
        <!--        initialValue: [],-->
        <!--        rules: [{required: true, message: '请选择规格组'}]-->
        <!--      }-->
        <!--    ]"-->
        <!--  >-->
        <!--    <a-select-option-->
        <!--      v-for="item in specGroupList"-->
        <!--      :key="item.specGroupId"-->
        <!--      :value="item.specGroupId"-->
        <!--    >-->
        <!--      {{item.specGroupName}}-->
        <!--    </a-select-option>-->
        <!--  </a-select>-->
        <!--</a-form-item>-->
      </a-form>
    </a-modal>
  </div>
</template>

<script>

  import {
    getSpecParamApi,
    listProductCategoryApi, listSpecGroupApi,
    saveSpecParamApi,
    updateSpecParamApi
  } from "@/api/GoodsManageApi"

  export default {
    name: 'CreateSpecParam',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        categoryList: [],
        specGroupList: []
      }
    },
    mounted () {
      this.getSpecGroups()
    },
    methods: {
      getSpecGroups () {
        listSpecGroupApi().then(res => {
          this.getCategorys()
          if (res.data.code == '200') {
            this.specGroupList = res.data.data
          }
        })
      },
      getCategorys () {
        listProductCategoryApi({}).then(res => {
          this.editId && this.getDetail()
          if (res.data.code = '200') {
            this.categoryList = res.data.data || []
          }
        })
      },
      getDetail () {
        getSpecParamApi({ specGroupId: this.editId }).then(res => {
          const defualtData = ['specGroupName', 'productCategoryId']
          if (res.data.code === '200') {
            const { data } = res.data
            defualtData.map(v => {
              this.form.setFieldsValue({ [v]: data[v] })
            })
          }
        })
      },
      saveForm () {
        this.form.validateFields((err, val) => {
          if (!err) {
            console.log('va', val)
            const func = this.editId ? updateSpecParamApi : saveSpecParamApi
            func({
              specParamId: this.editId || undefined,
              ...val,
              specGroupId: this.$route.query.id
            }).then(res => {
              this.$emit('create')
              if (res.data.code == '200') {
                this.$message.success('保存成功')
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped>
  .CreateSpecParam {

  }
</style>
