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
              <Icon type="ios-book" />
            </div>
            <div class="header__info">
              <span>
                <h2>说明文档</h2>
                <p>阅读文档能使你完全掌握本系统的使用。</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section>
      <div class="docs-page">
        <h1>Web Deploy</h1>
        <p>Web Deploy是一个可视化，并且能快速部署前端界面的自动化服务，可以有效缩短前端界面的部署时间，从而提高前端界面的部署效率，相比家喻户晓的Jenkins来说更轻量，另外，如果使用过程中有任何问题，那么请一定要记得反馈哦。</p>
        <h1>功能点包括</h1>
        <p>
          1、项目的创建、访问、删除、迭代以及项目的版本回退部署和访问等功能。
          <br />2、部署创建分为静态部署和自动部署这两种部署异同如下：
          <br />★ 静态部署：这种部署适用于一些静态资源的部署；
          <br />★ 自动部署：这种部署方式适用于非静态资源之类的大型项目，例如使用脚手架 Vue-cli 等开发的项目；
          <br />★ 开发中...；
        </p>
        <p></p>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  // components: {
  // },
  // computed: {
  // },
  data() {
    return {
      user: {}, //模式
      isName: true,
      isPassword: true,
      isEmail: true,

      name: "",
      password: "",
      qrpassword: "",
      newpassword: "",
      email: "",
      url: "",
      urlImg: "",
      bid: "",
      date: ""
      // ----------------------------------------------------
    };
  },
  watch: {
    qrpassword(val) {
      this.$Message.destroy();
      if (this.newpassword !== val) {
        this.$Message["error"]({
          background: true,
          content: "新密码与确认密码不一致！"
        });
      }
    }
  },

  mounted() {
    this.setUser();
  },
  methods: {
    setUser() {
      this.user = this.$store.state.variable.info;
      this.name = this.user.name;
      this.bid = this.user.bid;
      this.email = this.user.email;
      this.urlImg = this.$url + this.user.url;
      //   this.url = this.user.url;
      this.date = this.user.date;
    },
    handleOnChange(key) {
      this.$Message.destroy();
      let data = { bid: this.bid };
      switch (key) {
        case "yhmxg":
          this.isName = false;
          break;
        case "yhmqx":
          this.isName = true;
          break;
        case "yhmqd":
          this.$Message.loading({
            content: "用户名更新中，请稍后...",
            duration: 0
          });
          data.name = this.name;
          this.updateUser(data);
          this.isName = true;
          break;
        case "qrmmxg":
          this.isPassword = false;
          break;
        case "qrmmqx":
          this.isPassword = true;
          break;
        case "qrmmqd":
          this.$Message.loading({
            content: "用户密码更新中，请稍后...",
            duration: 0
          });
          data.password = this.qrpassword;
          this.updateUser(data);
          this.isPassword = true;
          this.password = "";
          this.qrpassword = "";
          this.newpassword = "";
          break;
        case "yxdzxg":
          this.isEmail = false;
          break;
        case "yxdzqx":
          this.isEmail = true;
          break;
        case "yxdzqd":
          this.$Message.loading({
            content: "邮箱地址更新中，请稍后...",
            duration: 0
          });
          data.email = this.email;
          this.updateUser(data);
          this.isEmail = true;
          break;

        default:
          break;
      }
    },
    updateUser(data) {
      this.$axios
        .post("/api/person/user/update", this.$qs.stringify(data))
        .then(res => {
          this.$Message.destroy();
          if (res.data.result) {
            this.$Message["success"]({
              background: true,
              content: "更新成功！"
            });
            this.getUser();
          } else {
            this.$Message["error"]({
              background: true,
              content: "更新失败！"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getUser() {
      this.$axios
        .get("/api/person/user/list", { params: { bid: this.bid } })
        .then(res => {
          this.$Message.destroy();
          if (res.data.result) {
            this.$Message["success"]({
              background: true,
              content: "用户名更新成功！"
            });
            this.$store.commit("setUser", res.data.data[0]);
            this.setUser();
          } else {
            this.$Message["error"]({
              background: true,
              content: "用户名更新失败！"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleFileSuccess(response, file, fileList) {
      console.log(response);
      //   data.url = this.email;
      this.updateUser({ bid: this.bid, url: "/" + response.fileInfo.path });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
