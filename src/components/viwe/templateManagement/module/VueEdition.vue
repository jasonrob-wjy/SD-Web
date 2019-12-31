<template>
  <div class="warp">
    <h3>图谱下载：</h3>
    <div>1、若项目中未安装过<span class="code">echarts</span>可以通过<span class="code">npm install echarts --save</span>来安装<span class="code">echarts</span>包；</div>
    <div>2、下载或复制以下代码保存至<span class="code">*.vue</span>文件，可以将下载或保存的<span class="code">*.vue</span>文件作为组件使用；</div>
    <div>
      3、在<span class="code">template</span>中使用
      <div class="html code" v-text="html"></div>作为图表渲染容器。
    </div>
    <div>
      4、下载全部源码，请点击这里
      <span class="docode">下载源码</span> 进行下载。
    </div>
    <h3>图谱源码：</h3>
    <div class="content">
     <pre>
  <code>
    this.myEcharts = this.$echarts.init(this.ele, 'halloween');
  </code>
</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: "jsedition",
  data: () => ({
    html: '<div class="myChart" ref="myChart"></div>',
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
  props: {
    msg: String
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
  h3{
    margin-top: 10px;
  }
  .docode {
    color: #61a0a8;
    border: 1px dashed #61a0a8;
    padding: 3px 6px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    transition: all .3s;
    margin: 0 3px;
  }
  .docode:hover {
    color: #428bca;
    border: 1px dashed #428bca;
  }
}
.content{
  pre{
    padding: 0;
    margin: 0;
    color: #333;
    background: #f8f8f8;
  }
}
.dow-warp {
}
</style>
