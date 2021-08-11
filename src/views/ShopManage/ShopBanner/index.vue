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
            {name: '名称', key: 'bannerName'}
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
      <div slot="bannerImage" slot-scope="text">
        <a-avatar :src="'/files/'+text" @click="imageUrl = text, showImage = true" />
      </div>
      <div slot="operation" slot-scope="text, record">
        <a-row type="flex">
          <a-col>
            <a-button
              type="primary"
              size="small"
              class="mr-10"
              @click="visible = !visible, editId = record.shopBannerId"
            >编辑
            </a-button>
          </a-col>
          <a-col>
            <a-popconfirm
              title="确定要删除吗？"
              @confirm="deleteItem(record.shopBannerId)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </div>
    </a-table>
    <create-banner
      v-if="visible"
      ref="createBannerRef"
      :visible="visible"
      :edit-id="editId"
      @cancel="visible = false, editId = null"
      @create="visible = false, editId = null, getList()"
    />
    <a-modal title="预览" v-model="showImage" :footer="null" @cancel="imageUrl = null">
      <img :src="'/files/'+imageUrl" style="width: 100%; height: 100%" />
    </a-modal>
  </div>
</template>

<script>

  import SearchC from "@/components/SearchC/SearchC"
  import { deleteShopBannerApi, pageShopBannerApi } from "@/api/ShopManageApi"
  import CreateBanner from "@/views/ShopManage/ShopBanner/CreateBanner"

  const column = [
    {
      title: '图片',
      dataIndex: 'bannerImage',
      scopedSlots: { customRender: 'bannerImage' }
    },
    {
      title: '名称',
      dataIndex: 'bannerName'
    },
    {
      title: '链接',
      dataIndex: 'bannerUrl'
    },
    {
      title: '创建人',
      dataIndex: 'createBy'
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
    components: { CreateBanner, SearchC },
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
        editId: null,
        showImage: false,
        imageUrl: null
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      // 获取列表
      getList () {
        pageShopBannerApi({
          ...this.pages,
          ...this.searchName
        }).then(res => {
          const { data, code, total } = res.data
          if (code === '200') {
            this.dataSource = data.sort((a, b) => a.sort - b.sort)
            this.pages.total = total
          }
        })
      },
      /**
       * 删除
       * @param bannerId
       */
      deleteItem (bannerId) {
        deleteShopBannerApi({
          bannerId
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
