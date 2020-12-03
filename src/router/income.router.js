import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/view',
    },
    {
      path: '/view',
      name: 'view',
      component: () => import('@/incomepages/view.vue'),
      redirect: '/view/zqsc',
      children: [
        {
          path: '/view/chn',
          name: 'chn',
          component: () => import('@/incomepages/view/chn.vue'),
        },
        {
          path: '/view/zqsc',
          name: 'zqsc',
          component: () => import('@/incomepages/view/zqsc.vue'),
        },
      ],
    },
  ],
})
