<template>
  <div class="header">
    <div>
      <Menu mode="horizontal" :theme="theme" active-name="1">
        <!-- <Input v-model="value14" placeholder="Enter something..." clearable style="width: 100px" /> -->
        <MenuItem name="1" to="/">
          <Icon type="ios-home" size="18" />工作台
        </MenuItem>
      
        <MenuItem name="2" to="/addpage">
         <Icon type="md-bookmarks" size="18" />创建项目
        </MenuItem> 
         <MenuItem name="3" to="/profile">
          <Icon type="ios-person" size="24" />个人中心
        </MenuItem>
        <!-- <Submenu name="3">
          <template slot="title">
            <Icon type="ios-stats" />使用文档
          </template>
          <MenuGroup title="使用">
            <MenuItem name="3-1">新增和启动</MenuItem>
            <MenuItem name="3-2">活跃分析</MenuItem>
            <MenuItem name="3-3">时段分析</MenuItem>
          </MenuGroup>
          <MenuGroup title="留存">
            <MenuItem name="3-4">用户留存</MenuItem>
            <MenuItem name="3-5">流失用户</MenuItem>
          </MenuGroup>
        </Submenu>-->
        <MenuItem name="4" to="/docs">
          <Icon type="md-list-box" size="20" />说明文档
        </MenuItem>
      </Menu>
      <Dropdown class="dropdown-menu">
        <div class="heade-menu">
          <img :src="$url+user.url" />
          <span>{{user.name}}</span>
          <Icon type="ios-arrow-down"></Icon>
        </div>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="handleQuit">
            <Icon type="ios-log-out" size="16" />退出登录
          </DropdownItem>
          <!-- <DropdownItem divided>北京烤鸭</DropdownItem> -->
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      theme: "dark",
      user: {}
    };
  },
  mounted() {
    this.user = this.$store.state.variable.info;
  },
  methods: {
    handleQuit() {
      window.sessionStorage.clear();
      this.$store.commit("setUser", {});
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
