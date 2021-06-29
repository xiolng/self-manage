<!--xiolng-->
<!--ShopManage-->
<!--2021/6/18-->
<!--10:03-->
<template>
  <div class="ShopManage main-content">
    <a-form
      :form="form"
      :label-col="{span: 4}"
      :wrapper-col="{span: 16}"
    >
      <a-form-item
        label="店铺名称"
      >
        <a-input
          placeholder="请输入店铺名称"
          v-decorator="[
            `shopName`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺名称'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="店铺Logo"
      >
        <upload-img-c
          @imgName="value => {detailData.shopLogo = value; form.setFieldsValue({shopLogo: value})}"
          :default-data="detailData.shopLogo"
          v-decorator="[
            `shopLogo`,
            {
              initialValue: detailData.shopLogo || ''
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="手机号"
      >
        <a-input
          placeholder="请输入手机号"
          v-decorator="[
            `shopTel`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入手机号'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="营业时间"
      >
        <a-input
          placeholder="请输入营业时间"
          v-decorator="[
            `businessHour`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入营业时间'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="营业范围"
      >
        <a-input
          placeholder="请输入营业范围"
          v-decorator="[
            `businessRange`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入营业范围'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="店铺地址"
      >
        <a-input
          placeholder="请输入店铺地址"
          v-decorator="[
            `shopAddress`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺地址'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="店铺描述"
      >
        <a-textarea
          placeholder="请输入店铺描述"
          v-decorator="[
            `shopDetail`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺描述'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button @click="saveShop" type="primary" block>提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { getShopApi, saveShopApi, updateShopApi } from "../../api/ShopManageApi"
  import UploadImgC from "../../components/UploadImgC/UploadImgC"

  export default {
    name: 'ShopManage',
    components: { UploadImgC },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'shopManageForm' }),
        detailData: {
          businessHour: "",
          businessRange: "",
          shareImageUrl: "",
          shopAddress: "",
          shopDetail: "",
          shopGategory: null,
          shopId: "",
          shopLogo: "",
          shopName: "",
          shopTel: "",
        },
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      getDetail () {
        getShopApi({}).then(res => {
          if (res.data.code === '200') {
            const { data } = res.data
            this.detailData = data
            Object.keys(this.detailData).map(v => {
              this.form.setFieldsValue({ [v]: this.detailData[v] })
            })
          }
        })
      },
      saveShop () {
        const func = this.detailData.shopId ? updateShopApi : saveShopApi
        this.form.validateFields((err, val) => {
          if (!err) {
            func({ ...this.detailData, ...val }).then(res => {
              const { code, msg } = res.data
              if (code == '200') {
                this.$message.success('修改成功')
              } else {
                this.$message.error(msg)
              }
            })
          }
        })

      }
    }
  }
</script>

<style scoped lang="less">
  .ShopManage {
  }
</style>
