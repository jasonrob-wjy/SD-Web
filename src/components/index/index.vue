<template>
  <div>
    <header class="header__content" style="position: relative; overflow: hidden;">
      <div class="spots">
        <span
          class="decorate"
          style="background: rgb(201, 27, 0); width: 51px; height: 51px; margin-top: -25.5px; margin-left: -25.5px; top: 55.6675%; left: 5%;"
        ></span>
        <span
          class="decorate"
          style="background: rgb(23, 90, 171); width: 28px; height: 28px; margin-top: -14px; margin-left: -14px; top: 10.2246%; left: 15%;"
        ></span>
        <span
          class="decorate"
          style="background: rgb(233, 34, 36); width: 37px; height: 37px; margin-top: -18.5px; margin-left: -18.5px; top: 71.9133%; left: 25%;"
        ></span>
        <span
          class="decorate"
          style="background: rgb(0, 62, 135); width: 47px; height: 47px; margin-top: -23.5px; margin-left: -23.5px; top: 22.8839%; left: 35%;"
        ></span>
        <span
          class="decorate"
          style="background: rgb(0, 135, 231); width: 31px; height: 31px; margin-top: -15.5px; margin-left: -15.5px; top: 5.09172%; left: 45%;"
        ></span>
        <span
          class="decorate"
          style="background: rgb(23, 90, 171); width: 52px; height: 52px; margin-top: -26px; margin-left: -26px; top: 32.1525%; left: 55%;"
        ></span>
        <span
          class="decorate"
          style="background: rgb(255, 86, 0); width: 29px; height: 29px; margin-top: -14.5px; margin-left: -14.5px; top: 46.8035%; left: 65%;"
        ></span>
        <span
          class="decorate"
          style="width: 44px; height: 44px; margin-top: -22px; margin-left: -22px; top: 97.8537%; left: 75%;"
        ></span>
        <span
          class="decorate"
          style="background: rgb(201, 27, 0); width: 43px; height: 43px; margin-top: -21.5px; margin-left: -21.5px; top: 30.7088%; left: 85%;"
        ></span>
        <span
          class="decorate"
          style="width: 27px; height: 27px; margin-top: -13.5px; margin-left: -13.5px; top: 7.43497%; left: 95%;"
        ></span>
      </div>
      <div class="container">
        <div class="he-row">
          <div class="header_left">
            <div class="logo">
              <Icon type="md-cube" />
            </div>
            <div class="header__info">
              <span>
                <h2>工作台</h2>
                <p>这里将展示你的个人项目，当然也包括协同项目。</p>
              </span>
            </div>
          </div>

          <div class="header__control">
            <RadioGroup v-model="qurey" type="button" @on-change="handleOnChange">
              <Radio label="全部"></Radio>
              <Radio label="我创建的"></Radio>
              <Radio label="我收藏的"></Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
    </header>
    <section>
      <div>
        <transition name="fade">
          <ul class="box" v-if="projectData.length">
            <li v-for="item in projectData" :key="item.bid">
              <div class="icon">
                <Icon
                  type="ios-star-outline"
                  size="26"
                  v-if="item.collect=='0'"
                  @click="handleStar(item.bid,'1')"
                />
                <Icon type="ios-star" size="26" v-else @click="handleStar(item.bid,'0')" />
              </div>
              <h2 @click="handleRouter('/addpage',item.projectName,item)">{{item.projectName}}</h2>
              <p>
                <Icon type="ios-code-working" size="20" />
                <span>{{item.version}}</span>
              </p>
              <p>
                <Icon type="ios-settings-outline" size="18" />
                <span>{{item.mode=="0"?"静态部署":"自动部署"}}</span>
              </p>
              <p>
                <Icon type="ios-time-outline" size="18" />
                <span>{{item.time}}</span>
              </p>
              <div class="description">{{item.remark}}</div>
              <div class="bottom-list">
                <Tooltip
                  content="访问"
                  placement="top"
                  class="border-r-no"
                  @click.native="handleHref($url + item.webUrl)"
                >
                  <Icon type="md-open" size="20" />
                </Tooltip>
                <Tooltip
                  content="复制链接"
                  placement="top"
                  class="border-r-no"
                  v-clipboard:copy="$url + item.webUrl"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <Icon type="ios-link" size="20" />
                </Tooltip>
                <Tooltip
                  content="删除"
                  placement="top"
                  class="border-r-no"
                  @click.native="handleDelete(item.projectName)"
                >
                  <Icon type="ios-trash" size="20" />
                </Tooltip>
                <Tooltip
                  content="项目列表"
                  placement="top"
                  @click.native="handleRouter('/tablePage',item.projectName)"
                >
                  <Icon type="ios-list-box-outline" size="20" />
                </Tooltip>
              </div>
            </li>
          </ul>
        </transition>

        <!-- 无数据时展示的内容 -->
        <div class="placeholder" v-show="!projectData.length">
          <i class="ivu-icon ivu-icon-happy-outline"></i>
          <p>暂无内容哦，快去创建项目吧！</p>
        </div>
        <!-- 右下角添加按钮 -->
        <div class="em-add" @click="handleRouter('/addpage')">
          <Icon type="md-add" />
        </div>

        <!-- 删除弹窗 -->
        <Modal v-model="isDelete" width="360" @on-cancel="handleCancel">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除确认</span>
          </p>
          <div style="text-align:center">
            <p>
              出于某些原因，删除也许会失败。但如果你执意删除，必须知道此操作无法撤消，这将永久删除。
              <br />请输入项目名称以进行确认。
            </p>
            <AutoComplete
              v-model="projectNameInput"
              @on-search="handleSearch"
              placeholder="请输入要删除的项目名称..."
              style="width: 98%;margin-top:15px;"
            >
              <Option v-for="item in projectNameArr" :value="item" :key="item">{{ item }}</Option>
            </AutoComplete>
          </div>
          <div slot="footer">
            <Button
              type="error"
              size="large"
              long
              :disabled="buttonDisabled"
              @click="handleDelModal"
            >确认删除</Button>
          </div>
        </Modal>
        <!-- 权限控制 -->
        <Modal v-model="isToLogin" width="360" @on-cancel="handleToLogin">
          <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>权限提示</span>
          </p>
          <div style="text-align:center">
            <p>由于您不是注册用户，暂无权执行此操作，请注册登录后操作！</p>
          </div>
          <div slot="footer">
            <Button type="info" size="large" long @click="handleLoginModal">我要去注册</Button>
          </div>
        </Modal>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "projectlist",
  // props: {
  //   msg: String
  // },
  data: () => ({
    projectData: [],
    qurey: "全部",
    authorId: "",
    collect: "",
    projectName: "",
    projectNameInput: "",
    projectNameArr: [],
    isDelete: false,
    buttonDisabled: true,
    isToLogin: false,
    user: {}
  }),
  mounted() {
    this.$Message.destroy();
    this.user = this.$store.state.variable.info;
    this.handleGetData();
    this.$event.on("input", val => {
      this.projectName = val;
      this.handleGetData();
    });
  },
  methods: {
    handleGetData() {
      // this.$Message.destroy();
      let data = {
        // pageNo: this.pageNo,
        // pageSize: this.pageSize
        // pageSize: this.pageSize
        idDeployment: "yes"
      };
      if (this.authorId) {
        data.authorId = this.authorId;
      }
      if (this.collect) {
        data.collect = this.collect;
      }
      if (this.projectName) {
        data.projectName = this.projectName;
      }
      this.$axios
        .get("/api/deploy/edition/get", { params: data })
        .then(res => {
          if (res.data.result) {
            this.projectData = res.data.list;
            this.projectNameArr = res.data.project;
            this.$store.commit("setProjectTitleArr", res.data.project);
          } else {
            this.$Message["error"]({
              background: true,
              content: "数据请求失败！"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleOnChange(key) {
      // this.noauthorId = false;
      this.authorId = "";
      this.collect = "";
      this.handleCancel();
      // this.$event.emit("inputClear", "");
      switch (key) {
        case "我创建的":
          this.authorId = this.user.bid;
          break;
        case "我收藏的":
          this.collect = "1";
           this.authorId = this.user.bid;
          break;
        default:
          break;
      }

      this.handleGetData();
    },
    handleStar(bid, collect) {
      this.$axios
        .post(
          "/api/deploy/edition/update",
          this.$qs.stringify({ bid, collect })
        )
        .then(res => {
          let message = collect == "1" ? "收藏成功！" : "已取消收藏！";
          this.$Message.destroy();
          if (res.data.result) {
            this.$Message["success"]({
              background: true,
              content: message
            });
            this.handleGetData();
          } else {
            this.$Message["error"]({
              background: true,
              content: "操作失败！"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleSearch(val) {
      this.projectNameInput = val;
      if (val && this.projectName === val) {
        this.buttonDisabled = false;
      } else {
        this.buttonDisabled = true;
      }
    },
    handleCancel() {
      this.projectName = "";
      this.projectNameInput = "";
      this.buttonDisabled = true;
    },
    handleDelModal() {
      this.$Message.destroy();
      this.$axios
        .post(
          "/api/deploy/edition/delete",
          this.$qs.stringify({ projectName: this.projectNameInput })
        )
        .then(res => {
          if (res.data.result) {
            this.$Message["success"]({
              background: true,
              content: "删除成功！"
            });
            this.isDelete = false;
            this.handleCancel();
            this.handleGetData();
          } else {
            this.$Message["error"]({
              background: true,
              content: "删除失败！"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete(projectName) {
      if (this.user.name === "Admin") {
        this.isToLogin = true;
      } else {
        this.isDelete = true;
        this.projectName = projectName;
      }
    },
    handleRouter(path, val, data) {
      this.$store.commit("setItemData", data);
      this.$router.push({ path, query: { title: val } });
    },
    handleHref(url) {
      window.open(url);
    },
    onCopy() {
      this.$Message.destroy();
      this.$Message["success"]({
        background: true,
        content: "复制成功！"
      });
    },
    onError() {
      this.$Message.destroy();
      this.$Message["success"]({
        background: true,
        content: "复制失败！"
      });
    },
    handleToLogin() {
      this.isToLogin = false;
    },
    handleLoginModal() {
      window.sessionStorage.clear();
      this.$store.commit("setUser", {});
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

