<template>
  <editor
    v-model="content"
    :options="options"
    @init="editorInit"
    :lang="lang"
    theme="chrome"
    width="100%"
    height="calc(100% - 36px)"
  ></editor>
</template>

<script>
import aceEditor from "vue2-ace-editor";
export default {
  name: "aceeditor",
  components: {
    editor: aceEditor
  },
  watch: {
    content(val) {
      console.log(val);
    }
  },
  data: () => ({
    lang: "javascript", // html、javascript
    content: `let option = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };`,
    options: {
      wrap: true, // 换行
      enableLiveAutocompletion: true, // 智能补全
      enableSnippets: true // 启用代码段
      // enableBasicAutocompletion: true, // 启用基本完成 不推荐使用
      // autoScrollEditorIntoView: false, // 自动滚动编辑器视图
    }
  }),
  // props: {
  //   msg: String
  // },
  methods: {
    editorInit() {
      require("brace/ext/language_tools");
      require("brace/mode/html");
      require("brace/mode/javascript");
      require("brace/mode/less");
      require("brace/theme/chrome");
      require("brace/snippets/javascript");
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
  pre {
    padding: 0;
    margin: 0;
    color: #333;
    background: #f8f8f8;
  }
}

</style>
<style lang="scss">
.ace-chrome .ace_print-margin{
  visibility: hidden !important;
}
// .ace_scroller,.ace_gutter{
//   margin: 10px 0 !important;
// }
</style>