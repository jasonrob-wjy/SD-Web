<template>
  <Layout>
    <Sider :collapsed-width="78" v-model="isCollapsed" :style="{background: '#fff'}">
      <Menu active-name="1-0" theme="light" width="auto" :class="menuitemClasses">
        <MenuItem name="1-0" to="/sys">
          <i class="fa fa-pie-component"></i>
          <span>人员设置</span>
        </MenuItem>
        <MenuItem name="1-1" to="/sys/set">
          <i class="fa fa-pie-component"></i>
          <span>个人中心</span>
        </MenuItem>
        <MenuItem name="1-2" to="/sys/log">
          <i class="fa fa-pie-component"></i>
          <span>操作日志</span>
        </MenuItem>
      </Menu>
    </Sider>
    <Layout>
      <div class="content-right">
         <router-view />
      </div>
    </Layout>
  </Layout>
</template>

<script>

export default {
  name: "setmain",
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
 
  },
  // created() {
 
  // },
  methods: {
   
   
  }
};
</script>
<style lang="scss">
.ivu-layout-sider-children {
  overflow-y: auto;
}
</style>
