<template>
  <div class="chart" ref="chart"></div>
</template>

<script>
export default {
  name: "chart",
  data: () => ({
    ele: null,
    content: null,
    myEcharts: null
  }),

  // 使用 props 传参
  props: ["option", "theme", "loading"],
  watch: {
    option(obj) {
      this.getChart(obj, this.theme, this.loading);
    },
    theme(obj) {
      this.getChart(this.option, obj, this.loading);
    },
    loading(obj) {
      this.getChart(this.option, this.theme, obj);
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getChart(this.option, this.theme, this.loading);
    });
  },

  methods: {
    
    // 使用 function 传参
    getChart(option, theme, loading) {
      //防止错误阻断，进行参数校验
      let theme = theme ? theme : {};
      let loading = loading ? loading : {};

      this.ele = this.$refs.chart;

      // 主题（ 根据需求自行添加 ）
      this.echarts.registerTheme(theme.themeName, theme.theme);

      // 初始化
      this.myEcharts.init(this.ele, theme.themeName);

      //显示加载动画（ 根据需求自行添加 ）
      this.myEcharts.showLoading(loading);

      if (option) {
        // 将 option 注册到 echarts 中
        this.myEcharts.setOption(option, true);

        // 添加点击事件（ 根据需求自行添加 ）
        this.myEcharts.off("click");
        this.myEcharts.on("click", param => {
          //根据需求做逻辑处理
          console.log(param);
        });

        //监听窗口变化 自适应（ 根据需求自行添加 ）
        window.addEventListener("resize", () => {
          this.myEcharts.resize();
        });

        //隐藏动画效果（ 根据需求自行添加 ）
        this.myEcharts.hideLoading();
      }
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
  height: 100%;
  width: 100%;
  margin: 0px 15px;
}
</style>