<template>
  <div class="warp">
    <h3>图谱下载：</h3>
    <div>
      1、若项目中未安装过
      <span class="code">echarts</span>可以通过
      <span class="code">npm install echarts --save</span>来安装
      <span class="code">echarts</span>包；
    </div>
    <div>
      2、下载或复制以下代码保存至
      <span class="code">*.vue</span>文件，可以将下载或保存的
      <span class="code">*.vue</span>文件作为组件使用；
    </div>
    <div>
      3、若作为组件使用，可以这样<span class="code" v-text="html"></span>使用；
       <p style="margin-left:23px;"> 或者<span class="code" v-text="html1"></span>然后这样调用<span v-if="newData.theme" class="code">this.$refs.myChart.setChart(option,theme)</span><span v-else class="code">this.$refs.myChart.setChart(option)</span>，其中<span class="code">*name*</span>是你自己自定义的组件名。</p>
    </div>
    <!-- <div>
      4、下载全部源码，请点击这里
      <span class="docode">下载源码</span> 进行下载。
    </div> -->
    <h3>参数说明：</h3>
    <div>
      ★ 配置
      <span class="code">option</span>参数：请参考当前
      <span class="code">Option配置</span>的tab页。
    </div>
    <div v-if="newData.theme">
      ★ 主题
      <span class="code">theme</span>请参考当前
      <span class="code">theme配置</span>的tab页。
    </div>
    <h3>图谱源码：</h3>
    <div class="content">
      <AceEditor :content="vueTemplate" lang="html" />
    </div>
  </div>
</template>

<script>
import AceEditor from "./AceEditor";
import template from "../../../../assets/template";
export default {
  name: "vueedition",
  components: {
    AceEditor
  },
  data: () => ({
    html: "",
    html1: `<*name* ref="myChart" />`,
    vueTemplate: "",
    newData: {},
    color: [
      "#c23531",
      "#2f4554",
      "#61a0a8",
      "#d48265",
      "#91c7ae",
      "#749f83",
      "#ca8622",
      "#bda29a",
      "#6e7074",
      "#546570",
      "#c4ccd3"
    ]
  }),
  props: ["content"],
  watch: {
    content(val) {
      this.newData = val;
      this.getTemplate();
    }
  },
  mounted() {
    this.newData = this.content;
    this.getTemplate();
  },
  methods: {
    getTemplate() {
      if (this.newData.theme) {
        this.vueTemplate = template.vueTemplatey;
        this.html = '<*name* :option="option" :theme="theme" />';
      } else {
        this.vueTemplate = template.vueTemplaten;
        this.html = '<*name* :option="option" />';
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.warp {
  > div {
    margin: 12px 0;
    .html {
      display: inline-block;
    }
  }
  h3 {
    margin-top: 10px;
  }
  .docode {
    color: #61a0a8;
    border: 1px dashed #61a0a8;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;
    margin: 0 3px;
  }
  .docode:hover {
    color: #428bca;
    border: 1px dashed #428bca;
  }
}
.content {
  padding: 5px;
  height: 300px;
  border-radius: 8px;
  border: 1px dashed rgba(67, 140, 204, 0.3);
}
</style>
