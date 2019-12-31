<template>
  <!-- <div class="chart" ref="chart" :style="`width:${width}px;height:${height}px;`"></div> -->
  <div class="chart" ref="chart"></div>
</template>

<script>
export default {
  name: "chart",
  data: () => ({
    content: null,
    ele: null,
    // observer: null,
    // firedNum: 0,
    // // 记录下旧的宽高数据，避免重复触发回调函数
    // width: "0",
    // height: "0",
    myEcharts: null
  }),
  props: ["data"],
  // watch: {
  //   width(val) {
  //     console.log(val);
      
  //   }
  // },
  mounted() {
    // let MutationObserver =
    //   window.MutationObserver ||
    //   window.WebKitMutationObserver ||
    //   window.MozMutationObserver;
    // let element = document.querySelector(".chart");
    // this.observer = new MutationObserver(mutationList => {
    //   for (let mutation of mutationList) {
    //     console.log(mutation);
    //   }
    //   console.log(mutation);
    //   let width = getComputedStyle(element).getPropertyValue("width");
    //   let height = getComputedStyle(element).getPropertyValue("height");
    //   if (width === this.width && height === this.height) return;
    //   this.width = width;
    //   this.height = height;

    //   // this.firedNum += 1;
    // });
    // this.observer.observe(element, {
    //   attributes: true,
    //   attributeFilter: ["style"],
    //   attributeOldValue: true
    // });

    // this.$echarts.registerTheme("halloween", theme);
    // this.myEcharts = this.$echarts.init(this.ele, "halloween");

    // this.$axios
    //   .get("/api/mock/chart", {
    //     params: { id: 3 }
    //   })
    //   .then(res => {
    // this.content = res.data;
    this.$nextTick(() => {
      this.ele = this.$refs.chart;
      this.myEcharts = this.$echarts.init(this.ele);
      this.myEcharts.showLoading();
      this.getChart();
    });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  },
  methods: {
    beforeDestroyed() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer.takeRecords();
        this.observer = null;
      }
    },
    getChart() {
      let data = this.content;
      let option = {
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
      };


      // this.$axios
      //   .get("http://localhost:3000/chart/file/write", {
      //     params: { id: option }
      //     // a:option
      //   })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
      // let a = JSON.stringify(option);
      // console.log(JSON.parse(a));
      this.myEcharts.setOption(option, true);

      this.myEcharts.off("click");
      this.myEcharts.on("click", param => {
        console.log(param);
      });

      //  window.onresize = () => {
      //     this.myEcharts.resize();
      //   };
      window.addEventListener("resize", () => {
        this.myEcharts.resize();
      });
      this.myEcharts.hideLoading();
    }
  },
  beforeDestroy() {
    if (this.myEcharts) {
      this.myEcharts.clear();
    }
  }
};
</script>
<style lang="scss" scoped>
.chart {
  // width: 95%;
  height: calc(100% - 60px);
  width: calc(100% - 56px);
  margin: 0px 15px;
}
</style>
