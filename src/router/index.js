import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  // mode: 'hash',
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
        },
        //前端部署
        {
          path: '/deploy',
          name: 'deploy',
          component: () => import('../components/viwe/deploy/Main')
        },

        //任务管理
        {
          path: '/task',
          name: 'task',
          component: () => import('../components/viwe/testManage/TaskMain.vue')

        },
        //系统管理
        {
          path: '/sys',
          name: 'sys',
          component: () => import('../components/viwe/setUpSys/setMain.vue'),
          redirect: '/sys/center',//设置默认指向的路径
          children: [ //这里就是二级路由的配置
            {
              path: '/sys/center',
              name: 'center',
              component: () => import('../components/viwe/setUpSys/Center.vue')
            },
            {
              path: '/sys/set',
              name: 'settings',
              component: () => import('../components/viwe/setUpSys/Settings.vue')
            },
            {
              path: '/sys/log',
              name: 'log',
              component: () => import('../components/viwe/setUpSys/OperationLog.vue')
            },
          ]
        }
      ]
    }
  ]
})
