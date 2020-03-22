
//有主题
let jsTemplatey = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>图谱</title>
    <style>
        body,
        html {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        #myChart {
            width: 99%;
            height: 99%;
        }
    </style>

    <script src="${process.env.VUE_APP_URL}/assets/js/echarts.min.js"></script>
</head>
<body>
    <div id="myChart"></div>
    <script>

        // 主题 （ 根据需求自行添加 ） 
        let theme = {};  // 请参考tab页的 theme配置，直接替换即可。
        let themeName = theme.themeName ? theme.themeName : "";
        let themeOption = theme.theme ? theme.theme : {};
        echarts.registerTheme(themeName,themeOption)

        // 初始化
        let myEcharts = echarts.init(document.querySelector('#myChart'),themeName);

        //显示加载动画（ 根据需求自行添加 ）
        myEcharts.showLoading({
          text: '加载中...',
          color: '#c23531',
          textColor: '#fff',
          maskColor: 'transparent',
        }); 

        //装载配置项
        let option = {};  // 请参考tab页的 Option配置，直接替换即可。
        myEcharts.setOption(option, true);

        //清除点击事件防止多次触发
        myEcharts.off("click");

        //图谱点击事件绑定
        myEcharts.on("click", param => {
            //做一些逻辑处理事件
            console.log(param);
        });
        
        //监听浏览器窗口变化 自适应 注意：只在浏览器窗口发生改变时才会触发
        window.addEventListener("resize", () => {
            myEcharts.resize();
        });

        //关闭加载动画（ 根据需求自行添加 ）
        myEcharts.hideLoading();

    </script>
</body>
</html>`;

//无主题
let jsTemplaten = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>图谱</title>
    <style>
        body,
        html {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        #myChart {
            width: 99%;
            height: 99%;
        }
    </style>

    <script src="${process.env.VUE_APP_URL}/assets/js/echarts.min.js"></script>
</head>
<body>
    <div id="myChart"></div>
    <script>

        // 初始化
        let myEcharts = echarts.init(document.querySelector('#myChart'));

        //显示加载动画（ 根据需求自行添加 ）
        myEcharts.showLoading({
          text: '加载中...',
          color: '#c23531',
          textColor: '#fff',
          maskColor: 'transparent',
        }); 

        //装载配置项
        let option = {};  // 请参考tab页的 Option配置，直接替换即可。
        myEcharts.setOption(option, true);

        //清除点击事件防止多次触发
        myEcharts.off("click");

        //图谱点击事件绑定
        myEcharts.on("click", param => {
            //做一些逻辑处理事件
            console.log(param);
        });
        
        //监听浏览器窗口变化 自适应 注意：只在浏览器窗口发生改变时才会触发
        window.addEventListener("resize", () => {
            myEcharts.resize();
        });

        //关闭加载动画（ 根据需求自行添加 ）
        myEcharts.hideLoading();

    </script>
</body>
</html>`;



//有主题
let vueTemplatey = 
`<template>
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
  props: ["option", "theme"],
  watch: {
    option(obj) {
      this.setChart(obj, this.theme, this.loading);
    },
    theme(obj) {
      this.setChart(this.option, obj, this.loading);
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.setChart(this.option, this.theme, this.loading);
    });
  },

  methods: {
    
    // 使用 function 传参
    setChart(option, theme) {
      //防止错误阻断，进行参数校验
      let theme = theme ? theme : {};

      this.ele = this.$refs.chart;

      // 主题（ 根据需求自行添加 ） 请参考tab页的 theme配置。
      this.echarts.registerTheme(theme.themeName, theme.theme);

      // 初始化
      this.myEcharts.init(this.ele, theme.themeName);

      //显示加载动画（ 根据需求自行添加 ）
      this.myEcharts.showLoading({
        text: '加载中...',
        color: '#c23531',
        textColor: '#fff',
        maskColor: 'transparent',
      });

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
`
//无主题
let vueTemplaten = 
`<template>
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
  props: ["option", "theme"],
  watch: {
    option(obj) {
      this.setChart(obj, this.theme, this.loading);
    },
    theme(obj) {
      this.setChart(this.option, obj, this.loading);
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.setChart(this.option, this.theme, this.loading);
    });
  },

  methods: {
    
    // 使用 function 传参
    setChart(option, theme) {

      //防止错误阻断，进行参数校验
      let theme = theme ? theme : {};

      this.ele = this.$refs.chart;

      // 初始化
      this.myEcharts.init(this.ele);

      //显示加载动画（ 根据需求自行添加 ）
      this.myEcharts.showLoading({
        text: '加载中...',
        color: '#c23531',
        textColor: '#fff',
        maskColor: 'transparent',
      });

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
`
export default { jsTemplaten,jsTemplatey, vueTemplatey , vueTemplaten}
