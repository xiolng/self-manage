<!--xiolng-->
<!--index-->
<!--2021/7/5-->
<!--15:13-->
<template>
  <div class="index">
    <!--筛选、添加-->
    <a-row type="flex" justify="space-between" align="top" class="mb-20">
      <a-col span="20">
        <search-c
          @get-list="getSearch"
          :search-list="[
            {name: '规格属性名称', key: 'paramName'}
            ]"
        />
      </a-col>
      <a-col>
        <a-button type="primary" @click="visible = true, editId = null">新建</a-button>
      </a-col>
    </a-row>
    <!--table-list-->
    <a-table
      :columns="column"
      :dataSource="dataSource"
      :pagination="pages"
      rowKey="specParamId"
      @change="pageChange"
    >
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, editId = record.specParamId"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.specParamId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <create-spec-param
      v-if="visible"
      :visible="visible"
      :edit-id="editId"
      @cancel="visible = false, editId = null"
      @create="visible = false, editId = null, getList()"
    />
  </div>
</template>

<script>

  import SearchC from "@/components/SearchC/SearchC"
  import { deleteSpecGroupApi, deleteSpecParamApi, pageSpecParamApi } from "@/api/GoodsManageApi"
  import CreateSpecParam from "@/views/GoodsManage/SpecParam/CreateSpecParam"

  const column = [
    {
      title: '属性名称',
      dataIndex: 'paramName'
    },
    {
      title: '创建人',
      dataIndex: 'createBy'
    },
    {
      title: '更新人',
      dataIndex: 'updateBy'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime'
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
    components: { CreateSpecParam, SearchC },
    data () {
      return {
        column,
        pages: {
          current: 1,
          specGroupId: this.$route.query.id,
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
        pageSpecParamApi({
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
      /**
       * 删除
       * @param specParamId
       */
      deleteItem (specParamId) {
        deleteSpecParamApi({
          specParamId
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
