<template>
  <div class="warp">
    <div class="chart" id="chart"></div>
  </div>
</template>

<script>
export default {
  name: "chart",
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    setChart(option, content, themeObj) {
      if (option && content) {
        // if (themeObj) {
        //   color = themeObj.theme.color;
        // }
        let text =
          content +
          ";" +
          option +
          ";" +
          `
        // 主题
        
        // echarts.registerTheme(themeObj.name,themeObj.theme);

        //清除实例
        if (myEcharts != null && myEcharts != "" && myEcharts != undefined) {
            myEcharts.dispose();
        };
        //图谱初始化
        var myEcharts = echarts.init(document.querySelector('#chart'));
       // if (loadingConfig) {
          //显示加载动画
          myEcharts.showLoading();
       // }
       
        //装载配置项
        myEcharts.setOption(option, true);

        //清除点击事件防止多次触发
        myEcharts.off("click");

        //图谱点击事件绑定
        myEcharts.on("click", param => {
            //做一些逻辑处理事件
            console.log(param);
        });
        
        //监听浏览器窗口变化 自适应
        window.addEventListener("resize", () => {
            myEcharts.resize();
        });

        //关闭加载动画
        myEcharts.hideLoading();
        `;
        // console.log(text);
        eval(text);
      }
    }
  },
  beforeDestroy() {
    // if (this.myEcharts) {
    //   this.myEcharts.clear();
    // }
  }
};
</script>
<style lang="scss" scoped>
.warp {
  height: calc(100% - 90px);
  width: calc(100% - 56px);
}
.chart {
  height: 100%;
  width: 100%;
  margin: 0px 15px;
}
</style>