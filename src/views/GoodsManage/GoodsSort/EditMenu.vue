<template>
  <!--编辑菜单-->
  <div class="add-user">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="分类名" prop="categoryName">
        <Input v-model="formValidate.categoryName" placeholder="请输入分类名" />
      </FormItem>
      <FormItem label="排序" prop="sort">
        <InputNumber v-model="formValidate.sort" />
      </FormItem>
      <FormItem label="图片" prop="categoryIcon">
        <upload-img-c
          @imgName="value => {$set(formValidate, 'categoryIcon', value)}"
          :default-data="formValidate.categoryIcon"
          v-model="formValidate.categoryIcon"
        />
      </FormItem>
    </Form>
    <Row type="flex" justify="end" :gutter="20">
      <Col>
        <Button type="text" @click="modalCancel">取消</Button>
      </Col>
      <Col>
        <Button type="primary" @click="modalOk">确定</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { getProductCategoryByIdApi, updateProductCategoryApi } from "@/api/GoodsManageApi"
  import UploadImgC from "@/components/UploadImgC/UploadImgC"

  export default {
    components: { UploadImgC },
    props: {
      callback: Function,
      menuData: Object
    },
    data () {
      return {
        formValidate: {
          categoryName: '',
          categoryIcon: '',
          parentId: '',
          sort: 1
        },
        ruleValidate: {
          categoryName: [
            { required: true, message: '请输入菜单名', trigger: 'blur' }
          ],
          categoryIcon: [
            { required: true, type: 'string', message: '请选择分类图片', trigger: 'change' }
          ],
          sort: [
            { required: true, type: 'number', message: '请输入排序', trigger: 'blur' }
          ],
        }
      }
    },
    beforeMount () {
      this.getMenuDetils()
    },
    methods: {
      // 获取详情
      getMenuDetils () {
        console.log(4444, this.menuData)
        getProductCategoryByIdApi({
          productCategoryId: this.menuData.productCategoryId
        }).then(res => {
          this.formValidate = res.data.data
        })
      },
      // 保存
      modalOk () {
        this.$refs.formValidate.validate((valid) => {
          if (valid) {
            updateProductCategoryApi({
              ...this.formValidate,
              productCategoryId: this.formValidate.productCategoryId,
              parentId: this.formValidate.parentId,
              categoryIcon: this.formValidate.categoryIcon,
              categoryName: this.formValidate.categoryName
            }).then(res => {
              if (res.data.code === '200') {
                this.$message.success('编辑成功!')
                this.$store.dispatch('commitMenus')
                this.$refs.formValidate.resetFields()
                this.callback()
              }
            })
          }
        })
      },
      // 取消
      modalCancel () {
        this.$refs.formValidate.resetFields()
        this.callback()
      }
    }
  }
</script>

<style scoped lang="less">
  .znzheng {
    width: 100%;
  }

</style>
