<template>
  <div class="warp">
    <h3>接口说明：</h3>
    <div>由于图表数据量可能较大，在这里只提供部分数据结构用于模拟演示，便于后端接口开发；</div>
    <h3>图谱源码：</h3>
    <div class="content">
      <AceEditor :content="api" lang="javascript" />
    </div>
  </div>
</template>

<script>
import AceEditor from "./AceEditor";
export default {
  name: "apiedition",
  components: {
    AceEditor
  },
  data: () => ({
    html: '<div class="myChart" ref="myChart"></div>',
    api: "",
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
      this.api = this.newData.data;
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
