<!--xiolng-->
<!--CreateBanner-->
<!--2021/7/19-->
<!--11:04-->
<template>
  <div class="CreateBanner">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel')"
      @ok="saveForm"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="图片">
          <upload-img-c
            @imgName="value => {form.setFieldsValue({bannerImage: value})}"
            :default-data="form.getFieldValue('bannerImage') || ''"
            v-decorator="[
              `bannerImage`,
              {
                rules: [{required: true, message: '请上传图片'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="名称">
          <a-input
            placeholder="请输入名称"
            v-decorator="[
              `bannerName`,
              {
                rules: [{required: true, message: '请输入名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="链接">
          <a-input
            placeholder="请输入链接"
            v-decorator="[
              `bannerUrl`,
              {
                rules: [{required: true, message: '请输入链接'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number
            placeholder="请输入排序"
            v-decorator="[
              `sort`,
              {
                rules: [{required: true, message: '请输入排序'}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import UploadImgC from '@/components/UploadImgC/UploadImgC'
  import { getShopBannerApi, saveShopBannerApi, updateShopBannerApi } from "@/api/ShopManageApi"

  export default {
    name: 'CreateBanner',
    components: {
      UploadImgC
    },
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
        getShopBannerApi({ bannerId: this.editId }).then(res => {
          const defualtData = ['bannerImage', 'bannerName', 'bannerUrl', 'sort']
          if (res.data.code === '200') {
            const { data } = res.data
            Object.keys(defualtData).map(v => {
              this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
            })
          }
        })
      },
      saveForm () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const func = this.editId ? updateShopBannerApi : saveShopBannerApi
            func({
              ...val,
              shopBannerId: this.editId || ''
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
  .CreateBanner {

  }
</style>
