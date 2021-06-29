<!--xiolng-->
<!--EditGoods-->
<!--2021/6/18-->
<!--12:49-->
<template>
  <div class="edit-goods">
    <a-form
      :form="form"
      :label-col="{span: 4}"
      :wrapper-col="{span: 16}"
    >
      <a-form-item
        label="商品名称"
      >
        <a-input
          placeholder="请输入商品名称"
          v-decorator="[
            `productName`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺名称'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="商品封面"
      >
        <upload-img-c
          @imgName="value => {details.productCover = value; form.setFieldsValue({productCover: value})}"
          :default-data="details.productCover"
          v-decorator="[
            `productCover`,
            {
              initialValue: details.productCover || ''
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="商品分类"
      >
        <a-select
          placeholder="请选择商品分类"
          v-decorator="[
            `productCategoryId`,
            {
              initialValue: '',
              rules: [{required: true, message: '请选择店铺分类'}]
            }
          ]"
        >
          <a-select-option
            v-for="item in categoryList"
            :key="item.productCategoryId"
          >{{item.categoryName}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="是否上架"
      >
        <a-switch
          placeholder="请输入是否上架"
          v-decorator="[
            `isPut`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺名称'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="商品价格"
      >
        <a-input-number
          placeholder="请输入商品价格"
          :min="0.01"
          v-decorator="[
            `productPrice`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺价格'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="商品原价"
      >
        <a-input-number
          placeholder="请输入商品原价"
          :min="0.01"
          v-decorator="[
            `originalPrice`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺原价'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="商品库存"
      >
        <a-input-number
          placeholder="请输入商品库存"
          :min="1"
          v-decorator="[
            `stock`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺库存'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="商品简介"
      >
        <a-textarea
          placeholder="请输入商品简介"
          v-decorator="[
            `productIntro`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入店铺简介'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label=" " :colon="false">
        <a-button @click="saveGoods" type="primary" block>提交</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { getProductByIdApi, listProductCategoryApi, saveProductApi, updateProductApi } from "@/api/GoodsManageApi"
  import UploadImgC from "@/components/UploadImgC/UploadImgC"

  export default {
    name: "EditGoods",
    components: { UploadImgC },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'goodsManageForm' }),
        details: {
          categoryName: '',
          isPut: false,
          productCategoryId: '',
          productCover: '',
          productIntro: '',
          productName: '',
          productPrice: 1,
          originalPrice: 1,
          stock: 1
        },
        categoryList: []
      }
    },
    mounted () {
      this.getCategory()
      const productId = this.$route.query.productId
      productId && this.getDetail(productId)
    },
    methods: {
      getDetail (productId) {
        getProductByIdApi({
          productId
        }).then(res => {
          if (res.data.code == '200') {
            Object.keys(this.details).map(v => {
              this.form.setFieldsValue({ [v]: res.data.data[v] })
              this.details[v] = res.data.data[v]
            })
          }
        })
      },
      getCategory () {
        listProductCategoryApi().then(res => {
          if (res.data.code == '200') {
            this.categoryList = res.data.data
          }
        })
      },
      saveGoods () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const productId = this.$route.query.productId
            const func = productId ? updateProductApi : saveProductApi
            func({
              productType: 0,
              [productId ? 'productId' : '']: productId,
              ...val,
              isPut: +val.isPut
            }).then(res => {
              if (res.data.code === '200') {
                this.$message.success('保存成功')
                this.$router.back(1)
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
