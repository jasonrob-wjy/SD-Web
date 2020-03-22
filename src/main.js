import Vue from 'vue';
import App from './App.vue';

// 引入View UI 框架
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

//引入font-awesome
import 'font-awesome/css/font-awesome.css';

//挂载 api
import axios from 'axios';
import qs from 'qs';
axios.defaults.baseURL = process.env.VUE_APP_URL;
Vue.prototype.$url = process.env.VUE_APP_URL;
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;



import uploader from 'vue-simple-uploader'
Vue.use(uploader)

//引入 store
import store from './store/index';

import event from './utils/event'
Vue.prototype.$event = event

//引入路由
import router from './router/index';
const whiteList = ['/taskadcsedw'];//不需要登录能访问的path
router.beforeEach((to, from, next) => {
  // console.log('beforeEach');
  // let userInfo = JSON.parse(sessionStorage.getItem('state'));//获取缓存看是否登录过
  
  let state = sessionStorage.getItem('state');//获取缓存看是否登录过
  if (whiteList.indexOf(to.path) < 0) {//访问了需要登录才能访问的页面
    if (state=='true') {//登录过来直接进去
      next();
    } else {
      if (to.path == '/login') {
        next();
      } else {
        next('/login');
      }
    }
  } else {
    next();
  }
});

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 引入echarts
// import echarts from 'echarts';
// Vue.prototype.$echarts = echarts;
// import './assets/echarts/echarts_min';
// import './assets/echarts/echarts_wordcloud_min';
// import './assets/echarts/map/js/china';
// import './assets/echarts/map/js/world';
// require('echarts-wordcloud');
// import 'echarts-wordcloud'
Vue.config.productionTip = false;
import VueQuillEditor from 'vue-quill-editor';
// require styles
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// import * as Quill from 'quill'  //引入编辑器

// //quill编辑器的字体
// let fonts = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];  
// let Font = Quill.import('formats/font');  
// Font.whitelist = fonts; //将字体加入到白名单 
// Quill.register(Font, true);

Vue.use(VueQuillEditor)

import hljs from 'highlight.js'; //导入代码高亮文件
// import 'highlight.js/styles/monokai-sublime.css'  //导入代码高亮样式
// import 'highlight.js/styles/tomorrow-night.css'  //导入代码高亮样式
import 'highlight.js/styles/tomorrow.css';  //导入代码高亮样式
//自定义一个代码高亮指令
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre');
  highlight.forEach((block)=>{
      hljs.highlightBlock(block)
  })
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
