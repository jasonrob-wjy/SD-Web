<template>
  <div class="login">
    <div class="logo">Web Deploy</div>
    <div class="warp">
      <h2 v-if="!loginVal">用户登录</h2>
      <h2 v-else>用户注册</h2>
      <div>
        <div class="in-box">
          <span>用户名</span>
          <input type="text" v-model="userName" />
          <Icon type="md-person" />
        </div>
        <label class="error" v-if="isuserName">
          <span>
            <Icon type="md-information-circle" />请填写正确的手机动态码！
          </span>
        </label>
      </div>
      <div>
        <div class="in-box">
          <span>密码</span>
          <input type="password" v-model="userPass" />
          <Icon type="ios-unlock" />
        </div>
        <label class="error" v-if="isuserPass">
          <span>
            <Icon type="md-information-circle" />请填写正确的手机动态码！
          </span>
        </label>
      </div>
      <div v-if="loginVal">
        <div class="in-box">
          <span>确认密码</span>
          <input type="password" v-model="userPass1" />
          <Icon type="ios-unlock" />
        </div>
        <label class="error" v-if="(userPass1!=userPass)&&userPass1">
          <span>
            <Icon type="md-information-circle" />确认密码与密码不一致，请重新输入！
          </span>
        </label>
      </div>
      <div v-if="loginVal">
        <div class="in-box">
          <span>邮箱</span>
          <input type="text" v-model="email" style="padding-right:60px;" />
          <Icon type="ios-mail" />
          <div class="getemail">
            <span @click="sendCode" v-if="isSendCode">获取验证码</span>
            <span v-else>重新获取（{{count}}）</span>
          </div>
        </div>
        <label class="error" v-if="isuserPass">
          <span>
            <Icon type="md-information-circle" />请填写正确的手机动态码！
          </span>
        </label>
      </div>
      <div v-if="loginVal">
        <div class="in-box">
          <span>验证码</span>
          <input type="text" v-model="code" />
          <Icon type="ios-unlock" />
        </div>
        <label class="error" v-if="isuserPass">
          <span>
            <Icon type="md-information-circle" />请填写正确的手机动态码！
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
        </div>
      </div>
      <!-- 登录 -->
      <div v-else>
        <p>
          <span>
            还没账号？
            <a href="javascript:void(0);" @click="handleLoginVal">去注册</a>
          </span>
          <span>忘记密码？</span>
        </p>
        <div class="button" @click="handleSubmit">
          <span>登录</span>
        </div>
      </div>
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
    isuserPass: false,
    userPass: "123456",
    isuserName: false,
    userName: "Admin",
    code: "",
    email: "",
    userPass1: "",
    isSendCode: true,
    count: 59,
    loginVal: false
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
  created() {},
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

    // 登录
    handleSubmit(val) {
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
      this.$axios
        .post("/api/person/user/login", this.$qs.stringify(data))
        .then(res => {
          if (res.data.result) {
            window.sessionStorage.setItem("state", "true");
            this.$store.commit("setUser", res.data.content);
            this.handleClear();
            this.$router.push({ path: "/" });
          } else {
            window.sessionStorage.setItem("state", false);
            this.$Message["error"]({
              background: true,
              content: "登录失败！"
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
      if (!this.code) {
        this.$Message["error"]({
          background: true,
          content: "请输入验证码！"
        });
        return;
      }
      this.$Message.loading({
        content: "注册中，请稍后...",
        duration: 0
      });
      this.$axios
        .post("/api/person/user", this.$qs.stringify(data))
        .then(res => {
          this.$Message.destroy();
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
                content: "你已经注册，请直接登录！"
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
    handleLoginVal() {
      this.loginVal = !this.loginVal;
    },
    isChinese(temp) {
      let re = /.*[\u4e00-\u9fa5]+.*$/;
      if (re.test(temp)) return false;
      return true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>