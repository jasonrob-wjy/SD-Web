<template>
  <Layout>
    <Sider collapsible :collapsed-width="78" v-model="isCollapsed" :style="{background: '#fff'}">
      <Menu active-name="1-1" theme="light" width="auto" :class="menuitemClasses">
        <MenuItem name="1-1">
          <i class="fa fa-pie-chart"></i>
          <span>图表组件</span>
        </MenuItem>
        <MenuItem name="1-2">
          <i class="fa fa-pie-chart"></i>
          <span>可视大屏</span>
        </MenuItem>
        <MenuItem name="1-3">
          <i class="fa fa-pie-chart"></i>
          <span>前端插件</span>
        </MenuItem>
        <MenuItem name="1-4">
          <i class="fa fa-pie-chart"></i>
          <span>网站模板</span>
        </MenuItem>
        <MenuItem name="1-5">
          <!-- <Icon type="ios-navigate"></Icon> -->
          <i class="fa fa-sitemap"></i>
          <span>结构树</span>
        </MenuItem>
        <MenuItem name="1-6">
          <i class="fa fa-usb"></i>
          <span>思维导图</span>
        </MenuItem>
        <!-- <MenuItem name="1-4">
          <i class="fa fa-pie-chart"></i>
          <span>综合统计</span>
        </MenuItem> -->
      </Menu>
    </Sider>

    <Layout>
      <div style="overflow-x:hidden;padding:10px 15px;">
        <router-view />
      </div>
    </Layout>
  </Layout>

  <!-- <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer> -->
</template>
<script>
export default {
  data() {
    return {
      height: 500,
      isCollapsed: false
    };
  },

  computed: {
    menuitemClasses: function() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  mounted() {}
};
</script>


<style lang="scss"  scoped>
</style>