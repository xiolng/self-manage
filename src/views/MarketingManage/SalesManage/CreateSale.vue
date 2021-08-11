<!--xiolng-->
<!--CreateSale-->
<!--2021/6/26-->
<!--8:21-->
<template>
  <div class="CreateSale">
    <a-form
      :form="form"
      :label-col="{span: 5}"
      :wrapper-col="{span: 16}"
    >
      <a-row :gutter="20" type="flex">
        <a-col span="12" class="mb-20">
          <a-card title="基础信息" class="mb-20" style="min-height: 100%">
            <a-form-item label="优惠券名称">
              <a-input
                placeholder="请输入优惠券名称"
                v-decorator="[
                  `couponName`,
                  {
                    initialValue: '',
                    rules: [{required: true, message: '请输入优惠券名称'}]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="投放数量">
              <a-input-number
                placeholder="请输入投放数量"
                v-decorator="[
                  `launchCount`,
                  {
                    initialValue: '',
                    rules: [{required: true, message: '请输入投放数量'}]
                  }
                ]"
              />
            </a-form-item>
            <a-form-item label="投放场景">
              <a-select
                placeholder="请选择投放场景"
                v-decorator="[
                  `sceneId`,
                  {
                    initialValue: '',
                    rules: [{required: true, message: '请选择投放场景'}]
                  }
                ]"
              >
                <a-select-option
                  v-for="item in sceneList"
                  :key="item.sceneId"
                >
                  {{item.sceneName}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-card>
        </a-col>
        <a-col span="12" class="mb-20">
          <a-card title="优惠规则" style="min-height: 100%">
            <a-form-item label="优惠券类型">
              <a-radio-group
                placeholder="请输入优惠券类型"
                v-decorator="[
                  `couponType`,
                  {
                    initialValue: 0,
                    rules: [{required: true, message: '请输入优惠券类型'}]
                  }
                ]"
              >
                <a-radio :value="0">满减券</a-radio>
                <a-radio :value="1">折扣券</a-radio>
              </a-radio-group>
            </a-form-item>
            <template v-if="!form.getFieldValue('couponType') || form.getFieldValue('couponType') === 0">
              <a-form-item label="满额限制">
                <a-input-number
                  placeholder="请输入满额限制"
                  addon-after="元"
                  v-decorator="[
                    `fullLimit`,
                    {
                      initialValue: '',
                      rules: [{required: true, message: '请输入满额限制'}]
                    }
                  ]"
                />
              </a-form-item>
              <a-form-item label="抵扣金额">
                <a-input-number
                  placeholder="请输入抵扣金额"
                  addon-after="元"
                  v-decorator="[
                    `deduAmount`,
                    {
                      initialValue: '',
                      rules: [{required: true, message: '请输入抵扣金额'}]
                    }
                  ]"
                />
              </a-form-item>
            </template>
            <template v-if="form.getFieldValue('couponType') === 1">
              <a-form-item label="满额限制">
                <a-input-number
                  placeholder="请输入满额限制"
                  addon-after="元"
                  v-decorator="[
                      `fullLimit`,
                      {
                        initialValue: '',
                        rules: [{required: true, message: '请输入满额限制'}]
                      }
                    ]"
                />
              </a-form-item>
              <a-form-item label="折扣比例">
                <a-input-number
                  placeholder="请输入折扣比例"
                  addon-after="%"
                  v-decorator="[
                      `deduProp`,
                      {
                        initialValue: '',
                        rules: [{required: true, message: '请输入折扣比例'}]
                      }
                    ]"
                />
              </a-form-item>
              <a-form-item label="折扣上限">
                <a-checkbox
                  v-decorator="[
                      `isUpper`,
                      {
                        initialValue: true,
                      }
                    ]"
                >不限
                </a-checkbox>
                <a-input-number
                  placeholder="请输入折扣比例"
                  addon-after="元"
                  :disabled="!form.getFieldValue('isUpper')"
                  v-decorator="[
                      `upperAmount`,
                      {
                        initialValue: '',
                        rules: [{required: true, message: '请输入折扣比例'}]
                      }
                    ]"
                />
              </a-form-item>
            </template>
          </a-card>
        </a-col>
        <a-col span="12" class="mb-20">
          <a-card title="试用商品" style="min-height: 100%">
            <a-form-item label="适用对象">
              <a-select
                placeholder="请输入适用对象"
                v-decorator="[
                  `usedRange`,
                  {
                    initialValue: 0,
                    rules: [{required: true, message: '请输入适用对象'}]
                  }
                ]"
              >
                <a-select-option :value="0">全部商品</a-select-option>
                <a-select-option :value="1">指定商品</a-select-option>
              </a-select>
            </a-form-item>
            <template v-if="form.getFieldValue('usedRange')">
              <a-form-item label="选择商品">
                <a-button
                  class="mr-10"
                  type="primary"
                  size="small"
                  v-decorator="[
                  `productIds`,
                  {
                    initialValue: [],
                    rules: [{required: true, type: 'array', message: '请输入适用对象'}]
                  }
                ]"
                  @click="visible = true"
                >选择商品
                </a-button>
                <!--<a-button size="small" class="mr-10">查看商品</a-button>-->
                <span v-if="form.getFieldValue('productIds')">已选：（{{form.getFieldValue('productIds').length}}）件商品</span>
              </a-form-item>
            </template>
            <a-form-item label="优惠券描述">
              <a-textarea
                placeholder="请输入优惠券描述"
                v-decorator="[
                      `couponDetail`,
                      {
                        initialValue: '',
                        rules: [{required: true, message: '请输入优惠券描述'}]
                      }
                    ]"
              />
            </a-form-item>
          </a-card>
        </a-col>
        <a-col span="12" class="mb-20">
          <a-card title="有效期" style="min-height: 100%">
            <a-form-item label="有效期模式">
              <a-radio-group
                placeholder="请输入优惠券类型"
                v-decorator="[
                  `effectiveType`,
                  {
                    initialValue: 0,
                    rules: [{required: true, message: '请输入优惠券类型'}]
                  }
                ]"
              >
                <a-radio :value="0">固定时间</a-radio>
                <a-radio :value="1">领取后X天有效</a-radio>
              </a-radio-group>
            </a-form-item>
            <template v-if="!form.getFieldValue('effectiveType') || form.getFieldValue('effectiveType') === 0">
              <a-form-item label="有效时间">
                <a-row :gutter="10">
                  <a-col span="12">
                    <a-date-picker
                      placeholder="请输入开始时间"
                      v-decorator="[
                  `startTime`,
                  {
                    initialValue: moment(),
                    rules: [{required: true, message: '请输入开始时间'}]
                  }
                ]"
                    />
                  </a-col>
                  <a-col span="12">
                    <a-date-picker
                      placeholder="请输入结束时间"
                      v-decorator="[
                  `endTime`,
                  {
                    initialValue: moment().add(7, 'days'),
                    rules: [{required: true, message: '请输入结束时间'}]
                  }
                ]"
                    />
                  </a-col>
                </a-row>
              </a-form-item>
            </template>
            <template v-else>
              <a-form-item label="有效天数" extra="（有效期至最后一天23:59）">
                <a-input-number
                  placeholder="请输入有效天数"
                  v-decorator="[
                  `dayAfter`,
                  {
                    initialValue: '',
                    rules: [{required: true, message: '请输入有效天数'}]
                  }
                ]"
                />
              </a-form-item>
            </template>
            <a-form-item label="投放时间">
              <a-row :gutter="10">
                <a-col span="12">
                  <a-date-picker
                    placeholder="请输入开始时间"
                    v-decorator="[
                  `launchStartTime`,
                  {
                    initialValue: moment(),
                    rules: [{required: true, message: '请输入开始时间'}]
                  }
                ]"
                  />
                </a-col>
                <a-col span="12">
                  <a-date-picker
                    placeholder="请输入结束时间"
                    v-decorator="[
                  `launchEndTime`,
                  {
                    initialValue: moment().add(7, 'days'),
                    rules: [{required: true, message: '请输入结束时间'}]
                  }
                ]"
                  />
                </a-col>
              </a-row>
            </a-form-item>
          </a-card>
        </a-col>
        <!--<a-col span="12">-->
        <!--  <a-card title="余量控制" style="min-height: 100%">-->
        <!--    <a-form-item label="发放数量限制">-->
        <!--      <a-input-->
        <!--        placeholder="请输入优惠券名称"-->
        <!--        addon-after="张"-->
        <!--        v-decorator="[-->
        <!--          `couponName`,-->
        <!--          {-->
        <!--            initialValue: '',-->
        <!--            rules: [{required: true, message: '请输入优惠券名称'}]-->
        <!--          }-->
        <!--        ]"-->
        <!--      />-->
        <!--    </a-form-item>-->
        <!--    <a-form-item label="预警邮箱">-->
        <!--      <a-input-->
        <!--        placeholder="请输入预警邮箱"-->
        <!--        v-decorator="[-->
        <!--          `couponName`,-->
        <!--          {-->
        <!--            initialValue: '',-->
        <!--            rules: [{required: true, message: '请输入预警邮箱'}]-->
        <!--          }-->
        <!--        ]"-->
        <!--      />-->
        <!--    </a-form-item>-->
        <!--  </a-card>-->
        <!--</a-col>-->
      </a-row>
    </a-form>
    <div class="btn-box">
      <a-button type="primary" @click="saveSale">保存优惠券</a-button>
    </div>
    <select-type-drawer
      v-if="visible"
      :visible="visible"
      :select-list="JSON.parse(JSON.stringify(form.getFieldValue('productIds')))"
      :func="pageProductApi"
      @create="changeProduct"
      @cancel="visible = false"
    />
  </div>
</template>

<script>

  import moment from 'moment'
  import { getCouponIdApi, saveCouponApi, sceneListApi, updateCouponApi } from "@/api/SalesManageApi"
  import { pageProductApi } from "@/api/GoodsManageApi"
  import SelectTypeDrawer from "@/components/SelectTypeDrawer"

  export default {
    name: 'CreateSale',
    components: { SelectTypeDrawer },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'saleForm' }),
        moment: moment,
        detailData: {
          couponDetail: "",
          couponId: "",
          couponName: "",
          couponStatus: 0,
          couponType: 0,
          createBy: "",
          createTime: "",
          dayAfter: 0,
          deduAmount: 0,
          deduProp: 0,
          effectiveType: 0,
          endTime: "",
          fullLimit: 0,
          isDel: 0,
          isUpper: 0,
          launchAllowance: 0,
          launchCount: 0,
          launchEndTime: "",
          launchStartTime: "",
          productIds: [],
          sceneId: "",
          startTime: "",
          updateBy: "",
          updateTime: "",
          upperAmount: 0,
          usedRange: 0
        },
        pageProductApi,
        auditStatus: {
          1: '审核中',
          2: '审核成功',
          3: '审核失败',
        },
        userType: {
          0: '商户',
          1: '客户经理',
        },
        visible: false,
        relevance: '',
        sceneList: []
      }
    },
    mounted () {
      this.getSecene()
    },
    methods: {
      getSecene () {
        sceneListApi().then(res => {
          if (res.data.code == '200') {
            this.sceneList = res.data.data
          }
          this.$route.query.id && this.getDetail()
        })
      },
      getDetail () {
        getCouponIdApi({
          couponId: this.$route.query.id
        }).then(res => {
          if (res.data.code === '200') {
            const { data } = res.data
            this.detailData = data
            Object.keys(this.detailData).map(v => {
              this.form.setFieldsValue({ [v]: data[v] })
            })
            setTimeout(() => {
              Object.keys(this.detailData).map(v => {
                this.form.setFieldsValue({ [v]: data[v] })
              })
            }, 500)
          }
        })
      },
      changeProduct (val) {
        console.log('va', val)
        this.visible = false
        if (!val || !val.item) return
        console.log(val)
        let data = []
        val.item.map(v => {
          data.push(v)
        })
        data = Array.from(new Set(data))
        this.form.setFieldsValue({ productIds: data })
      },
      saveSale () {
        this.form.validateFields((err, val) => {
          if (!err) {
            const func = this.$route.query.id ? updateCouponApi : saveCouponApi
            func({
              ...val,
              couponId: this.$route.query.id,
              startTime: moment(val.startTime).format('YYYY-MM-DD'),
              endTime: moment(val.startTime).format('YYYY-MM-DD'),
              launchStartTime: moment(val.launchStartTime).format('YYYY-MM-DD'),
              launchEndTime: moment(val.launchEndTime).format('YYYY-MM-DD'),
              productIds: val.productIds && val.productIds.toString(),
              isUpper: +val.isUpper
            }).then(res => {
              if (res.data.code == '200') {
                this.$message.success('保存成功')
                this.$router.back()
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .CreateSale {
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
      width: 100%;
      justify-content: space-around;
    }
  }
</style>
