<template>
  <div class="warp">
    <h3>图谱下载：</h3>
    <div>
      1、下载或复制以下
      <span class="code">html</span>代码保存至
      <span class="code">*.html</span>文件中；
    </div>
    <div>
      2、将
      <span class="code">echarts.js</span> 文件和保存的
      <span class="code">*.js</span> 文件插入到
      <span class="code">html</span>中引用；
    </div>
    <div>
      3、在
      <span class="code">html</span>中使用
      <div class="html code" v-text="html"></div>作为图表渲染容器。
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
    <h3>Demo源码：</h3>
    <div class="content">
      <AceEditor :content="jsTemplate" lang="html" />
    </div>
  </div>
</template>

<script>
import AceEditor from "./AceEditor";
import template from "../../../../assets/template";
export default {
  name: "jsedition",
  components: {
    AceEditor
  },
  data: () => ({
    html: '<div id="myChart"></div>',
    newData: {},
    jsTemplate: "",
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
        this.jsTemplate = template.jsTemplatey;
      } else {
        this.jsTemplate = template.jsTemplaten;
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
