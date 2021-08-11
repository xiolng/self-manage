<!--SelectTypeDrawer-->
<template>
  <div class="select-type-drawwer">
    <a-drawer
      :visible="visible"
      title="选择"
      width="50%"
      placement="left"
      :mask-closable="false"
      @close="$emit('cancel')"
    >
      <div class="search-box">
        <a-input placeholder="请输入关键字搜索" v-model="searchName"
                 @keyup.enter="pages.pageNum = 1, pages.current = 1, getList()" allow-clear />
        <a-button type="primary" @click="pages.pageNum = 1, pages.current = 1, getList()">搜索</a-button>
      </div>
      <!--选中tag-->
      <div class="result-box" v-if="checkType === 'checkbox'">
        <div class="result-title">已选项：</div>
        <div class="result-detail">
          <a-tag
            v-for="item in resultData"
            :key="item.productId"
            color="cyan"
            closable
            @close="() => delResult(item)"
          >
            {{item.productName}}
          </a-tag>
        </div>
        <div class="result-tip">* 针对搜索翻页情况，需手动删除</div>
      </div>
      <!--table-list-->
      <a-table
        :columns="column"
        :dataSource="dataSource"
        :pagination="pages"
        rowKey="productId"
        :row-selection="{
          onChange: changeCheck,
          selectedRowKeys: selectDataList,
          type: checkType,
        }"
        @change="pageChange"
      >
        <div slot="telecomId" slot-scope="text, record">
          {{record.productId || record.productId}}
        </div>
      </a-table>
      <div class="btn-box">
        <a-button
          type="primary"
          @click="$emit('create', {item: checkType === 'checkbox' ? resultData : selectData})"
        >提交
        </a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>

  const column = [
    {
      title: '名称',
      dataIndex: 'productName'
    },
    {
      title: 'id',
      dataIndex: 'productId',
      scopedSlots: { customRender: 'telecomId' }
    },
  ]
  export default {
    name: 'SelectTypeDrawer',
    props: {
      visible: Boolean,
      func: Function,
      selectList: Array,
      checkType: {
        type: String,
        default: 'checkbox'
      },
      defaultSelectData: Array,
      // 客户经理
      customer: Boolean
    },
    data () {
      return {
        column: this.customer ? [
          ...column,
          {
            title: '客户经理电话',
            dataIndex: 'customerManagerTele'
          }
        ] : column,
        dataSource: [],
        searchName: '',
        pages: {
          current: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true,
          showTotal: total => `总数量：${total}条 `
        }, // 分页
        defualtData: [],
        selectData: [],
        selectDataList: [],
        resultData: [],
      }
    },
    beforeMount () {
      if (this.checkType === 'checkbox') {
        this.resultData = this.defaultSelectData && this.defaultSelectData.length ? JSON.parse(JSON.stringify(this.defaultSelectData)) : []
      }
      this.defaultData = this.defaultSelectData && this.defaultSelectData.length ? JSON.parse(JSON.stringify(this.defaultSelectData)) : []
    },
    mounted () {
      this.getList()
      this.selectDataList = (this.selectList && JSON.parse(JSON.stringify(this.selectList))) || []
    },
    methods: {
      getList () {
        this.func({
          name: this.searchName,
          pageNum: this.pages.current,
          pageSize: this.pages.pageSize
        }).then(res => {
          if (res.data.code === '200') {
            this.dataSource = res.data.data
            this.pages.total = res.data.total
            this.defaultData && this.defaultData.map(v => {
              this.dataSource.map(j => {
                if (j.productId === v.productId) {
                  this.selectData.push(j)
                }
              })
            })
            if (this.defaultData.length) {
              const obj = {}
              this.resultData = [...this.resultData, ...this.selectData].reduce((cur, next) => {
                obj[next.productId] ? '' : obj[next.productId] = true && cur.push(next)
                return cur
              }, [])
              this.defaultData = []
            }
          }
        })
      },
      delResult (item) {
        console.log('items', item)
        this.resultData = this.resultData.filter(v => v.productId !== item.productId)
        this.selectDataList = this.selectDataList.filter(v => v !== item.productId)
      },
      selectCheck (item) {
        this.resultData = this.resultData.filter(v => v.productId !== item.productId)
      },
      changeCheck (value, item) {
        console.log(value, item)
        this.selectDataList = value
        this.selectData = item
        const obj = {}
        this.resultData.concat(this.selectData)
        this.resultData = [...this.resultData, ...this.selectData].reduce((cur, next) => {
          obj[next.productId] ? '' : obj[next.productId] = true && cur.push(next)
          return cur
        }, [])
      },
      pageChange (pagination) {
        this.pages = {
          ...this.pages,
          ...pagination,
          pageNum: pagination.current
        }
        this.getList()
      },
    }
  }
</script>

<style scoped lang="less">
  .search-box {
    display: flex;
    margin-bottom: 20px;

    .ant-btn {
      flex-shrink: 0;
      margin-left: 10px;
    }
  }

  .result-box {
    margin: 0 0 20Px;
    border: 1px solid #ddd;
    padding: 10px;

    .result-title {
      font-size: 16px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
    }

    .result-tip {
      border-top: 1px solid #ddd;
      padding-top: 5px;
      margin-top: 10px;
      color: red;
    }

    .ant-tag {
      margin: 0 10px 10px 0;
    }
  }

  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
  }
</style>
