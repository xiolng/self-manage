<template>
  <div class="menu-box">
    <!--菜单-->
    <a-menu
      theme="dark"
      v-model="selectMenu"
      :default-open-keys="openKeys()"
      force-sub-menu-render
      mode="inline"
      @click="clickMenu"
    >
      <template v-for="item in defaultData">

        <!--一级菜单-->
        <a-menu-item
          :key="item.meta.activeUrl"
          v-if="item && !item.meta.hideMenu && !item.children"
        >
          <a-icon :type="item.meta.icon" />
          <span>{{item.meta.name}}</span>
        </a-menu-item>
        <!--多级菜单-->
        <sub-menu
          v-if="item && !item.meta.hideMenu && item.children"
          :menu-info="item"
          :key="item.meta.activeUrl"
        />
      </template>
    </a-menu>
  </div>
</template>

<script>
  // 路由数据
  // import routes from '@/router/index'
  import SubMenu from './SubMenu'
  import routes from "../../router"

  export default {
    name: 'MenuC',
    components: {
      SubMenu,
    },
    props: {
      // 初始化选中菜单
      initActive: String,
      menuData: Array
    },
    data () {
      return {
        routes: [],
        // 选中菜单
        selectMenu: '',
        defaultData: routes[0].children
      }
    },
    beforeMount () {
      // 设置选中菜单
      this.selectMenu = [this.$route.meta.activeUrl]
    },
    mounted () {
      this.defaultData = routes[0].children
    },
    methods: {
      openKeys () {
        return [this.$route.matched[1].meta.activeUrl]
      },
      // 点击菜单选中
      clickMenu ({item, key, keyPath}) {
        this.selectMenu = [key]
        if (key === this.$route.path) return
        this.$router.push({
          path: key
        })
      }
    },
    computed: {
      // 监听菜单点击
      activeMenu: function () {
        return this.selectMenu
      }
    },
  }
</script>

<style scoped>

</style>
