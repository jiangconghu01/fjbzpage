import Vue from 'vue'
import Vuex from 'vuex'
import chartArr from './chartarr'
Vue.use(Vuex)
const state = {
  month: beforeMonth(),
  orgCode: {
    // orgCode: '59',
    // orgDefName: '福建省',
    // orgLevel: '1',
    // orgName: '福建',
  },
  type: { value: '0000', label: '所有' },
  muLabel: '',
  outLinkId: '',
  isloading: false,
  chartArr: JSON.parse(JSON.stringify(chartArr)),
  authCityLevel: [],
  listAuth: [],
  updateTime: '',
  incomeType: 'zq',
}
const getters = {
  month(state) {
    return state.month
  },
  updateTime(state) {
    return state.updateTime
  },
  orgCode(state) {
    return state.orgCode
  },
  type(state) {
    return state.type
  },
  muLabel(state) {
    return state.muLabel
  },
  outLinkId(state) {
    return state.outLinkId
  },
  isloading(state) {
    return state.isloading
  },
  chartArr(state) {
    return state.chartArr
  },
  authCityLevel(state) {
    return state.authCityLevel
  },
  listAuth(state) {
    return state.listAuth
  },
  incomeType(state) {
    return state.incomeType
  },
}
const mutations = {
  setMonth(state, param) {
    state.month = param
  },
  setUpdateTime(state, param) {
    state.updateTime = param
  },
  setOrgCode(state, param) {
    state.orgCode = param
  },
  setType(state, param) {
    state.type = param
  },
  setMuLabel(state, param) {
    state.muLabel = param
  },
  setOutLinkId(state, param) {
    state.outLinkId = param
  },
  setIsloading(state, param) {
    state.isloading = param
  },
  setChartArr(state, param) {
    state.chartArr[param.name] = param.val
  },
  setAuthCityLevel(state, param) {
    state.authCityLevel = param
  },
  setListAuth(state, param) {
    state.listAuth = param
  },
  setIncomeType(state, param) {
    state.incomeType = param
  },
}
const actions = {
  monthAction(context, param) {
    context.commit('setMonth', param)
  },
  actIsloading(context, param) {
    context.commit('setIsloading', param)
  },
}
var vuexStore = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})

function beforeMonth() {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 2) {
    year -= 1
    month = 12
  } else {
    month -= 1
  }
  return month < 10 ? `${year}-0${month}` : `${year}-${month}`
}
export default vuexStore
