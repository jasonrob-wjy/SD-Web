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
              <Icon type="ios-list-box" />
            </div>
            <div class="header__info">
              <span>
                <h2>项目列表</h2>
                <p>这里将展示所有的{{$route.query.title}}项目，可以根据需求切换不同的版本进行部署发布。</p>
              </span>
            </div>
          </div>

          <!-- <div class="header__control">
            <RadioGroup v-model="theme" type="button">
              <Radio label="全部"></Radio>
              <Radio label="我创建的"></Radio>
              <Radio label="我加入的"></Radio>
            </RadioGroup>
          </div>-->
        </div>
      </div>
    </header>
    <section>
      <div>
        <!-- <div class="query">
      <div class="select">
        <label>创建者</label>
        <Select v-model="authorVal" clearable @on-change="handleQuery" style="width:90px">
          <Option v-for="item in cityList1" :value="item.name" :key="item.name">{{ item.name }}</Option>
        </Select>
        <label>状态</label>
        <Select v-model="publishVal" clearable @on-change="handleQuery" style="width:90px">
          <Option v-for="(item,i) in cityList2" :value="item.value" :key="i+'s'">{{ item.name }}</Option>
        </Select>
      </div>
      <div class="search-mar">
        <Input
          v-model="titleVal"
          search
          enter-button
          @on-search="handleQuery"
          placeholder="请输入版本号..."
        />
        <Button type="success" ghost @click.stop="setIsShow">+ 新建部署</Button>
      </div>
        </div>-->
        <div>
          <div class="content">
            <Table border :columns="columns" :data="content">
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
                <!-- <a :href="$url + row.webUrl" target="_blank">{{  }}</a> -->
              </template>
              <template slot-scope="{ row }" slot="mode">
                <span>{{row.mode!='1'?'静态部署':'自动部署'}}</span>
              </template>
              <template slot-scope="{ row }" slot="action">
                <Button
                  v-if="row.idDeployment=='yes'"
                  @click="handleShow(row)"
                  type="success"
                  size="small"
                >访问项目</Button>
                <Button v-else type="primary" size="small" @click="handleDeploy(row)">部署项目</Button>
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
          <!-- <div class="load-more" @click="handleMore" v-if="mark">
				<p>
					<Icon type="ios-arrow-dropdown" size="18"/>
					<span>加载更多</span>
					<Icon type="ios-arrow-dropdown" size="18"/>
				</p>
			</div>
			<div v-else class="load-more">
				<p>
					<span>没有更多啦！</span>
				</p>
          </div>-->
        </div>
        <!-- 加载动画 -->
        <!-- <div v-else class="web-box demo-spin-col">
			<i class="fa fa-spinner fa-pulse"></i>
        </div>-->
        <!-- 新建静态部署 -->
        <!-- <AddComponent
      v-if="isOpen"
      :typeArr="typeArr"
      :classArr="cityList3"
      ref="addChart"
      @on-change="setIsShow"
        />-->
      </div>
      <Modal v-model="isToLogin" width="360" @on-cancel="handleToLogin">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>权限提示</span>
        </p>
        <div style="text-align:center">
          <p>由于您不是注册用户，暂无权执行此操作，请注册登录后操作！</p>
        </div>
        <div slot="footer">
          <Button
            type="info"
            size="large"
            long
            @click="handleLoginModal"
          >我要去注册</Button>
        </div>
      </Modal>
    </section>
  </div>
</template>

<script>
// import AddComponent from "./AddComponent";

export default {
  name: "tablePage",
  // components: {
  //   AddComponent
  // },
  data: () => ({
    pageNo: 1,
    pageSize: 10,
    total: 10,
    isToLogin: false,
    columns: [
      {
        title: "项目名称",
        width: 180,
        slot: "projectName"
      },
      {
        title: "版本号",
        width: 100,
        slot: "version"
      },
      {
        title: "发布者",
        width: 85,
        key: "author"
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
        width: 110
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
    itemData: [], //当前部署版本
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
        projectName: this.$route.query.title
      };
      this.$axios
        .get("/api/deploy/edition/get", { params: data })
        .then(res => {
          if (res.data.result) {
            this.content = res.data.list;

            //        this.content = data.content;
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
      if (this.user.name !== "Admin") {
        let uidArr = [];
        this.content.forEach(item => {
          if (item.idDeployment === "yes") {
            uidArr.push(item.bid);
          }
        });
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
          uidArr: JSON.stringify(uidArr)
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
      } else {
        this.isToLogin = true;
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
    handleToLogin() {
      this.isToLogin = false;
    },
    handleLoginModal() {
      window.sessionStorage.clear();
      this.$store.commit("setUser", {});
      this.$router.push({ path: "/login" });
    },
    // ********************************************************
    setData(data) {
      this.content = data.content;
      this.itemData = data.content.filter(item => {
        return item.idDeployment == "yes";
      });
      this.total = data.total;
    },
    // 访问站点
    handleShow(e) {
      window.open(this.$url + e.webUrl);
    },

    onChange() {},
    //编辑列表数据
    // setAiIsShow() {
    // 	this.isOpen = true;
    // 	this.$event.emit("isOpenAdd", this.content[0]);
    // },
    setIsShow() {
      this.isOpen = true;
      this.$event.emit("isOpenAdd", this.content[0]);
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
    getUser() {
      this.$axios
        .get("/api/person/user")
        .then(res => {
          if (res.data.result) {
            this.cityList1 = res.data.data;
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
    handleQuery() {
      this.$emit("on-reset", {
        author: this.authorVal,
        idDeployment: this.publishVal,
        version: this.titleVal
      });
    }
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