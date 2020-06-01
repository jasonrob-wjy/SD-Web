<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/logo15.png" />
    </div>
    <div class="warp" :class="[loginVal?'':'login-in']">
      <div class="left">Web Deploy 2.0</div>
      <div class="right">
        <!-- <h2 v-if="!loginVal">用户登录</h2>
        <h2 v-else>用户注册</h2>-->
        <h1>前端自动化部署平台</h1>
        <div class="login-top">
          <div class="in-box">
            <!-- <span>用户名</span> -->
            <input type="text" v-model="userName" placeholder="请输入用户名..." />
            <Icon type="md-person" />
          </div>
          <label class="error" v-if="isuserName">
            <span>
              <Icon type="md-information-circle" />请填写正确的手机动态码！
            </span>
          </label>
        </div>
        <div v-if="rEmail">
          <div class="in-box">
            <!-- <span>密码</span> -->
            <input type="password" v-model="userPass" placeholder="请输入密码..." />
            <Icon type="ios-unlock" />
          </div>
          <!-- <label class="error" v-if="isuserPass">
            <span>
              <Icon type="md-information-circle" />请填写正确的手机动态码！
            </span>
          </label>-->
        </div>
        <div v-if="loginVal">
          <div class="in-box">
            <!-- <span>确认密码</span> -->
            <input type="password" v-model="userPass1" placeholder="请输入确认密码..." />
            <Icon type="ios-unlock" />
          </div>
          <label class="error" v-if="(userPass1!=userPass)&&userPass1">
            <span>
              <Icon type="md-information-circle" />确认密码与密码不一致，请重新输入！
            </span>
          </label>
        </div>
        <!-- 注册邮箱 -->
        <div v-if="loginVal">
          <div class="in-box">
            <input type="text" v-model="email" style="padding-right:60px;" placeholder="请输入您的邮箱..." />
            <Icon type="ios-mail" />
            <div class="getemail">
              <span @click="sendCode" v-if="isSendCode">获取验证码</span>
              <span v-else>重新获取（{{count}}）</span>
            </div>
          </div>
        </div>
        <!-- 重置邮箱 -->
        <div v-if="!rEmail">
          <div class="in-box">
            <input
              type="text"
              v-model="emailVal"
              style="padding-right:60px;"
              placeholder="请输入邮箱..."
            />
            <Icon type="ios-mail" />
          </div>
        </div>
        <div v-if="loginVal">
          <div class="in-box">
            <!-- <span>验证码</span> -->
            <input type="text" v-model="code" placeholder="请输入验证码..." />
            <Icon type="ios-unlock" />
          </div>
          <label class="error" v-if="isuserPass">
            <span>
              <Icon type="md-information-circle" />验证码错误！
            </span>
          </label>
        </div>
        <!-- 注册 -->
        <div v-if="loginVal">
          <p>
            <span></span>
            <span>
              已有账号？
              <a href="javascript:void(0);" @click="handleLoginVal">去登录</a>
            </span>
          </p>
          <div class="button" @click="handleLogin">
            <span>注册</span>
            <Icon type="ios-loading" size="18" class="demo-spin-icon-load" v-if="loading"></Icon>
          </div>
        </div>
        <!-- 登录 -->
        <div v-else>
          <div v-if="rEmail">
            <p class="wjmm">
              <span>
                还没账号？
                <a href="javascript:void(0);" @click="handleLoginVal">去注册</a>
              </span>
              <span>
                <a href="javascript:void(0);" @click="resetMailbox">忘记密码？</a>
              </span>
            </p>
            <div class="button" @click="handleSubmit">
              <span>登录</span>
              <Icon type="ios-loading" size="18" class="demo-spin-icon-load" v-if="loading"></Icon>
            </div>
          </div>
          <!-- 重置密码 -->
          <div v-else>
            <p class="wjmm">
              <span>
                已有账号？
                <a href="javascript:void(0);" @click="resetMailbox">去登录</a>
              </span>
            </p>
            <div class="button" @click="setResetMailbox">
              <span style="letter-spacing:1px;">重置密码</span>
              <Icon type="ios-loading" size="18" class="demo-spin-icon-load" v-if="loading"></Icon>
            </div>
          </div>
          <div class="login-oauth">
            <div class="oauth-title">
              <span>其他方式登录</span>
            </div>
            <ul>
              <li @click="giteeClick">
                <img src="../../assets/gitee.png" />
              </li>
              <li @click="githubClick">
                <i class="fa fa-github"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 账号密码 -->
      <p class="moren"><span>账号：admin</span><span>密码：123456</span></p>
    </div>
    <div class="bolang">
      <svg class="waves" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g class="parallax">
          <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
          <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    loading: false,
    isuserPass: false,
    userPass: "",
    isuserName: false,
    userName: "",
    code: "",
    email: "",
    emailVal: "",
    userPass1: "",
    isSendCode: true,
    count: 59,
    loginVal: false,
    rEmail: true
  }),
  props: {
    msg: String
  },
  watch: {
    userPass1(val) {
      if (this.userPass != val) {
      }
    }
  },
  created() {
    // 获取url里面的code
    var code = this.getUrlData("code") || "";
    if (code) {
      this.$Message.loading({
        content: "登录中，请稍后...",
        duration: 0
      });
      switch (window.sessionStorage.getItem("type")) {
        case "gitee":
          this.$axios
            .post("/api/person/oauth/gitee", this.$qs.stringify({ code }))
            .then(res => {
              this.$Message.destroy();
              if (res.data.result) {
                this.userName = res.data.data.name;
                this.userPass = res.data.data.password;
                this.handleSubmit();
              } else {
                this.$Message["error"]({
                  background: true,
                  content: "登录失败，请重新登录！"
                });
              }
            })
            .catch(function(error) {
              this.$Message.destroy();
              this.$Message["error"]({
                background: true,
                content: "登录失败，请重新登录！"
              });
            });
          break;
        case "github":
          this.$axios
            .post("/api/person/oauth/github", this.$qs.stringify({ code }))
            .then(res => {
              this.$Message.destroy();
              if (res.data.result) {
                this.userName = res.data.data.name;
                this.userPass = res.data.data.password;
                this.handleSubmit();
              } else {
                this.$Message["error"]({
                  background: true,
                  content: "登录失败，请重新登录！"
                });
              }
            })
            .catch(function(error) {
              this.$Message.destroy();
              this.$Message["error"]({
                background: true,
                content: "登录失败，请重新登录！"
              });
            });
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    // this.getBidData();
  },
  methods: {
    handleClear() {
      this.isuserPass = false;
      this.userPass = "";
      this.userPass1 = "";
      this.isuserName = false;
      this.userName = "";
      this.code = "";
      this.email = "";
      this.isSendCode = true;
      this.loginVal = false;
      this.rEmail = true;
    },
    resetMailbox() {
      this.rEmail = !this.rEmail;
    },
    //发送验证码
    sendCode() {
      this.$Message.destroy();
      let data = {
        mark: 0,
        email: this.email,
        name: this.userName
      };
      if (!this.email) {
        this.$Message["error"]({
          background: true,
          content: "请输入邮箱地址！"
        });
        return;
      }
      if (!this.checkEmail(this.email)) {
        this.$Message["error"]({
          background: true,
          content: "请正确输入邮箱地址！"
        });
        return;
      }
      if (!this.userName) {
        this.$Message["error"]({
          background: true,
          content: "请输入用户名！"
        });
        return;
      }

      this.$axios
        .post("/api/person/user/login", this.$qs.stringify(data))
        .then(res => {
          if (res.data.result) {
            this.isSendCode = false;
            let time = window.setInterval(() => {
              this.count = this.count - 1;
              if (this.count === 0) {
                this.isSendCode = true;
                this.count = 59;
                window.clearInterval(time);
              }
            }, 1000);
            this.$Message["success"]({
              background: true,
              content: "验证码已发送，请注意查收！"
            });
          } else {
            this.$Message["error"]({
              background: true,
              content: "验证码发送失败！"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkEmail(val) {
      let reg = new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);
      return reg.test(val);
    },
    // 登录
    handleSubmit() {
      this.$Message.destroy();
      let data = {
        name: this.userName,
        pass: this.userPass
      };
      if (!this.userName) {
        this.$Message["error"]({
          background: true,
          content: "请输入用户名！"
        });
        return;
      }
      // if (this.isChinese(this.userName)) {
      //   this.$Message["error"]({
      //     background: true,
      //     content: "请输入真实姓名！"
      //   });
      //   return;
      // }

      if (!this.userPass) {
        this.$Message["error"]({
          background: true,
          content: "请输入密码！"
        });
        return;
      }
      this.loading = true;
      this.$axios
        .post("/api/person/user/login", this.$qs.stringify(data))
        .then(res => {
          this.loading = false;
          if (res.data.result) {
            window.sessionStorage.clear();
            window.sessionStorage.setItem("state", "true");
            let user = res.data.content;
            user.url =
              user.url.indexOf("http") > -1 ? user.url : this.$url + user.url;
            this.$store.commit("setUser", user);
            this.handleClear();
            this.$router.push({ path: "/" });
          } else {
            window.sessionStorage.setItem("state", false);
            this.$Message["error"]({
              background: true,
              content: "登录失败，请重新登录！"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 注册
    handleLogin() {
      this.$Message.destroy();
      let data = {
        name: this.userName,
        password: this.userPass,
        email: this.email,
        code: this.code
      };

      if (!this.userName) {
        this.$Message["error"]({
          background: true,
          content: "请输入用户名！"
        });
        return;
      }
      // if (this.isChinese(this.userName)) {
      //   this.$Message["error"]({
      //     background: true,
      //     content: "请输入真实姓名！"
      //   });
      //   return;
      // }
      if (!this.userPass) {
        this.$Message["error"]({
          background: true,
          content: "请输入密码！"
        });
        return;
      }
      if (!this.email) {
        this.$Message["error"]({
          background: true,
          content: "请输入邮箱地址！"
        });
        return;
      }
      if (!this.checkEmail(this.email)) {
        this.$Message["error"]({
          background: true,
          content: "请正确输入邮箱地址！"
        });
        return;
      }
      if (!this.code) {
        this.$Message["error"]({
          background: true,
          content: "请输入验证码！"
        });
        return;
      }
      // this.$Message.loading({
      //   content: "注册中，请稍后...",
      //   duration: 0
      // });
      this.loading = true;
      this.$axios
        .post("/api/person/user", this.$qs.stringify(data))
        .then(res => {
          this.$Message.destroy();
          this.loading = false;
          if (res.data.result) {
            this.handleClear();
            this.$Message["success"]({
              background: true,
              content: "注册成功，请登录！"
            });
            this.loginVal = false;
          } else {
            if (res.data.mas) {
              this.$Message["error"]({
                background: true,
                content: "验证码不正确，请重新输入！"
              });
            } else if (res.data.mark) {
              this.$Message["error"]({
                background: true,
                content: "您已注册，请直接登录！"
              });
              this.handleClear();
              this.loginVal = false;
            } else {
              this.$Message["error"]({
                background: true,
                content: "注册失败！"
              });
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setResetMailbox() {
      this.$Message.destroy();
      if (!this.userName) {
        this.$Message["error"]({
          background: true,
          content: "请输入用户名！"
        });
        return;
      }
      if (!this.emailVal) {
        this.$Message["error"]({
          background: true,
          content: "请输入邮箱地址！"
        });
        return;
      }
      if (!this.checkEmail(this.emailVal)) {
        this.$Message["error"]({
          background: true,
          content: "请正确输入邮箱地址！"
        });
        return;
      }
      let data = {
        name: this.userName,
        email: this.emailVal
      };
      this.loading = true;
      this.$axios
        .post("/api/person/user/reset", this.$qs.stringify(data))
        .then(res => {
          this.loading = false;
          if (res.data.result) {
            this.$Message["success"]({
              background: true,
              content: "密码已发至您的邮箱，请注意查收！"
            });
            this.resetMailbox();
          } else {
            this.$Message["error"]({
              background: true,
              content: "用户名或邮箱错误，请重新输入！"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleLoginVal() {
      this.loginVal = !this.loginVal;
    },
    isChinese(temp) {
      let re = /.*[\u4e00-\u9fa5]+.*$/;
      if (re.test(temp)) return false;
      return true;
    },

    // 第三方GitHub登录 github登录点击事件
    githubClick() {
      this.$Message.destroy();
      this.$Message.loading({
        content: "授权中，请稍后...",
        duration: 0
      });
      window.sessionStorage.setItem("type", "github");
      // window.location.href = `https://github.com/login/oauth/authorize?client_id=8b089dc0bdefbbfc7d95&redirect_uri=${window
      window.location.href = `https://github.com/login/oauth/authorize?client_id=597827f3b2327150f3d7&redirect_uri=${window
        .location.origin + window.location.pathname}`;
    },
    // 第三方Gitee登录 gitee登录点击事件
    giteeClick() {
      this.$Message.destroy();
      this.$Message.loading({
        content: "授权中，请稍后...",
        duration: 0
      });
      window.sessionStorage.setItem("type", "gitee");
      // window.location.href = `https://gitee.com/oauth/authorize?client_id=f8747cff265598b49d5490eec1b922e362c99a332e2ba5592124af3a98884464&redirect_uri=${window
      window.location.href = `https://gitee.com/oauth/authorize?client_id=e4762d9e0e22e30c129ba61b235a1bfafcefbb5b58e46e2301c15ae6c514e0be&redirect_uri=${window
        .location.origin + window.location.pathname}&response_type=code`;
    },
    getUrlData(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>