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
        label="是否多规格"
      >
        <a-switch
          placeholder="请输入是否多规格"
          :checked="form.getFieldValue('isMult')"
          v-decorator="[
            `isMult`,
            {
              initialValue: !!productDetails.isMult
            }
          ]"
          @change="checked => $emit('setMulti', checked)"
        />
      </a-form-item>
      <div v-if="form.getFieldValue('isMult')">
        <a-form-item
          label="规格组"
        >
          <a-select
            placeholder="请选择规格组"
            @change="val => $emit('setSpecId', val)"
            v-decorator="[
            `specGroupId`,
            {
              initialValue: productDetails.specGroupId,
              rules: [{required: true, message: '请选择规格组'}]
            }
          ]"
          >
            <a-select-option
              v-for="item in specGroupList"
              :key="item.specGroupId"
            >{{item.specGroupName}}
            </a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <a-form-item
        label="商品名称"
      >
        <a-input
          placeholder="请输入商品名称"
          v-decorator="[
            `productName`,
            {
              initialValue: productDetails.productName,
              rules: [{required: true, message: '请输入店铺名称'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="商品封面"
      >
        <upload-img-c
          @imgName="value => {form.setFieldsValue({productCover: value})}"
          :default-data="productDetails.productCover"
          v-decorator="[
            `productCover`,
            {
              rules: [{required: true, message: '请上传商品封面'}]
            }
          ]"
        />
      </a-form-item>
      <!--<a-form-item-->
      <!--  label="分享图片"-->
      <!--&gt;-->
      <!--  <upload-img-c-->
      <!--    @imgName="value => {form.setFieldsValue({shareImageUrl: value})}"-->
      <!--    :default-data="form.getFieldValue('shareImageUrl') || productDetails.shareImageUrl"-->
      <!--    v-decorator="[-->
      <!--      `shareImageUrl`,-->
      <!--      {-->
      <!--        initialValue: productDetails.shareImageUrl,-->
      <!--        rules: [{required: true, message: '请上传商品封面'}]-->
      <!--      }-->
      <!--    ]"-->
      <!--  />-->
      <!--</a-form-item>-->
      <a-form-item
        label="商品分类"
      >
        <a-cascader
          :options="categoryList"
          placeholder="请选择商品分类"
          @change="val => $emit('setCategoryId', val)"
          v-decorator="[
            `productCategoryId`,
            {
              initialValue: [productDetails.productCategoryId],
              rules: [{required: true, message: '请选择店铺分类'}]
            }
          ]"
        >
        </a-cascader>
      </a-form-item>
      <a-form-item
        label="是否上架"
      >
        <a-switch
          placeholder="请输入是否上架"
          :checked="form.getFieldValue('isPut')"
          v-decorator="[
            `isPut`,
            {
              initialValue: !!productDetails.isPut
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
              initialValue: productDetails.productPrice,
              rules: [{required: true, message: '请输入店铺价格'}]
            }
          ]"
        />
      </a-form-item>
      <!--<a-form-item-->
      <!--  label="商品原价"-->
      <!--&gt;-->
      <!--  <a-input-number-->
      <!--    placeholder="请输入商品原价"-->
      <!--    :min="0.01"-->
      <!--    v-decorator="[-->
      <!--      `originalPrice`,-->
      <!--      {-->
      <!--        initialValue: '',-->
      <!--        rules: [{required: true, message: '请输入店铺原价'}]-->
      <!--      }-->
      <!--    ]"-->
      <!--  />-->
      <!--</a-form-item>-->
      <div>
        <a-form-item v-if="!form.getFieldValue('isMult')"
          label="商品库存"
        >
          <a-input-number
            placeholder="请输入商品库存"
            :min="1"
            v-decorator="[
            `productStock`,
            {
              initialValue: productDetails.productStock,
              rules: [{required: true, message: '请输入店铺库存'}]
            }
          ]"
          />
        </a-form-item>
      </div>
      <a-form-item
        label="商品简介"
      >
        <a-textarea
          placeholder="请输入商品简介"
          :min="1"
          v-decorator="[
            `productIntro`,
            {
              initialValue: productDetails.productIntro,
              rules: [{required: true, message: '请输入店铺简介'}]
            }
          ]"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import {
    listProductCategoryApi,
    listSpecGroupApi,
    saveProductApi,
    updateProductApi
  } from "@/api/GoodsManageApi"
  import UploadImgC from "@/components/UploadImgC/UploadImgC"
  import { treeMenu } from "@/utils/menu"

  export default {
    name: "EditGoods",
    components: { UploadImgC },
    props: {
      productDetails: Object
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'goodsManageForm' }),
        categoryList: [],
        specGroupList: [],
        showMulti: false,
        showSpecifics: false
      }
    },
    mounted () {
      console.log('this.productDetails', this.productDetails)
      this.getSpecGroups()
      this.getCategory()
    },
    methods: {
      initData () {
        console.log(334433)
        this.productDetails && Object.keys(this.productDetails).map(v => {
          console.log(v, '----', this.productDetails[v])
          if (v == 'isMult') {
            // this.form.getFieldDecorator(v, { initialValue: !!this.productDetails[v] })
            this.form.setFieldsValue({ [v]: !!this.productDetails[v] })
            return false
          }
          if (v == 'isPut') {
            this.form.setFieldsValue({ [v]: !!this.productDetails[v] })
            // this.form.getFieldDecorator(v, { initialValue: !!this.productDetails[v] })
            return false
          }
          if (v == 'productCategoryId') {
            this.form.setFieldsValue({ [v]: [this.productDetails[v]] })
            // this.form.getFieldDecorator(v, { initialValue: !!this.productDetails[v] })
            return false
          }
          this.form.setFieldsValue({ [v]: this.productDetails[v] })
          // this.form.getFieldDecorator(v, { initialValue: this.productDetails[v] })
        })
      },
      getSpecGroups () {
        listSpecGroupApi().then(res => {
          if (res.data.code == '200') {
            this.specGroupList = res.data.data
            setTimeout(() => {
              this.initData()
            }, 100)
          }
        })
      },
      getCategory () {
        listProductCategoryApi().then(res => {
          if (res.data.code == '200') {
            this.categoryList = treeMenu(res.data.data, 'productCategoryId').map(v => {
              v.label = v.title
              v.value = v.productCategoryId
              v.children && v.children.map(c => {
                c.label = c.title
                c.value = c.productCategoryId
                return c
              })
              return v
            })
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
    },
    watch: {
      productDetails: function (oldDetail, newDetail) {
        if (newDetail) {
          console.log('newDetail', newDetail)
          Object.keys(newDetail).map(v => {
            this.form.setFieldsValue({ [v]: newDetail[v] })
          })
        } else {
          console.log('oldDetail', oldDetail)
          Object.keys(oldDetail).map(v => {
            this.form.setFieldsValue({ [v]: oldDetail[v] })
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
