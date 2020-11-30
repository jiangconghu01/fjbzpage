import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('pages/index.vue'),
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('pages/map/map.vue'),
    },
    {
      path: '/view',
      name: 'view',
      component: () => import('pages/view.vue'),
      redirect: '/view/xndb',
      children: [
        {
          path: '/view/xndb',
          name: 'xndb',
          component: () => import('pages/view/xndb.vue'),
        },
        {
          path: '/view/zczc',
          name: 'zczc',
          component: () => import('pages/view/zczc.vue'),
        },
      ],
    },
  ],
})
