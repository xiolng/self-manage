<!--xiolng-->
<!--CreateMulti-->
<!--2021/7/6-->
<!--10:36-->
<template>
  <div class="CreateMulti">
    <a-modal
      :visible="visible"
      title="维护多规格"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
      width="80%"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <!--table-list-->
        <a-table
          :columns="column"
          :dataSource="dataSource"
          :pagination="false"
          rowKey="productId"
        >
          <div slot="image" slot-scope="text">
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
          </div>
          <div slot="productName" slot-scope="text">
            <a-form-item label="名称">
              <a-input
                placeholder="请输入名称"
                v-decorator="[
              `imageOrder`,
              {
                rules: [{required: true, message: '请输入名称'}]
              }
            ]"
              />
            </a-form-item>
          </div>
          <div slot="price" slot-scope="text">
            <a-form-item label="价格">
              <a-input
                placeholder="请输入价格"
                v-decorator="[
              `imageOrder`,
              {
                rules: [{required: true, message: '请输入价格'}]
              }
            ]"
              />
            </a-form-item>
          </div>
          <div slot="sales" slot-scope="text">
            <a-form-item label="销量">
              <a-input
                placeholder="请输入销量"
                v-decorator="[
              `imageOrder`,
              {
                rules: [{required: true, message: '请输入销量'}]
              }
            ]"
              />
            </a-form-item>
          </div>
          <div slot="operation" slot-scope="text, record">
            <a-row type="flex">
              <a-col>
                <a-button-group class="mr-10">
                  <a-button size="small" type="primary" :disabled="!!record.isPut" @click="upProduct(record)">
                    <a-icon type="vertical-align-top" />
                    上架
                  </a-button>
                  <a-button size="small" type="danger" :disabled="!record.isPut" @click="downProduct(record)">下架
                    <a-icon type="vertical-align-bottom" />
                  </a-button>
                </a-button-group>
              </a-col>
            </a-row>
          </div>
        </a-table>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import UploadImgC from '@/components/UploadImgC/UploadImgC'
  import { pageSpecParamApi } from "@/api/GoodsManageApi"

  const column = [
    {
      title: '商品图片',
      dataIndex: 'productCover',
      scopedSlots: { customRender: 'image' }
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      scopedSlots: { customRender: 'productName' }
    },
    {
      title: '单价',
      dataIndex: 'productPrice',
      scopedSlots: { customRender: 'price' }
    },
    {
      title: '销量',
      dataIndex: 'salesVolume',
      scopedSlots: { customRender: 'sales' }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '30%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: 'CreateMulti',
    components: {
      UploadImgC
    },
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        column,
        form: this.$form.createForm(this, { name: 'form' }),
        specGroupList: [],
        dataSource: []
      }
    },
    mounted () {
      this.editId && this.getSpecGroups()
    },
    methods: {
      getSpecGroups () {
        pageSpecParamApi({ specGroupId: this.editId }).then(res => {
          if (res.data.code === '200') {
            const { data } = res.data
            this.specGroupList = data
          }
        })
      },
    }
  }
</script>

<style scoped>
  .CreateMulti {

  }
</style>
