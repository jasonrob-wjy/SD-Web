import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  mode: 'history',
  // mode: 'hash', //默认 有#号
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/login/index.vue')
    },
   
    {
      path: '/',
      name: 'index',
      component: () => import('../components/Main.vue'),
      redirect: '/',//设置默认指向的路径
      children: [ //这里就是二级路由的配置
        {
          path: '/',
          name: 'index',
          component: () => import('../components/index/index.vue')
        },
        {
          path: '/addpage',
          name: 'Addpage',
          component: () => import('../components/add_project/AddPage.vue')
        },
        {
          path: '/tablePage',
          name: 'tablePage',
          component: () => import('../components/table_list/index.vue')
        },
        {
          path: '/docs',
          name: 'docs',
          component: () => import('../components/docs/index.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('../components/profile/index.vue')
        }
      ]
    },
  ]
})
