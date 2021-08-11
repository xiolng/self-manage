<!--xiolng-->
<!--GoodsMulti-->
<!--2021/7/7-->
<!--11:16-->
<template>
  <div class="goods-multi">
    <a-form :form="form" :label-col="{span: 4}" :wrapper-col="{span: 16}">
      <!--table-list-->
      <a-table
        :columns="dataHeader"
        :dataSource="dataSource"
        :pagination="false"
        rowKey="val => val.id"
      >
        <div :slot="`ownSpec`" slot-scope="text, record, index">
          <a-form-item>
            <div
              v-decorator="[
              `ownSpec[${index}]`
            ]"
            >
            </div>
          </a-form-item>
        </div>
        <div slot="image" slot-scope="text, record, index">
          <a-form-item>
            <upload-img-c
              @imgName="value => {form.setFieldsValue({[`productCover[${index}]`]: value})}"
              :default-data="form.getFieldValue(`productCover[${index}]`) || ''"
              v-decorator="[
              `productCover[${index}]`,
              {
                rules: [{required: true, message: '请上传图片'}]
              }
            ]"
            />
          </a-form-item>
        </div>
        <div slot="productName" slot-scope="text, record, index">
          <a-form-item>
            <a-input
              placeholder="请输入名称"
              v-decorator="[
              `productName[${index}]`,
              {
                rules: [{required: true, message: '请输入名称'}]
              }
            ]"
            />
          </a-form-item>
        </div>
        <div slot="price" slot-scope="text, record, index">
          <a-form-item>
            <a-input-number
              :min="0.01"
              placeholder="请输入价格"
              v-decorator="[
              `productPrice[${index}]`,
              {
                rules: [{required: true, message: '请输入价格'}]
              }
            ]"
            />
          </a-form-item>
        </div>
        <div slot="originPrice" slot-scope="text, record, index">
          <a-form-item>
            <a-input-number
              :min="0.01"
              placeholder="请输入原价"
              v-decorator="[
              `originalPrice[${index}]`,
              {
                rules: [{required: true, message: '请输入原价'}]
              }
            ]"
            />
          </a-form-item>
        </div>
        <div slot="sales" slot-scope="text, record, index">
          <a-form-item>
            <a-input-number
              placeholder="请输入库存"
              v-decorator="[
              `stock[${index}]`,
              {
                rules: [{required: true, message: '请输入库存'}]
              }
            ]"
            />
          </a-form-item>
        </div>
        <div slot="operation" slot-scope="text, record, index">
          <a-form-item>
            <a-switch
              :default-checked="!!form.getFieldValue(`enable[${index}]`)"
              checked-children="是"
              un-checked-children="否"
              v-decorator="[
                `enable[${index}]`
              ]"
            />
          </a-form-item>
        </div>
      </a-table>
    </a-form>
  </div>
</template>

<script>
  import UploadImgC from '@/components/UploadImgC/UploadImgC'

  const dataHeader = [
    {
      id: 0,
      title: '',
      dataIndex: 'ownSpec',
      scopedSlots: { customRender: 'ownSpec' }
    },
    {
      id: 1,
      title: '商品图片',
      dataIndex: 'productCover',
      scopedSlots: { customRender: 'image' }
    },
    {
      id: 2,
      title: '商品名称',
      dataIndex: 'productName',
      width: '10%',
      scopedSlots: { customRender: 'productName' }
    },
    {
      id: 3,
      title: '单价',
      dataIndex: 'productPrice',
      scopedSlots: { customRender: 'price' }
    },
    {
      id: 4,
      title: '原价',
      dataIndex: 'originalPrice',
      scopedSlots: { customRender: 'originPrice' }
    },
    {
      id: 5,
      title: '库存',
      dataIndex: 'stock',
      scopedSlots: { customRender: 'sales' }
    },
    {
      id: 6,
      title: '是否启用',
      dataIndex: 'enable',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: "GoodsMulti",
    components: {
      UploadImgC
    },
    props: {
      editData: Array,
      multiList: Array,
      multiHeader: Array
    },
    data () {
      return {
        dataHeader: JSON.parse(JSON.stringify(dataHeader)),
        form: this.$form.createForm(this, { name: 'form' }),
        specGroupList: [],
        dataSource: []
      }
    },
    mounted () {
      this.specGroupList = this.multiHeader
      this.dataHeader = JSON.parse(JSON.stringify(dataHeader))
      console.log(23232323, this.multiHeader, this.specGroupList)
      this.multiHeader && this.multiHeader.map((v, index) => {
        // if (v.specData.length <= 0) return
        this.dataHeader.unshift({
          id: index + 7,
          title: v.paramName,
          dataIndex: v.paramName
        })
      })
      console.log('eeeeeeeeeeeeee', this.editData)
      const itemData = {}
      JSON.parse(JSON.stringify(this.editData)).sort((a, b) => +a.indexes.split('_').join('') - +b.indexes.split('_').join('')).map((v, index) => {
        console.log('qqqq', v)
        Object.keys(v).map(j => {
          if (!itemData[j]) {
            itemData[j] = []
          }
          itemData[j][index] = v[j]
        })
      })
      this.dataSource = JSON.parse(JSON.stringify(this.editData))
      console.log('itemData', itemData, this.dataHeader)
      Object.keys(itemData).map(key => {
        itemData.productName.map((v, index) => {
          this.form.getFieldDecorator(`${key}[${index}]`, { initialValue: itemData[key][index] })
        })
        itemData.ownSpec.length && itemData.ownSpec.map((v, index) => {
          const ownSpec = JSON.parse([v])
          Object.keys(ownSpec).map(j => {
            this.form.getFieldDecorator(`${j}[${index}]`, { initialValue: ownSpec[j] })
            this.dataSource[index][j] = ownSpec[j]
          })
        })
      })
      setTimeout(() => {
        console.log('dddd', this.form.getFieldsValue())
      }, 0)
    },
    methods: {
      /**
       * 添加table行计算
       * @param arr []
       */
      combine (arr) {
        const r = [];
        (function f (t, a, n) {
          if (n === 0) return r.push(t)
          for (let i = 0; i < a[n - 1].length; i++) {
            f(t.concat(a[n - 1][i]), a, n - 1)
          }
        })([], arr, arr.length)
        return r
      },
      /**
       * 删除table头
       * @param key
       */
      removeHeader (key) {
        const headerList = this.dataHeader.filter(v => v.id !== key)
        this.$set(this, 'dataHeader', headerList)
        this.selectSpecificationList = this.selectSpecificationList.filter(
          v => v.specId !== key
        )
        this.changeSpecification()
      },
      // 监听、增删改table数据
      changeSpecification (list) {
        this.form.resetFields()
        const vm = this
        console.log(45454545, list)
        this.dataSource = []
        console.log('list', list, this.specGroupList)
        const formData = this.form.getFieldsValue() || {}
        list.map(v => {
          const keys = vm.specGroupList.filter(c => c.specParamId == v[0].key)[0].paramName
          const isDu = this.dataHeader.filter(j => j.dataIndex == keys)
          if (isDu.length) return
          v.dataIndex = keys
          v.id = this.dataSource.length + 1
          this.dataHeader.unshift(v)
        })
        this.combine(list).map((v, index) => {
          const datas = {
            ownSpec: {}
          }
          Object.values(this.dataHeader).map(j => {
            console.log('vvvvvvvvvvvvvvvv', j, formData)

            datas.indexes = ''
            if (j.id <= 6 && j.id !== 0) {
              datas[v.dataIndex] = j.title
            } else {
              datas[j.dataIndex] = (formData[j.dataIndex] && formData[j.dataIndex][index]) || ''
            }
          })
          console.log('combine', v, index)
          v.map((j, inx) => {
            if (inx < v.length - 1) {
              datas.indexes += `${j.index}_`
            } else {
              datas.indexes += j.index
            }
            if (!datas.ownSpec || datas.ownSpec == '') {
              datas.ownSpec = {}
            }
            if (datas.ownSpec.length) {
              datas.ownSpec = JSON.parse(datas.ownSpec)
            }
            console.log('444444444444', v, vm.specGroupList)
            console.log(66666, vm.specGroupList.filter(c => c.specParamId == j.key)[0])
            const keys = vm.specGroupList.filter(c => c.specParamId == j.key)[0].paramName
            datas.ownSpec[keys] = j.title
            console.log('jjjjjjjjjjjjjjjjjj', j)
            // datas[j.key.toString()] = j.title
            datas[keys] = j.title
            console.log('qqqq-----data', datas)
          })
          this.form.getFieldDecorator(`ownSpec[${index}]`, { initialValue: JSON.stringify(datas.ownSpec) })
          vm.dataSource.unshift(datas)
          setTimeout(() => {
            console.log('fieldsValue', this.form.getFieldsValue())
          }, 1000)
        })
      },
    },
    watch: {
      multiList: function (old, newParamList) {
        console.log(555555555, old, newParamList)
        if (newParamList.length){
          newParamList && newParamList.length && this.changeSpecification(newParamList)
          return false
        }
        old && old.length && this.changeSpecification(old)
      },
      multiHeader: function (old, newSpecGroupList) {
        console.log(11111111111111, newSpecGroupList)
        this.specGroupList = JSON.parse(JSON.stringify(newSpecGroupList))
        this.dataHeader = JSON.parse(JSON.stringify(dataHeader))
        newSpecGroupList.map((v, index) => {
          this.form.getFieldDecorator(`header[${index}]`, { initialValue: v.paramName })
          this.dataHeader.unshift({
            id: index + 7,
            title: v.paramName,
            dataIndex: v.paramName,
            scopedSlots: { customRender: `header[${index + 7}]` },
            aaa: 111
          })
        })
      },
    }
  }
</script>

<style scoped>

</style>
