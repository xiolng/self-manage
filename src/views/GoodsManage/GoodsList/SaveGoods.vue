<!--xiolng-->
<!--SaveGoods-->
<!--2021/7/7-->
<!--10:07-->
<template>
  <div class="save-goods">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" :status="item.status">
        <a-icon :type="item.icon" slot="icon" style="font-size: 24px" />
      </a-step>
    </a-steps>
    <a-card style="margin: 20px 0; max-height: calc(100vh - 340px); overflow-y: auto;">
      <edit-goods
        ref="editGoods"
        v-if="current === 0"
        @setMulti="setMulti"
        @setSpecId="setSpecId"
        :product-details="editGoods"
      />
      <goods-detail
        ref="goodsDetail"
        v-if="current === 1"
        :product-detail="goodsDetail.productDetail"
      />
      <goods-sku
        ref="goodsSku"
        v-if="current === 2"
        :skus="goodsSku.skus"
        :special-spec="editGoods"
        :edit-id="editGoods.specGroupId"
      />
    </a-card>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next" class="mr-10">
        下一步
      </a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="saveGoods" class="mr-10"
      >
        保存
      </a-button>
      <a-button v-if="current > 0" @click="prev" class="mr-10">
        上一步
      </a-button>
    </div>
  </div>
</template>

<script>
  import EditGoods from "@/views/GoodsManage/GoodsList/StepComp/EditGoods"
  import GoodsDetail from "@/views/GoodsManage/GoodsList/StepComp/GoodsDetail"
  import GoodsSku from "@/views/GoodsManage/GoodsList/StepComp/GoodsSku"
  import { getProductByIdApi, saveProductApi, updateProductApi } from "@/api/GoodsManageApi"

  export default {
    name: "SaveGoods",
    components: { GoodsSku, GoodsDetail, EditGoods },
    data () {
      return {
        current: 0,
        steps: [
          {
            title: '基本信息',
            icon: 'bank',
            status: 'process',
          },
          {
            title: '商品描述',
            icon: 'container',
            status: 'wait',
          }
        ],
        editGoods: {
          categoryName: "",
          isDel: 0,
          isMult: 0,
          isPut: 0,
          originalPrice: 0,
          productCategoryId: "",
          productCover: "",
          productId: "",
          productIntro: "",
          productName: "",
          productPrice: 0,
          productStock: 0,
          productType: 0,
          salesVolume: 0,
          shareImageUrl: "",
          specialSpec: "",
          specGroupId: ""
        },
        goodsDetail: {
          productDetail: "",
        },
        goodsSku: {
          skus: [
            {
              enable: 0,
              indexes: "",
              originalPrice: 0,
              ownSpec: "",
              productCover: "",
              productId: "",
              productName: "",
              productPrice: 0,
              productSkuId: "",
              stock: 0
            }
          ],
        }
      }
    },
    mounted () {
      this.editGoods.productId = this.$route.query.ProductId || ''
      const productId = this.$route.query.productId
      productId && this.getDetail(productId)
    },
    methods: {
      getDetail (productId) {
        getProductByIdApi({
          productId
        }).then(res => {
          const { code, data } = res.data
          if (code == '200') {
            Object.keys(this.editGoods).map(v => {
              this.editGoods[v] = data[v]
            })
            this.editGoods.productCategoryId = data.parentCategoryId == 0 ? [data.productCategoryId] : [data.parentCategoryId, data.productCategoryId]
            this.goodsDetail.productDetail = data.productDetail
            this.goodsSku.skus = data.skus
            // console.log('zzzzzzzzzzzzzzzzz', this.goodsSku)
            this.setMulti(data.isMult)
          }
        })
      },
      saveGoods () {
        let data = {}
        if (this.$route.query.productId) {
          data.productId = this.$route.query.productId
        }
        const isMult = this.editGoods.isMult
        if (!isMult) {
          this.$refs.goodsDetail.form.validateFieldsAndScroll((err, val) => {
            if (!err) {
              this.updateForm({
                ...this.editGoods,
                productCategoryId: this.editGoods.productCategoryId[this.editGoods.productCategoryId.length - 1],
                ...this.goodsDetail,
                productDetail: val.productDetail
              })
            }
          })
          return false
        }
        const vm = this
        this.$refs.goodsSku.form.validateFieldsAndScroll((err, val) => {
          // console.log('err', err, val)
          if (!err) {
            // console.log(val)
            data.specialSpec = JSON.stringify(val.multi.map(v => {
              return {
                [v.paramName]: v.specData.map(v => v.title)
              }
            }))
            this.$refs.goodsSku.$refs.goodsMulti.form.validateFieldsAndScroll((mErr, mVal) => {
              // console.log('mErr', mErr, mVal)
              // console.log('dataSource', vm.$refs.goodsSku.$refs.goodsMulti.dataSource)
              if (!mErr) {
                // console.log(mVal)
                // console.log('vm;', vm.editGoods, vm.goodsDetail)
                data = Object.assign(vm.editGoods, vm.goodsDetail, data)
                data.productCategoryId = this.editGoods.productCategoryId[this.editGoods.productCategoryId.length - 1]
                const sku = []
                mVal.productName.map((v, index) => {
                  // console.log('qqqqqqqqqqqqqqqqqqqqqqq')
                  sku.push({
                    // ownSpec: JSON.stringify(val.multi),
                    enable: +mVal.enable[index] || 0,
                    productPrice: mVal.productPrice[index],
                    productCover: mVal.productCover[index],
                    productName: v,
                    ownSpec: mVal.ownSpec[index],
                    originalPrice: mVal.originalPrice[index],
                    stock: mVal.stock[index],
                    indexes: vm.$refs.goodsSku.$refs.goodsMulti.dataSource[index].indexes,
                    productId: vm.$refs.goodsSku.$refs.goodsMulti.dataSource[index].productId || vm.$route.query.productId || undefined,
                  })
                })
                // console.log('data', data, 'sku', sku)
                data.skus = sku
                this.updateForm(data)
              }
            })
          }
        })
      },
      updateForm (data) {
        const func = this.$route.query.productId ? updateProductApi : saveProductApi
        func(
          data
        ).then(res => {
          const { code, msg } = res.data
          if (code == '200') {
            this.$message.success(`保存成功`)
            this.$router.push(`/goodsManage/goodsList`)
          } else {
            this.$message.error(msg)
          }
        })
      },
      setSpecId (val) {
        this.editGoods.specGroupId = val
      },
      setMulti (show) {
        // console.log(33333333, show)
        this.editGoods.isMult = show
        if (show) {
          this.steps.push(
            {
              title: 'sku属性',
              icon: 'database',
              status: 'wait',
            })
        } else {
          this.steps.length >= 3 && this.steps.splice(this.steps.length - 1, 1)
        }
        this.$forceUpdate()
      },
      next () {
        // this.nextStep()
        // return false
        switch (this.current) {
          case 0:
            this.$refs.editGoods.form.validateFieldsAndScroll((err, val) => {
              if (!err) {
                console.log(val)
                this.editGoods = Object.assign(this.editGoods, { ...val, isMult: +val.isMult, isPut: +val.isPut })
                // console.log(this.editGoods)
                this.nextStep()
              }
            })
            break
          case 1:
            this.$refs.goodsDetail.form.validateFieldsAndScroll((err, val) => {
              if (!err) {
                // console.log(val)
                this.goodsDetail.productDetail = val.productDetail
                this.nextStep()
              }
            })
            break
          case 2:
            this.$refs.editGoods.form.validateFieldsAndScroll((err, val) => {
              if (!err) {
                // console.log(val)
                this.nextStep()
              }
            })
            break
        }
      },
      nextStep () {
        this.steps[this.current].status = 'finish'
        this.current++
        this.steps[this.current].status = 'process'
      },
      prev () {
        this.steps[this.current].status = 'wait'
        this.current--
        this.steps[this.current].status = 'process'
      },
    },
  }
</script>

<style scoped>

</style>
