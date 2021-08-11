<!--xiolng-->
<!--GoodsSku-->
<!--2021/7/7-->
<!--10:43-->
<template>
  <div class="goods-sku">
    <a-form :form="form" :label-col="{span: 2}" :wrapper-col="{span: 22}">
      <a-form-item
        label="规格属性"
        class="no-mb"
      >
        <div
          v-for="(item, index) in specGroupList"
          :key="item.specParamId"
        >
          <a-form-item :label="item.paramName" class="no-mb">
            <div
              v-decorator="[
              `multi[${index}]`,
              {
                rules: [{required: true, message: '请添加多规格属性'}]
              }
            ]"
            >
              <div class="specification-list">
                <a-tag
                  color="cyan"
                  closable
                  visible
                  v-for="(list, inx) in item.specData"
                  :key="inx"
                  @close="closeTag(item, inx)"
                >{{list.title}}
                </a-tag>
                <a-tag v-if="!item.show" color="orange" @click="addTag(item, index)">
                  <span>添加</span>
                  <a-icon type="plus" class="ml-5" />
                </a-tag>
                <a-input
                  style="width: 50px"
                  size="small"
                  v-show="item.show"
                  :ref="`initValue${index}`"
                  v-model="item.initValue"
                  @blur.stop="addSpecification(item, index)"
                  @pressEnter.stop="addSpecification(item, index)"
                  placeholder="请输入名称"
                  auto-focus
                />
              </div>
            </div>
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item label="多规格商品">
        <goods-multi
          ref="goodsMulti"
          v-if="specGroupList && specGroupList.length"
          :edit-data="skus"
          :multi-list="setSpecData"
          :multi-header="specGroupList"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { pageSpecParamApi } from "@/api/GoodsManageApi"
  import GoodsMulti from "@/views/GoodsManage/GoodsList/StepComp/GoodsMulti"

  export default {
    name: "GoodsSku",
    components: { GoodsMulti },
    props: {
      skus: Array,
      editId: String,
      specialSpec: Object
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        specGroupList: [],
      }
    },
    mounted () {
      this.editId && this.getSpecGroups()
      console.log('asasasas', this.skus)
    },
    computed: {
      setSpecData () {
        const list = this.specGroupList.map(v => v.specData)
        return list
      }
    },
    methods: {
      /**
       * 获取规格属性
       */
      getSpecGroups () {
        const vm = this
        pageSpecParamApi({ specGroupId: this.editId }).then(res => {
          if (res.data.code === '200') {
            const { data } = res.data
            this.specGroupList = data.map(v => {
              v.specData = []
              v.show = false
              v.initValue = ''
              return v
            })
            console.log('this.specialSpec', this.specialSpec.specialSpec)
            if (this.specialSpec.specialSpec && this.specialSpec.specialSpec.length) {
              this.specGroupList = []
              this.specialSpec.specialSpec && JSON.parse(this.specialSpec.specialSpec).map((v, index) => {
                console.log('vvvvvvvvvvvvvvvveeeeeeeeee', v, Object.values(v))
                const j = {}
                j.specData = []
                Object.keys(v).map((a, inx) => {
                  j.paramName = a
                  j.specData = v[a].map((j, indx) => {
                    return {
                      title: j,
                      index: indx
                    }
                  })
                })
                j.show = false
                j.initValue = ''
                this.form.getFieldDecorator(`multi[${index}]`, { initialValue: j })
                this.specGroupList.push(j)
              })
            }
            // setTimeout(() => {
            //   if (vm.skus) {
            //     console.log(654545, vm.skus)
            //     const skuList = (vm.skus.length && JSON.parse(vm.skus[0].ownSpec)) || []
            //     skuList.length && vm.specGroupList.map((v, inx) => {
            //       console.log('aaaaaaaaaa', v)
            //       v.specData = skuList[inx]
            //       this.form.setFieldsValue({ [`multi[${inx}]`]: skuList[inx] })
            //     })
            //     vm.$forceUpdate()
            //   }
            // }, 1000)
          }
        })
      },
      /**
       * 关闭属性
       * @param item
       * @param inx
       */
      closeTag (item, inx) {
        let selfItem = {}
        let selfIndex = 0
        this.specGroupList.map((v, index) => {
          if (v.specParamId == item.specParamId) {
            selfItem = v
            selfIndex = index
          }
        })
        selfItem.specData.splice(inx, 1)
        this.form.setFieldsValue({ [`multi[${selfIndex}]`]: selfItem })
        this.specGroupList[selfIndex] = selfItem
        this.$forceUpdate()
      },
      /**
       * 打开添加属性输入框
       * @param item
       * @param index
       */
      addTag (item, index) {
        item.show = true
        console.log('refs', this.$refs[`initValue${index}`][0])
        setTimeout(() => {
          this.$refs[`initValue${index}`][0].focus()
        }, 0)
      },
      /**
       * 添加属性
       * @param item
       * @param index
       * @returns {boolean}
       */
      addSpecification (item, index) {
        item.show = false
        if (!item.initValue) {
          item.show = false
          return false
        }
        if (item.specData.length && item.specData.some(v => v.title == item.initValue)) return
        item.specData.push({ title: item.initValue, key: item.specParamId, index: item.specData.length })
        this.form.setFieldsValue({ [`multi[${index}]`]: item })
        item.initValue = ''
        // this.specGroupList[selfIndex] = selfItem
        this.$forceUpdate()
      },
    },
    watch: {
      specialSpec: function (old, newSpecialSpec) {
        console.log(9999, old, newSpecialSpec)
        this.specGroupList = []
        newSpecialSpec.specialSpec && JSON.parse(newSpecialSpec.specialSpec).map(v => {
          this.specGroupList.push(v => {
            v.specData = Object.values(v => v)
            v.show = false
            v.initValue = ''
            return v
          })
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .goods-sku {
    .no-mb {
      margin-bottom: 0 !important;
    }
  }
</style>
