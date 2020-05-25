<template>
  <div class="header">
    <div>
      <div class="he-left">
        <!-- <h1>Web Deploy</h1> -->
        <h1></h1>
        <Menu mode="horizontal" :theme="theme" active-name="1">
          <!-- <Input v-model="value14" placeholder="Enter something..." clearable style="width: 100px" /> -->
          <MenuItem name="1" to="/">
            <Icon type="md-cube" size="18" />工作台
          </MenuItem>

          <MenuItem name="2" to="/addpage">
            <Icon type="md-add" size="20" />创建项目
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
            <Icon type="ios-book" size="20" />说明文档
          </MenuItem>
          <!-- <MenuItem name="5">
            <Badge :count="2">
              <Icon type="ios-notifications-outline" size="24"></Icon>
            </Badge>消息
          </MenuItem>-->
        </Menu>
      </div>
      <Input
        v-model="inputVal"
        search
        @on-search="handleOnSearch"
        placeholder="查找项目..."
        style="width: 200px"
      />
      <Dropdown class="dropdown-menu">
        <div class="heade-menu">
          <img :src="user.url" />
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
      inputVal: "",
      user: {}
    };
  },
  // watch: {
  //   inputVal(val) {

  //   }
  // },
  mounted() {
    this.user = this.$store.state.variable.info;
    // this.$event.on("inputClear", val => {
    //   this.inputVal = val;
    // });
  },
  methods: {
    handleOnSearch() {
      this.$event.emit("input", this.inputVal);
    },
    handleQuit() {
      window.sessionStorage.clear();
      this.$store.commit("setUser", {});
      this.$store.commit("setItemData", {});
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
