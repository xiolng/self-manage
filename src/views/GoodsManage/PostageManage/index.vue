<!--xiolng-->
<!--index-->
<!--2021/7/5-->
<!--14:44-->
<template>
  <div class="index">
    <a-form
      :form="form"
      :label-col="{span: 4}"
      :wrapper-col="{span: 16}"
    >
      <a-form-item
        label="满额免邮价格"
      >
        <a-input
          placeholder="请输入满额免邮价格"
          v-decorator="[
            `fullLimit`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入满额免邮价格'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="邮费"
      >
        <a-input
          placeholder="请输入邮费"
          v-decorator="[
            `postage`,
            {
              initialValue: '',
              rules: [{required: true, message: '请输入邮费'}]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="邮费模式"
      >
        <a-radio-group
          v-decorator="[
              `postageType`,
              {
                rules: [
                {required: true, message: '请选择邮费模式'}
              ]
              }
            ]"
        >
          <a-radio :value="0">免邮</a-radio>
          <a-radio :value="1">有邮费</a-radio>
          <a-radio :value="2">满x元免邮</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <div class="btn-box">
      <a-button type="primary" @click="saveForm">保存邮费信息</a-button>
    </div>
  </div>
</template>

<script>
  import { getOrderPostageApi, saveOrderPostageApi, updateOrderPostageApi } from "@/api/GoodsManageApi"

  export default {
    name: 'index',
    data () {
      return {
        detailData: {
          fullLimit: '',
          postage: '',
          postageType: 0,
          orderPostageId: null,
        },
        form: this.$form.createForm(this, { name: 'postForm' })
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      getDetail () {
        getOrderPostageApi({}).then(res => {
          if (res.data.code === '200') {
            const { data } = res.data
            Object.keys(this.detailData).map(v => {
              this.form.setFieldsValue({ [v]: data[v] })
            })
            this.detailData = data
          }
        })
      },
      saveForm () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const func = this.detailData.orderPostageId ? updateOrderPostageApi : saveOrderPostageApi
            func({
              ...val,
              orderPostageId: this.detailData.orderPostageId || undefined
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .index {
    .item-box {
      display: flex;
      align-items: flex-start;

      .item-label {
        width: 100px;
        flex-shrink: 0;
        margin-bottom: 10px;
      }

      .item-content {
        margin-bottom: 10px;

        .imgs {
          width: 300px;
          height: 200px;
        }
      }
    }

    .btn-box {
      padding: 40px 20px;
      background: #fafafa;
      display: flex;
      width: 50%;
      justify-content: space-around;
    }
  }
</style>
