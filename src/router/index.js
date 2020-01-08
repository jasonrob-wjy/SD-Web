import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login')
    },
    {
      path: '/',
      name: 'main',
      component: () => import('../components/Main'),
      redirect: '/',//设置默认指向的路径
      children: [ //这里就是二级路由的配置
        {
          path: '/',
          name: 'workbench',
          component: () => import('../components/viwe/workbench/Workbench.vue')
        },
        //可视化图谱
        {
          path: '/charts',
          name: 'charttemplatemain',
          component: () => import('../components/viwe/templateManagement/ChartTemplateMain.vue')

        },
        {
          path: '/template/edition',
          name: 'echartsedition',
          component: () => import('../components/viwe/templateManagement/EchartsEdition.vue')
        },

        //前端组件
        {
          path: '/components',
          name: 'componentmain',
          component: () => import('../components/viwe/componentsManage/componentMain.vue')

        }
      ]
    },


  ]
})
