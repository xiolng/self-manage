<!--xiolng-->
<!--CreateShowWindow-->
<!--2021/7/15-->
<!--9:25-->
<template>
  <div class="CreateShowWindow">
    <a-modal
      :visible="visible"
      title="新增、编辑"
      @cancel="$emit('cancel')"
      @ok="saveForm"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <a-form-item label="橱窗图片">
          <upload-img-c
            @imgName="value => {form.setFieldsValue({showIcon: value})}"
            :default-data="form.getFieldValue('showIcon') || ''"
            v-decorator="[
              `showIcon`,
              {
                rules: [{required: true, message: '请上传橱窗图片'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="橱窗名称">
          <a-input
            placeholder="请输入橱窗名称"
            v-decorator="[
              `showName`,
              {
                rules: [{required: true, message: '请输入橱窗名称'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="橱窗商品">
          <a-select
            mode="multiple"
            @focus="setSelect"
            :open="false"
            placeholder="请输入橱窗商品"
            v-decorator="[
              `productIds`,
              {
                rules: [{required: true, message: '请输入橱窗商品'}]
              }
            ]"
            :autoClearSearchValue="false"
          >
            <a-select-option
              v-for="item in poolList"
              :key="item.productId"
              :value="item.productId"
            >{{item.productName}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="是否显示">
          <a-switch
            placeholder="请输入是否显示"
            checked-children="是"
            un-checked-children="否"
            v-decorator="[
              `isShow`,
              {
                rules: [{required: true, message: '请输入是否显示'}]
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
    <select-type-drawer
      v-if="showDrawer"
      :func="func"
      :visible="showDrawer"
      :select-list="selectList"
      @cancel="showDrawer = false"
      @create="setPool"
      :default-select-data="poolList"
    />
  </div>
</template>

<script>
  import UploadImgC from '@/components/UploadImgC/UploadImgC'
  import {
    getShowWindowApi,
    saveShowWindowApi,
    updateShowWindowApi
  } from "@/api/ShopManageApi"
  import { pageProductApi } from "@/api/GoodsManageApi"
  import SelectTypeDrawer from "@/components/SelectTypeDrawer"

  export default {
    name: 'CreateShowWindow',
    components: {
      SelectTypeDrawer,
      UploadImgC
    },
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        shopList: [],
        poolList: [],
        showDrawer: false,
        func: null,
        selectList: []
      }
    },
    mounted () {
      this.editId && this.getDetail()
    },
    methods: {
      getDetail () {
        getShowWindowApi({ showWindowId: this.editId }).then(res => {
          const defualtData = ['isShow', 'productIds', 'showIcon', 'showName', 'sort']
          if (res.data.code === '200') {
            const { data } = res.data
            Object.keys(defualtData).map(v => {
              this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
              if (v == 'isShow') {
                this.form.setFieldsValue({ [defualtData[v]]: !!data[defualtData[v]] })
              }
            })
            this.shopList = [{ id: data.productId, name: data.productName }]
          }
        })
      },
      saveForm () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const func = this.editId ? updateShowWindowApi : saveShowWindowApi
            func({
              ...val,
              isShow: +val.isShow,
              showWindowId: this.editId || ''
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
      },
      // 获取号池
      setSelect () {
        this.showDrawer = true
        this.selectList = [this.form.getFieldValue('productIds') || '']
        this.func = pageProductApi
        return false
      },
      setPool ({ item }) {
        console.log(item)
        this.shopList = item.map(v => v.productId)
        this.poolList = item
        this.form.setFieldsValue({ productIds: item.map(v => v.productId) })
        this.showDrawer = false
        this.$forceUpdate()
      }
    },
  }
</script>

<style scoped>
  .CreateShowWindow {

  }
</style>
