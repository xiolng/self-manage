<!--xiolng-->
<!--CreateMenu-->
<!--2021/7/15-->
<!--9:25-->
<template>
  <div class="CreateMenu">
    <a-modal
      :visible="visible"
      title="新增、编辑"
      @cancel="$emit('cancel')"
      @ok="saveForm"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="图片">
          <upload-img-c
            @imgName="value => {form.setFieldsValue({districtIcon: value})}"
            :default-data="form.getFieldValue('districtIcon') || ''"
            v-decorator="[
              `districtIcon`,
              {
                rules: [{required: true, message: '请上传图片'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="菜单名称">
          <a-input
            placeholder="请输入菜单名称"
            v-decorator="[
              `districtName`,
              {
                rules: [{required: true, message: '请输入菜单名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="菜单地址">
          <a-input
            placeholder="请输入菜单地址"
            v-decorator="[
              `districtUrl`,
              {
                rules: [{required: true, message: '请输入菜单地址'}]
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
  import { getKingDistrictApi, saveKingDistrictApi, updateKingDistrictApi } from "@/api/ShopManageApi"

  export default {
    name: 'CreateMenu',
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
        getKingDistrictApi({ kingDistrictId: this.editId }).then(res => {
          const defualtData = ['districtIcon', 'districtName', 'districtUrl']
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
            const func = this.editId ? updateKingDistrictApi : saveKingDistrictApi
            func({
              ...val,
              kingDistrictId: this.editId || ''
            }).then(res => {
              this.$emit('create')
              const { code, msg } = res.data
              if (code == '200') {
                this.$message.success(`保存成功`)
              } else {
                this.$message.error(msg)
              }
            })
          }
        })
      }
    },
  }
</script>

<style scoped>
  .CreateMenu {

  }
</style>
