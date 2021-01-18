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
const a = [
  { orgCode: '591', orgName: '福州', orgLevel: '2', pid: null, orgDefName: '福州市', orgProv: '59', orgCity: null, orgCounty: null },
  { orgCode: '592', orgName: '厦门', orgLevel: '2', pid: null, orgDefName: '厦门市', orgProv: '59', orgCity: null, orgCounty: null },
  { orgCode: '593', orgName: '宁德', orgLevel: '2', pid: null, orgDefName: '宁德市', orgProv: '59', orgCity: null, orgCounty: null },
  { orgCode: '594', orgName: '莆田', orgLevel: '2', pid: null, orgDefName: '莆田市', orgProv: '59', orgCity: null, orgCounty: null },
  { orgCode: '595', orgName: '泉州', orgLevel: '2', pid: null, orgDefName: '泉州市', orgProv: '59', orgCity: null, orgCounty: null },
  { orgCode: '596', orgName: '漳州', orgLevel: '2', pid: null, orgDefName: '漳州市', orgProv: '59', orgCity: null, orgCounty: null },
  { orgCode: '597', orgName: '龙岩', orgLevel: '2', pid: null, orgDefName: '龙岩市', orgProv: '59', orgCity: null, orgCounty: null },
  { orgCode: '598', orgName: '三明', orgLevel: '2', pid: null, orgDefName: '三明市', orgProv: '59', orgCity: null, orgCounty: null },
  { orgCode: '599', orgName: '南平', orgLevel: '2', pid: null, orgDefName: '南平市', orgProv: '59', orgCity: null, orgCounty: null },
]
router.beforeEach(async (to, from, next) => {
  const viewMap = {
    zl: '106',
    chn: '107',
    zqsc: '108',
  }
  let orgLevelObj = []
  let flag = false
  try {
    // const res = await Vue.prototype.$http.post('/channelBigScreen/common/orgInfoAuthorizedAll', { viewCode: viewMap[to.name], orgCode: '59' })
    const res = { data: { data: a } }
    debugger
    const level = getOrgLevel(res.data.data)
    console.log(level)
    store.commit('setAuthCityLevel', level.level)
    store.commit('setListAuth', level.allArr)
    next()
  } catch (error) {
    console.log(error)
    Vue.prototype.$Message.error('获取不到权限组织，无法获取数据！')
    next()
  }
  next()
})
export default router
