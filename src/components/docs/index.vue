<template>
  <div>
    <header class="header__content" style="position: relative; overflow: hidden;">
      <Decorate/>
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
        <h2>Web Deploy</h2>
        <p>Web Deploy 简称（WD）是一个可视化，并且能快速部署前端界面的自动化服务，可以有效缩短前端界面的部署时间，相比家喻户晓的 Jenkins 来说更简洁、更轻量、部署时间更快速、不需要设置过多的配置项等，另外，如果使用过程中有任何问题，那么请一定要记得反馈哦。</p>
        <h2>初识 WD</h2>
        <div>
          <p>1、项目的创建、访问、删除、迭代以及项目的版本回退部署和访问等功能。</p>
          <p>2、部署创建分为静态部署和自动部署这两种部署异同如下：</p>
          <ul>
            <li>★ 静态部署：这种部署适用于一些静态资源的部署；</li>
            <li>★ 自动部署：这种部署方式适用于使用脚手架开发的项目（vue-cli3.0支持最佳）；</li>
          </ul>
          <p>3、登录用户信息更新，支持用户名、密码、邮箱地址的修改（暂不支持密码找回）；</p>
        </div>
        <h2>操作方法</h2>
        <div>
          <h4>自动化部署</h4>
          <div>
            <p>第一步：填写（选择）项目名称；</p>
            <p>第二步：上传你的静态文件夹；</p>
            <p>第三步：选择是否立即部署；</p>
            <p>第三步：点击提交部署即可；</p>
          </div>
          <h4>自动化部署</h4>
          <div>
            <p>第一步：在 GitLib 打开路径： 项目仓库 -> Settings -> Webhooks -> Add webhook；</p>
            <p>第二步：在 Target URL 中填入 http://10.0.88.46:82/api/deploy/git 地址；</p>
            <p>第三步：POST Content Type 选择 apppcation/json；</p>
            <p>第四步：在 Secret 中填入项目名称（与所属项目保持一致）；</p>
            <p>第五步：Trigger On 选择 Push Events；</p>
            <p>注意：若使用 vue-cli3.0 脚手架打包后上传 dist 文件夹时，需要在项目的 vue.config.js 文件中添加 publicPath: './（部署目录）' 配置项，然后打包上传。 例如： publicPath: './sc'，若使用自动化部署方式则忽略即可。</p>
          </div>
        </div>
        <!-- <h2>
         脚手架
        </h2>-->
      </div>
    </section>
  </div>
</template>
<script>
import Decorate from "../header/decorate";
export default {
  components: {
    Decorate
  },
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
