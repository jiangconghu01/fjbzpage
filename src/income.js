// import 'core-js/es6/promise'
// import 'core-js/es6/array'
// import 'core-js/es7/array'

import 'babel-polyfill'
import Vue from 'vue'
import router from './router/income.router'
import store from './store/income.store'
import Index from './index.vue'
import http from './util/http'
import iView from 'iview'
import { Cascader, Select, DatePicker, Option, Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'iview/dist/styles/iview.css'
import Echarts from 'echarts'
import cityLevel from './chartconfig/citycode.js'
Vue.prototype.$http = http
Vue.prototype.$echarts = Echarts
Vue.prototype.$cityLevel = cityLevel
console.log(cityLevel)
Vue.use(iView)
Vue.use(Cascader)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(Index),
})
