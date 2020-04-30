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
              <Icon type="ios-home" />
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
      <transition name="fade" mode="out-in">
        <ul class="box" v-show="projectData.length">
          <li v-for="item in projectData" :key="item.bid">
            <div class="icon">
              <Icon type="ios-star-outline" size="24" />
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
              <Tooltip content="删除" placement="top" class="border-r-no">
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

      <div class="em-add" @click="handleRouter('/addpage')">
        <Icon type="md-add" />
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
    author: "",
    user: {}
  }),
  mounted() {
    this.user = this.$store.state.variable.info;
    this.handleGetData();
  },
  methods: {
    handleGetData() {
      this.$Message.destroy();
      let data = {
        // pageNo: this.pageNo,
        // pageSize: this.pageSize
        // pageSize: this.pageSize
        idDeployment: "yes"
      };
      if (this.author) {
        data.author = this.author;
      }
      this.$axios
        .get("/api/deploy/edition/get", { params: data })
        .then(res => {
          if (res.data.result) {
            this.projectData = res.data.list;
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
      switch (key) {
        case "我创建的":
          this.author = this.user.name;
          break;
        case "我收藏的":
          this.author = "";
          break;

        default:
          this.author = "";
          break;
      }

      this.handleGetData();
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

