<!--xiolng-->
<!--CreateSpecifics-->
<!--2021/7/6-->
<!--14:32-->
<template>
  <div class="CreateSpecifics">
    <a-modal
      :visible="visible"
      title="新建、编辑"
      @cancel="$emit('cancel')"
      @ok="$emit('create')"
    >
      <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
        <div
          v-for="(item, index) in specGroupList"
          :key="item.specParamId"
        >
          <a-form-item :label="item.paramName">
            <a-form-item>
              <div
                v-decorator="[
                  `specGroupList[${index}]`,
                  {
                    initialValue: [],
                    rules: [{required: true, message: `请添加商品规格`}]
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
                  >{{list}}
                  </a-tag>
                  <a-tag v-if="!item.show" color="orange" @click="addTag(item, index)">
                    <span>添加</span>
                    <a-icon type="plus" class="ml-5" />
                  </a-tag>
                  <a-input
                    style="width: 50px"
                    size="small"
                    v-if="item.show"
                    :ref="`initValue${index}`"
                    v-model="item.initValue"
                    @blur.stop="addSpecification(item, index)"
                    @pressEnter.stop="addSpecification(item, index)"
                    placeholder="请输入名称"
                    autofocus
                  />
                </div>
              </div>
            </a-form-item>
          </a-form-item>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { pageSpecParamApi } from "@/api/GoodsManageApi"

  export default {
    name: 'CreateSpecifics',
    props: {
      visible: Boolean,
      editId: String
    },
    data () {
      return {
        form: this.$form.createForm(this, { name: 'form' }),
        specGroupList: [],
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
            this.specGroupList = data.map(v => {
              v.specData = []
              v.show = true
              v.initValue = ''
              return v
            })
          }
        })
      },
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
        this.specGroupList[selfIndex] = selfItem
        this.$forceUpdate()
      },
      addTag (item, index) {
        item.show = true
        this.$refs[`initValue${index}`].focus()
        this.$forceUpdate()
      },
      addSpecification (item, index) {
        item.show = false
        if (!item.initValue) {
          item.show = false
          return false
        }
        if (item.specData.length && item.specData.some(v => v == item.initValue)) return
        item.specData.push(item.initValue)
        item.initValue = ''
        // this.specGroupList[selfIndex] = selfItem
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped>
  .CreateSpecifics {

  }
</style>
