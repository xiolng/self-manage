<!--xiolng-->
<!--index-->
<!--2021/7/15-->
<!--9:07-->
<template>
  <div class="index">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '用户名', key: 'username'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="visible = true, editId = null">新增</a-button>
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="id"
      @change="pageChange"
    >
      <div slot="showIcon" slot-scope="text">
        <a-avatar :src="'/files/' + text" />
      </div>
      <div slot="isShow" slot-scope="text, record">
        <a-switch
          :default-checked="!!text"
          :checked="text"
          checked-children="是"
          un-checked-children="否"
          @change="changeShow(record)"
        />
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, isEdit = record.showWindowId"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.showWindowId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <create-show-window
      v-if="visible"
      ref="showWindowRef"
      :visible="visible"
      :edit-id="editId"
      @cancel="visible = false, editId = null"
      @create="visible = false, editId = null, getList()"
    />
  </div>
</template>

<script>

  import SearchC from "@/components/SearchC/SearchC"
  import {
    deleteShowWindowApi,
    displayShowWindowApi,
    enableShowWindowApi,
    pageShowWindowApi
  } from "@/api/ShopManageApi"
  import CreateShowWindow from "@/views/ShopManage/ShopShowWindow/CreateShowWindow"

  const column = [
    {
      title: '橱窗图片',
      dataIndex: 'showIcon',
      scopedSlots: { customRender: 'showIcon' }
    },
    {
      title: '橱窗名称',
      dataIndex: 'showName'
    },
    {
      title: '是否显示',
      dataIndex: 'isShow',
      scopedSlots: { customRender: 'isShow' }
    },
    {
      title: '排序',
      dataIndex: 'sort',
      scopedSlots: { customRender: 'sort' }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      scopedSlots: { customRender: 'operation' }
    }
  ]
  export default {
    name: "index",
    components: { CreateShowWindow, SearchC },
    data () {
      return {
        column,
        pages: {
          current: 1,
          pageSize: 10,
          total: 0, // 总条数
          showSizeChanger: true
        }, // 分页
        searchName: {}, // 搜索关键字
        dataSource: [],
        visible: false,
        editId: null
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        pageShowWindowApi({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          const { data, code, total } = res.data
          if (code === '200') {
            this.dataSource = data
            this.pages.total = total
          }
        })
      },
      changeShow (item) {
        const func = item.isShow ? displayShowWindowApi : enableShowWindowApi
        func({
          showWindowId: item.showWindowId
        }).then(res => {
          const { code, msg } = res.data
          if (code == '200') {
            this.$message.success('操作成功')
            item.isShow = !item.isShow
          } else {
            this.$message.error(msg)
          }
        })
      },
      /**
       * 删除
       * @param showWindowId
       */
      deleteItem (showWindowId) {
        deleteShowWindowApi({
          showWindowId
        }).then(res => {
          const { code } = res.data
          if (code === '200') {
            this.$message.success('删除成功')
            this.getList()
          }
        })
      },
      /**
       * 搜索、筛选
       * @param value
       */
      getSearch (value) {
        this.searchName = value
        this.getList()
      },
      /**
       * 分页、跳转
       * @param pagination
       */
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
  .index {

  }
</style>
