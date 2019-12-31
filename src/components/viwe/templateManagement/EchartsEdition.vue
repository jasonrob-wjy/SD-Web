<template>
  <div class="edition-warp">
    <div class="left">
      <div class="menu">
        <div class="me-left"></div>
        <ol class="me-right">
          <li @click="handleTab('a')" :class="[action==='a'?'action':'']">代码编辑</li>
          <li @click="handleTab('b')" :class="[action==='b'?'action':'']">主题编辑</li>
          <li @click="handleTab('c')" :class="[action==='c'?'action':'']">API编辑</li>
        </ol>
      </div>
      <ul class="tab">
        <li v-show="action==='a'">
          <AceEditor />
        </li>
        <li v-show="action==='b'">
          <AceEditor />
        </li>
        <li v-show="action==='c'">
          <AceEditor />
        </li>
      </ul>
      <!-- 按钮 -->
      <div class="handle-box">
        <div class="button">
          <span>
            <Icon type="ios-play-outline" size="20" />
            <span>运行</span>
          </span>
          <span>
            <Icon type="ios-cloud-upload-outline" size="18" />
            <span>保存</span>
          </span>
          <span>
            <Icon type="ios-refresh" size="20" />
            <span>重置</span>
          </span>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="title">标题</div>
      <EchartsTemplate />
      <!-- 左侧抽屉 主题样式 -->
      <Drawer
        title="主题选择"
        :closable="true"
        :mask-style="{background: 'transparent'}"
        :draggable="true"
        v-model="drawer"
      >
       <RadioGroup v-model="vertical" vertical>
        <Radio label="apple">
            <Icon type="social-apple"></Icon>
            <span>Apple</span>
        </Radio>
        <Radio label="android">
            <Icon type="social-android"></Icon>
            <span>Android</span>
        </Radio>
        <Radio label="windows">
            <Icon type="social-windows"></Icon>
            <span>Windows</span>
        </Radio>
    </RadioGroup>
      </Drawer>
      <!-- 按钮 -->
      <div class="handle-box">
        <div class="button">
          <span>
            <Icon type="ios-cloud-download-outline" size="18" />
            <span>下载</span>
          </span>
          <span @click="handleDrawer">
           <Icon type="md-options"  size="16" />
            <span>主题</span>
          </span>
          <span @click="handleRouter">
            <Icon type="ios-redo-outline" size="20" />
            <span>返回</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EchartsTemplate from "./module/EchartsTemplate";
import AceEditor from "./module/AceEditor";
export default {
  name: "jsedition",
  components: {
    EchartsTemplate,
    AceEditor
  },
  data: () => ({
    drawer: false,
    vertical: 'apple',
    split: 0.35,
    action: "a",
    html: '<div class="myChart" ref="myChart"></div>',
    selectVal: "",
    cityList3: [
      {
        value: "项目1",
        label: "项目1"
      },
      {
        value: "项目2",
        label: "项目2"
      },
      {
        value: "项目3",
        label: "项目3"
      }
    ]
  }),
  props: {
    msg: String
  },
  // computed:{
  //   offset(){
  //     return this.$refs.splits.$data.offset
  //   }
  // },
  // watch:{
  //   offset(val){
  //     console.log(val);

  //   }
  // },
  mounted() {
    console.log(this.$refs.splits);
  },
  methods: {
    handleTab(val) {
      this.action = val;
    },
    handleRouter() {
      this.$router.push({ path: "/template/chart" });
    },
    handleDrawer() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
<style lang="scss" scoped>
.edition-warp {
  display: flex;
  height: 100%;
  font-size: 14px;
  .left {
    width: 35%;
    height: 100%;
    border-right: 3px solid #ccc;
    position: relative;
    .menu {
      display: flex;
      justify-content: space-between;
      background-color: #ebebeb;
      margin-top: 1px;
      .me-left {
        width: 47px;
         border: 1px solid #ccc;
      }
      .me-right {
        width: calc(100% - 47px);
        display: flex;
        //  box-shadow: 0 1px 3px rgba(26,26,26,.1);
        li {
          width: 33.3%;
          padding: 6px 0;
          text-align: center;
          border: 1px solid #ccc;
          cursor: pointer;
        }
        li.action {
          border: 0px;
          color: #19be6b;
          background-color: #fff;
        }
      }
    }
    .tab,
    li {
      height: 100%;
    }

    .handle-box {
      top: 60px;
      right: 32px;
    }
  }

  .left:hover,
  .right:hover {
    .button {
      > span {
        opacity: 0.5;
      }
      > span:hover {
        opacity: 1;
      }
    }
  }

  .right {
    width: 65%;
    // height: calc(100% - 36px);

    // display: flex;
    // justify-content: center;
    // align-items: center;
    background-color: #fff;
    position: relative;
    .handle-box {
      top: 55px;
      right: 32px;
    }
    .title {
      background: #fcfcfc;
      padding: 6px 16px;
      background-color: #ebebeb;
      margin-top: 1px;
      border: 1px solid #ccc;
      text-align: center;
      margin-bottom: 24px;
    }
  }

  .handle-box {
    position: absolute;
    z-index: 10;
  }
  .button {
    display: flex;
    > span {
      display: flex;
      align-items: center;
      font-size: 12px;
      border: 1px solid #ccc;
      color: #aaa;
      padding: 2px 6px;
      margin-left: 10px;
      border-radius: 3px;
      opacity: 0;
      cursor: pointer;
      transition: all 0.3s;
    }

    > span:nth-child(1) {
      border: 1px dashed #19be6b;
      color: #19be6b;
    }
    > span:nth-child(2) {
      border: 1px dashed #2db7f5;
      color: #2db7f5;
      span {
        margin-left: 3px;
      }
    }
    > span:nth-child(3) {
      border: 1px dashed #fa795e;
      color: #fa795e;
    }
  }
}
</style>