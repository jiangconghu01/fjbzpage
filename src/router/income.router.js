import Vue from 'vue'
import VueRouter from 'vue-router'
import { getOrgLevel } from '../incomepages/page.util'
import store from '../store/income.store'

Vue.use(VueRouter)
const router = new VueRouter({
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
      redirect: '/view/zl',
      children: [
        {
          path: '/view/zl',
          name: 'zl',
          component: () => import('@/incomepages/view/zl.vue'),
        },
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
router.beforeEach(async (to, from, next) => {
  const viewMap = {
    zl: '106',
    chn: '107',
    zqsc: '108',
  }
  let orgLevelObj = []
  let flag = false
  try {
    const res = await Vue.prototype.$http.post('/channelBigScreen/common/orgInfoAuthorizedAll', { viewCode: viewMap[to.name], orgCode: '59' })
    const level = getOrgLevel(res.data.data)
    console.log(level)
    store.commit('setAuthCityLevel', level.level)
    next()
  } catch (error) {
    alert('获取用户权限失败！')
    next()
  }
  next()
})
export default router
