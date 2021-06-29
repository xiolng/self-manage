<!--MenuItem-->
<template>
  <a-sub-menu
    :key="menuInfo.meta.activeUrl"
    v-bind="$props"
    v-on="$listeners"
  >
    <span slot="title">
      <a-icon :type="menuInfo.meta.icon" /> <span> {{menuInfo.meta.name}} </span>
    </span>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.meta.hideMenu && !item.children"
        :key="item.meta.activeUrl"
      >
        <a-icon :type="item.meta.icon" />
        <span>{{item.meta.name}}</span>
      </a-menu-item>
      <sub-menu v-else-if="!item.meta.hideMenu" :key="item.meta.activeUrl" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
  import { Menu } from 'ant-design-vue'

  export default {
    name: 'SubMenu',
    props: {
      ...Menu.SubMenu.props,
      menuInfo: {
        type: Object,
        default: () => ({})
      }
    },
    isSubMenu: true,
    data () {
      return {}
    }
  }
</script>

<style scoped>

</style>
