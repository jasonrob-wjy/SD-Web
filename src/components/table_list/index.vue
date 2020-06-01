<template>
  <div>
    <header class="header__content" style="position: relative; overflow: hidden;">
      <Decorate />
      <div class="container">
        <div class="he-row">
          <div class="header_left">
            <div class="logo">
              <Icon type="ios-list-box" />
            </div>
            <div class="header__info">
              <span>
                <h2>项目列表</h2>
                <p>这里将展示所有的{{$route.query.title}}项目，可以根据需求切换不同的版本进行部署发布。</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section>
      <div>
        <div>
          <div class="content">
            <Table border :columns="columns" :data="content">
              <template slot-scope="{ row }" slot="author">
                <div class="author">
                  <img :src="$url+row.url" :alt="row.author" />
                  <span>{{row.author}}</span>
                </div>
              </template>
              <template slot-scope="{ row }" slot="projectName">
                <Tooltip max-width="200" :content="row.projectName" placement="top">
                  <span class="nowrap">{{row.projectName}}</span>
                </Tooltip>
              </template>
              <template slot-scope="{ row }" slot="version">
                <span style="color: #FAB67B;">{{ row.version }}</span>
              </template>
              <template slot-scope="{ row }" slot="idDeployment">
                <span v-if="row.idDeployment=='yes'" style="color: #6CD1A7;">已部署</span>
                <span v-else style="color: #EC6C73;">未部署</span>
              </template>
              <template slot-scope="{ row }" slot="remark">
                <Tooltip max-width="200" :content="row.remark" placement="top">
                  <span class="nowrap">{{row.remark}}</span>
                </Tooltip>
              </template>
              <template slot-scope="{ row }" slot="webUrl">
                <span
                  v-if="row.idDeployment=='yes'"
                  class="copy1"
                  v-clipboard:copy="$url + row.webUrl"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >复制链接</span>
                <span v-else class="copy2">复制链接</span>
              </template>
              <template slot-scope="{ row }" slot="mode">
                <span>{{row.mode!='1'?'静态部署':'自动部署'}}</span>
              </template>
              <template slot-scope="{ row }" slot="action">
                <div class="error-bot">
                  <Button
                    v-if="row.idDeployment=='yes'"
                    @click="handleShow(row)"
                    type="success"
                    size="small"
                  >访问</Button>
                  <Button v-else type="primary" size="small" @click="handleDeploy(row)">部署</Button>
                  <Button
                    v-if="user.bid==row.authorId"
                    type="error"
                    size="small"
                    @click="handleDelecte(row)"
                  >删除</Button>
                </div>
              </template>
            </Table>
          </div>
          <div class="page">
            <Page
              class="page-warp"
              prev-text="上一页"
              next-text="下一页"
              show-elevator
              show-total
              :total="total"
              show-sizer
              @on-change="changePage"
              @on-page-size-change="changeSizePage"
            />
          </div>
        </div>
      </div>
    </section>
    <Modal v-model="isModel" width="360" @on-cancel="handleCancel">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>系统提示</span>
      </p>
      <div style="text-align:center">
        <p>此记录删除后将无法恢复，是否执行此次删除操作？</p>
      </div>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          long
          :loading="modal_loading"
          @click="handleDelecteModal"
        >确认删除</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Decorate from "../header/decorate";
export default {
  components: {
    Decorate
  },
  name: "tablePage",
  // components: {
  //   AddComponent
  // },
  data: () => ({
    pageNo: 1,
    pageSize: 10,
    total: 10,
    isModel: false,
    modal_loading: false,
    columns: [
      {
        title: "项目名称",
        width: 180,
        slot: "projectName"
      },

      {
        title: "创建者",
        width: 160,
        slot: "author"
      },
      {
        title: "版本号",
        width: 100,
        slot: "version"
      },
      {
        title: "状态",
        width: 80,
        slot: "idDeployment"
      },
      {
        title: "描述",
        // width: 170,
        slot: "remark"
      },
      {
        title: "创建时间",
        width: 170,
        key: "time"
      },
      {
        title: "部署模式",
        width: 100,
        slot: "mode"
      },
      {
        title: "访问链接",
        width: 110,
        slot: "webUrl"
      },
      {
        title: "操作",
        slot: "action",
        align: "center",
        width: 150
      }
    ],
    data6: [
      {
        name: "John Brown",
        age: 18,
        address: "New York No. 1 Lake Park"
      }
    ],
    content: [],
    itemData: {},
    isOpen: true,

    cityList1: [],
    cityList2: [
      { name: "已部署", value: "yes" },
      { name: "未部署", value: "no" }
    ],
    titleVal: "",
    authorVal: "",
    publishVal: "",
    user: {},
    // -----------------------------------------
    // isDetail: true,
    // mark: true,
    // author: "",
    // page: 1,
    typeArr: [],

    cityList3: [],
    // bid: "",

    classVal: ""

    // class: "", //通过类型判断 page 是否置1

    // bidData: {}
  }),
  props: {
    msg: String
  },
  mounted() {
    // this.author = this.$store.state.variable.user.name;
    // this.getData();
    // this.$event.on("on-success", e => {
    //   this.isOpen = false;
    // });
    // this.getUser();
    this.user = this.$store.state.variable.info;
    this.handleGetData();
  },
  methods: {
    handleGetData() {
      // this.$Message.destroy();
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        accurate: 1, //精确匹配
        projectName: this.$route.query.title
      };
      this.$axios
        .get("/api/deploy/edition/get", { params: data })
        .then(res => {
          if (res.data.result) {
            this.content = res.data.list;

            // this.content = data.content;
            // this.itemData = data.content.filter(item => {
            //   return item.idDeployment == "yes";
            // });
            this.total = res.data.total;
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
    //部署站点
    handleDeploy(e) {
      // 用户权限控制
      if (this.user.name === "admin") {
        this.$Notice.destroy();
        this.$Notice.error({
          title: "系统温馨提示",
          desc: "您不是注册用户，请注册登录后操作！"
        });
      } else {
        this.$Message.destroy();
        this.$Message.loading({
          content: "项目部署中，请稍后...",
          duration: 0
        });
        let data = {
          root: e.root,
          version: e.version,
          catalog: e.catalog,
          bid: e.bid,
          projectName: e.projectName
          // uidArr: JSON.stringify(uidArr)
        };
        this.$axios
          .post("/api/deploy/edition/transfer", this.$qs.stringify(data))
          .then(res => {
            this.$Message.destroy();
            if (res.data.result) {
              this.$Message["success"]({
                background: true,
                content: "项目部署成功！"
              });
              // this.$emit("on-reset", {});
              this.handleGetData();
            } else {
              this.$Message["error"]({
                background: true,
                content: "项目部署失败！"
              });
            }
          })
          .catch(function(error) {
            this.$Message.destroy();
            this.$Message["error"]({
              background: true,
              content: "项目部署失败！"
            });
          });
      }
    },
    changePage(event) {
      this.pageNo = event;
      this.handleGetData();
    },
    changeSizePage(event) {
      this.pageSize = event;
      this.handleGetData();
    },
    // handleToLogin() {
    //   this.isToLogin = false;
    // },
    // handleLoginModal() {
    //   window.sessionStorage.clear();
    //   this.$store.commit("setUser", {});
    //   this.$router.push({ path: "/login" });
    // },

    // 访问站点
    handleShow(e) {
      window.open(this.$url + e.webUrl + "/index.html");
    },
    handleCancel() {
      this.isModel = false;
    },
    handleDelecte(val) {
      this.itemData = val;
      this.isModel = true;
    },
    handleDelecteModal() {
      this.$Message.destroy();
      this.modal_loading = true;
      let data = {
        bid: this.itemData.bid,
        root: this.itemData.root,
        version: this.itemData.version,
        catalog: this.itemData.catalog
      };
      this.$axios
        .post("/api/deploy/edition/delete", this.$qs.stringify(data))
        .then(res => {
          if (res.data.result) {
            // this.cityList1 = res.data.data;
            this.handleGetData();
          } else {
            this.$Message["error"]({
              background: true,
              content: "数据删除失败！"
            });
          }
          this.modal_loading = false;
          this.isModel = false;
        })
        .catch(function(error) {
          console.log(error);
        });
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
    }
    // ********************************************************
    // setData(data) {
    //   this.content = data.content;
    //   this.itemData = data.content.filter(item => {
    //     return item.idDeployment == "yes";
    //   });
    //   this.total = data.total;
    // },

    // onChange() {},
    //编辑列表数据
    // setAiIsShow() {
    // 	this.isOpen = true;
    // 	this.$event.emit("isOpenAdd", this.content[0]);
    // },
    // setIsShow() {
    //   this.isOpen = true;
    //   this.$event.emit("isOpenAdd", this.content[0]);
    // },

    // getUser() {
    //   this.$axios
    //     .get("/api/person/user")
    //     .then(res => {
    //       if (res.data.result) {
    //         this.cityList1 = res.data.data;
    //       } else {
    //         this.$Message["error"]({
    //           background: true,
    //           content: "数据请求失败！"
    //         });
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    // handleQuery() {
    //   this.$emit("on-reset", {
    //     author: this.authorVal,
    //     idDeployment: this.publishVal,
    //     version: this.titleVal
    //   });
    // }
  }
};
</script>
<style lang="scss" >
.ivu-table {
  width: 100%;
}
</style>
<style lang="scss" scoped>
@import "./index.scss";
</style>