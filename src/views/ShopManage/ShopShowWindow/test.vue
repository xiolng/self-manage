<!--xiolng-->
<!--test-->
<!--2021/7/15-->
<!--10:22-->
<template>
  <div class="test">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        </a-form-item>
        <a-form-item label="图片">
          <upload-img-c
            @imgName="value => {form.setFieldsValue({imageUrl: value})}"
            :default-data="form.getFieldValue('imageUrl') || ''"
            v-decorator="[
              `imageUrl`,
              {
                rules: [{required: true, message: '请上传图片'}]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="类型">
          <a-radio-group
            v-decorator="[
              `type`,
              {
                initialValue: '0',
                rules: [{required: true, message: '请选择类型'}]
              }
            ]"
            :options="[
              {label: '套餐', value: '0'},
              {label: '商品', value: '1'},
            ]"
          />
        </a-form-item>
        <a-form-item label="关联商品">
          <a-select
            placeholder="请选择商品"
            v-decorator="[
              `relationId`,
              {
                rules: [{required: true, message: '请选择商品'}]
              }
            ]"
            @focus="setSelect"
            :open="false"
          >
            <a-select-option
              v-for="item in shopList"
              :key="item.id"
              :value="item.id"
            >
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number
            placeholder="请输入排序"
            v-decorator="[
              `imageOrder`,
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
      check-type="radio"
    />
  </div>
</template>

<script>
  import UploadImgC from '@/components/UploadImgC/UploadImgC'
  import { BannerGetByIdApi } from '@/api/BannerApi'
  import { ComboGetlistIdNameApi } from '@/api/ComboManageApi'
  import { ShopGetlistIdNameApi } from '@/api/ShopManageApi'
  import SelectTypeDrawer from '@/components/SelectTypeDrawer'

  export default {
    name: 'test',
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
        BannerGetByIdApi({ id: this.editId }).then(res => {
          const defualtData = ['imageUrl', 'type', 'relationId', 'imageOrder']
          if (res.data.code === '200') {
            const { data } = res.data
            Object.keys(defualtData).map(v => {
              this.form.setFieldsValue({ [defualtData[v]]: data[defualtData[v]] })
            })
            this.shopList = [{ id: data.relationId, name: data.relationName }]
          }
        })
      },
      // 获取号池
      setSelect () {
        const type = this.form.getFieldValue('type')
        this.showDrawer = true
        this.selectList = [this.form.getFieldValue('relationId') || '']
        this.func = type === '0' ? ComboGetlistIdNameApi : ShopGetlistIdNameApi
      },
      setPool ({ item }) {
        this.shopList = item
        this.form.setFieldsValue({ relationId: item[0].id })
        this.showDrawer = false
        this.$ / forceUpdate()
      }
    },
  }
</script>

<style scoped>
  .test {

  }
</style>
