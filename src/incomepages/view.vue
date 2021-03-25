<template>
  <div ref="viewBox" class="view">
    <img class="bkimg" src="../static/income/bg.png" alt="" />
    <img class="bkimg_h" src="../static/income/header.png" alt="" />
    <div class="header">
      <div class="left">
        <img class="logo-img" src="../static/income/logo.png" alt="" />
        <!-- <div v-if="currentPage !== 'zl'" class="back" @click="indexPage">
          <svg t="1608777839839" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19102">
            <path
              d="M298.934857 347.794286V220.16L0.731429 518.217143l298.130285 298.057143V688.493714L128.585143 518.217143l170.349714-170.422857z m255.488 42.642285v-170.422857L256.292571 518.290286 554.422857 816.274286V641.682286c212.845714 0 361.984 68.169143 468.333714 217.088-42.496-212.845714-170.276571-425.691429-468.333714-468.333715z"
              fill="#fff"
              p-id="19103"
            ></path>
          </svg>
          <span>返回首页</span>
        </div> -->
      </div>
      <!-- <div class="pre btn center" @click="prePage">上一页</div> -->
      <!-- <div class="big-title center" v-on="{ mouseenter: hoverTitle, mouseleave: hoverTitle }">{{ titleText }}</div> -->
      <div class="big-title center">{{ titleText }}</div>
      <!-- <div class="next btn center" @click="nextPage">下一页</div> -->
      <div class="right">
        <div class="date">
          <img class="bk" src="../static/income/index/select.png" alt="" />
          <el-date-picker v-model="dateVal" format="yyyy年MM月" value-format="yyyy-MM" type="month" placeholder="选择月" @change="setTime"> </el-date-picker>
        </div>
        <div class="city-box">
          <img class="bk" src="../static/income/index/select.png" alt="" />
          <el-cascader ref="refHandle" v-model="value" :options="authCityLevel" :props="{ expandTrigger: 'hover', checkStrictly: true }" @change="handleChange"></el-cascader>
          <!-- <el-cascader ref="refHandle" v-model="value" :options="$cityLevel.level" :props="{ expandTrigger: 'hover', checkStrictly: true }" @change="handleChange"></el-cascader> -->
        </div>
        <div class="text-box">
          <p>金　额：万元</p>
          <p>客户数：万户</p>
          <div class="ic">
            <svg t="1607672170486" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2080">
              <path
                d="M512 936.746667c234.581333 0 424.746667-190.165333 424.746667-424.746667S746.581333 87.253333 512 87.253333 87.253333 277.418667 87.253333 512 277.418667 936.746667 512 936.746667z m0 64C242.090667 1000.746667 23.253333 781.909333 23.253333 512 23.253333 242.090667 242.090667 23.253333 512 23.253333 781.909333 23.253333 1000.746667 242.090667 1000.746667 512c0 269.909333-218.837333 488.746667-488.746667 488.746667z"
                p-id="2081"
                fill="#fff"
              ></path>
              <path
                d="M422.826667 436.266667v0.682666a32 32 0 1 1-64-1.28 11.306667 11.306667 0 0 1-0.042667-1.408c0-47.274667 13.269333-86.186667 39.552-116.864 28.8-33.109333 68.48-49.322667 118.741333-49.322666 44.714667 0 80.938667 12.970667 108.544 39.125333 26.453333 24.917333 39.594667 58.624 39.594667 100.352 0 30.293333-9.386667 58.112-27.733333 82.389333-7.68 9.685333-24.234667 25.813333-54.229334 52.949334-14.506667 12.672-24.746667 24.490667-31.146666 35.285333-8.405333 14.506667-12.458667 29.269333-12.501334 45.141333l1.152 19.370667a11.178667 11.178667 0 0 1-11.178666 11.861333h-41.898667a11.178667 11.178667 0 0 1-11.221333-11.178666v-19.370667c0-21.162667 4.437333-40.917333 13.098666-58.197333 10.496-22.485333 32.213333-48.512 63.701334-75.989334 19.584-19.626667 25.728-25.941333 29.781333-31.018666 12.8-16.469333 19.029333-32.810667 19.029333-49.92 0-25.472-7.381333-45.568-21.418666-60.202667-14.762667-14.762667-36.352-22.144-65.578667-22.144-32.64 0-56.021333 10.496-72.106667 31.872-13.525333 16.938667-19.968 41.685333-19.968 75.861333a11.264 11.264 0 0 1-0.170666 2.005334zM512 763.648a32 32 0 1 1 0-64 32 32 0 0 1 0 64z"
                p-id="2082"
                fill="#fff"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showIcomeType" class="income-switch-btn" :style="currentPage === 'clkh' || currentPage === 'xzlw' ? { top: 'calc(11% - 9px)' } : {}">
      <div class="zq" :class="[incomeType === 'zq' ? 'current' : '']" @click="toDataSwitch('zq')"><i>折前</i></div>
      <div class="zh" :class="[incomeType === 'zh' ? 'current' : '']" @click="toDataSwitch('zh')"><i>折后</i></div>
    </div>
    <div class="left-mu" :style="currentPage === 'clkh' || currentPage === 'xzlw' ? { top: 'calc(11% - 9px)' } : {}">
      <div ref="mubtn" class="frame" @click="showMuList">
        <img class="bk" src="../static/income/index/select.png" alt="" />
        <span class="ph">点击选择菜单</span>
      </div>
      <div v-if="isShowMuList" ref="mudom" class="mu-scroll">
        <el-menu :default-active="dfmu" class="el-menu-left" @open="handleOpen" @close="handleClose" @select="selectMu">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>通信服务收入</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1"><i class="el-icon-tickets"></i>通信服务收入总览</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>CHN市场账单收入</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1"><i class="el-icon-tickets"></i>当月收入总览</el-menu-item>
              <el-menu-item index="2-2"><i class="el-icon-tickets"></i>收入变动历史趋势分析</el-menu-item>
              <el-menu-item index="2-3"><i class="el-icon-tickets"></i>新增/离网分析</el-menu-item>
              <el-menu-item index="2-4"><i class="el-icon-tickets"></i>存量客户升档/降档分析</el-menu-item>
              <!-- <el-menu-item index="2-5"><i class="el-icon-tickets"></i>当月折后收入总览</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>CHN市场非账单收入</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><i class="el-icon-tickets"></i>CHN市场非账单收入</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>B市场收入</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1"><i class="el-icon-tickets"></i>政企市场(B)收入情况</el-menu-item>
              <el-menu-item index="5-1"><i class="el-icon-tickets"></i>B市场非账单收入</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </div>
    <!-- <div id="top-mu-box" class="top-mu" :class="!isShowMu ? '' : 'open_mu'">
      <svg class="mu-svg mu" viewBox="0 0 928 253" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="桌面端" transform="translate(-201.000000, -137.000000)" stroke="rgba(55, 178, 255, 0.7)">
          <g id="svg-lines" transform="translate(202.013952, 138.146694)" fill="none">
            <polyline id="line-1-1" class="line" points="-1.42108547e-14 48.1458964 -1.42108547e-14 93.6180144 21.2147748 93.6180144"></polyline>
            <polyline id="路径-2" points="95.1358414 13.6793283 95.1358414 7.10542736e-15 925.718426 7.10542736e-15 925.718426 12.6216662"></polyline>
            <line id="路径-3" x1="374.924749" y1="-7.10542736e-15" x2="374.924749" y2="12.6369853"></line>
            <line id="路径-4" x1="643.300636" y1="7.10542736e-15" x2="643.300636" y2="13.6793283"></line>
            <polyline id="line-4-1" class="line" points="827.471579 48.0602965 827.471579 93.7239253 847.047429 93.7239253"></polyline>
            <polyline id="line-3-1" class="line" points="547.523138 47.822244 547.523138 93.4024759 567.71827 93.4024759"></polyline>
            <line id="路径-7" x1="276.946783" y1="48.0665259" x2="276.486048" y2="249.353306"></line>
            <line id="路径-8" x1="276.486048" y1="249.353306" x2="297.090748" y2="249.353306"></line>
            <line id="路径-9" x1="276.946783" y1="210.441915" x2="297.090748" y2="210.441915"></line>
            <line id="路径-10" x1="276.946783" y1="170.932317" x2="297.090748" y2="170.932317"></line>
            <line id="路径-11" x1="276.946783" y1="92.9673432" x2="297.090748" y2="92.9673432"></line>
            <line id="路径-12" x1="276.946783" y1="132.760481" x2="297.090748" y2="132.760481"></line>
          </g>
        </g>
      </svg>
      <div class="mu-layer mu" v-on="{ mouseenter: hoverMu, mouseleave: hoverMu }">
        <div class="mu1 mu-item zl">
          <p class="mu-1 current">通信服务收入</p>
          <ul class="mu-2">
            <li class="current" muid="1-1" @click="handleMuClick('mu1,1-1', 'zl')">通信服务收入总览</li>
          </ul>
        </div>
        <div class="mu2 mu-item xx">
          <p class="mu-1">CHN市场折后账单收入</p>
          <ul class="mu-2">
            <li muid="2-1" @click="handleMuClick('mu2,2-1', 'xx')">当月收入总览</li>
            <li muid="2-2" @click="handleMuClick('mu2,2-2', 'xx')">收入变动历史趋势分析</li>
            <li muid="2-3" @click="handleMuClick('mu2,2-3', 'xx')">新增/离网分析</li>
            <li muid="2-4" @click="handleMuClick('mu2,2-4', 'xx')">存量客户升档/降档分析</li>
            <li muid="2-5" @click="handleMuClick('mu2,2-5', 'xx')">当月折后收入总览</li>
          </ul>
        </div>
        <div class="mu3 mu-item chn">
          <p class="mu-1">CHN市场非账单收入</p>
          <ul class="mu-2">
            <li muid="3-1" class="" @click="handleMuClick('mu3,3-1', 'chn')">CHN市场非账单收入</li>
          </ul>
        </div>
        <div class="mu4 mu-item zqsc">
          <p class="mu-1">B市场收入</p>
          <ul class="mu-2">
            <li muid="4-1" @click="handleMuClick('mu4,4-1', 'zqsc')">政企市场(B)收入情况</li>
          </ul>
        </div>
      </div>
    </div> -->
    <router-view :class="['child-page', isShowMu ? 'is_open_mu' : '']" />
    <!-- <Spin v-show="isloading" fix @mouseenter.native="hlayer"> -->
    <Spin v-show="isloading" fix>
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>loading...</div>
    </Spin>
  </div>
</template>
<script>
const routerArr = ['zl', 'chn', 'zqsc']
import SmSelect from '@/components/sm.select.vue'
import SmCascader from '@/components/sm.cascader.vue'
import { beforeMonth, getQueryVariable, findeUpCityObj } from './page.util'
import { mapGetters, mapMutations } from 'vuex'
let timer = null
export default {
  components: { SmSelect, SmCascader },
  data() {
    return {
      currentPage: this.$route.name,
      currentMuNode: '1-1',
      dateVal: beforeMonth(),
      isShowMu: false,
      isShowMuList: false,
      dfmu: '1-1',
      leaveTimeOut: false,
      stypeList: [],
      cityList: [],
      value: [],
      dataType: 'zq',
      //   options: [],
    }
  },
  computed: {
    ...mapGetters(['month', 'orgCode', 'isloading', 'muLabel', 'authCityLevel', 'listAuth', 'incomeType']),
    options() {
      const level = JSON.parse(JSON.stringify(this.$cityLevel))
      level.label = level.name
      level.value = level.orgCode + ''
      level.children = level.children.map((item) => {
        return {
          label: item.name,
          value: item.orgCode + '',
        }
      })
      this.setOrgCode(level)
      return [level]
    },
    showIcomeType() {
      const showTagList = ['chnzl', 'clkh', 'srfx', 'xzlw']
      if (showTagList.indexOf(this.currentPage) > -1) {
        return true
      } else {
        return false
      }
    },
    titleText() {
      const pageMap = {
        chn: 'CHN市场非账单收入',
        bscf: 'B市场非账单收入',
        zqsc: '政企市场(B)收入情况',
        zl: '通信服务收入总览',
        chnzl: '当月收入总览',
        srfx: '收入变动历史趋势分析',
        xzlw: '新增/离网分析',
        clkh: '存量客户升档/降档分析',
      }
      return pageMap[this.currentPage]
    },
  },
  watch: {
    typeValue(newval, oldval) {
      this.setType(newval)
    },
    $route(to, from) {
      this.currentPage = to.name
      let orgCode = ''
      let t = ''
      const up = this.listAuth.find((val) => val.orgCode === '59')
      if (this.orgCode && this.orgCode.value) {
        orgCode = this.orgCode.value
        if (up && this.orgCode.value !== '59') {
          this.value = ['59', this.orgCode.value]
        } else {
          this.value = [this.orgCode.value]
        }
      }

      t = this.listAuth.find((val) => val.orgCode === orgCode)
      if (!t) {
        const defaultCode = this.authCityLevel[0]
        this.setOrgCode(defaultCode)
        if (up && defaultCode.orgCode !== '59') {
          this.value = ['59', defaultCode.orgCode]
        } else {
          this.value = [defaultCode.orgCode]
        }
      }
    },
    // currentPage: {
    //   handler(newval) {
    //     this.setCurrentMuStatus()
    //   },
    //   //   immediate: true,
    // },
    orgCode(newval) {
      this.asyncCascaderValue(newval)
    },
    value(nv) {
      console.log(nv)
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false //监听值发生变化就关闭它
      }
    },
  },
  created() {},
  mounted() {
    this.setUrlParam()

    // this.setCurrentMuStatus()
    // this.risezeMu()
    document.addEventListener('click', this.outsideClick)
    document.getElementsByClassName('el-input__inner')[0].setAttribute('readonly', 'readonly')
    setInterval(function () {
      ;[...document.querySelectorAll('.el-cascader-node__label')].forEach((el) => {
        el.onclick = function () {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 500)
  },
  destroyed() {
    document.removeEventListener('click', this.outsideClick)
  },
  methods: {
    ...mapMutations(['setMonth', 'setOrgCode', 'setIncomeType']),
    asyncCascaderValue(newval) {
      const t = findeUpCityObj(this.authCityLevel, newval.value)
      let cityLevelArr = []
      if (t.self.orgLevel == '1') {
        cityLevelArr = [t.self.orgCode]
      }
      if (t.self.orgLevel == '2') {
        cityLevelArr = [t.parent.orgCode, t.self.orgCode]
      }
      if (t.self.orgLevel == '3') {
        cityLevelArr = ['59', t.parent.orgCode, t.self.orgCode]
      }
      this.value = cityLevelArr
    },
    toDataSwitch(param) {
      this.setIncomeType(param)
    },
    setUrlParam() {
      const orgCode = getQueryVariable('orgCode')
      const month = getQueryVariable('date')
      if (month) {
        this.dateVal = month
        this.setMonth(month)
      }
      if (orgCode) {
        const t = this.listAuth.find((val) => val.orgCode === orgCode)
        if (t) {
          this.value = orgCode
        } else {
          const defaultCode = this.authCityLevel[0]
          this.setOrgCode(defaultCode)
          this.value = defaultCode.orgCode
        }
        this.$nextTick(() => {
          this.handleChange()
        })
      } else {
        const defaultCode = this.authCityLevel[0]
        this.setOrgCode(defaultCode)
        this.value = defaultCode.orgCode
      }
    },
    showMuList() {
      this.setDefaultMu()
      this.isShowMuList = true
    },
    outsideClick(e) {
      const isInnerBox = this.$refs['mudom'] && this.$refs['mudom'].contains(e.target)
      const isInnerBtn = this.$refs['mubtn'] && this.$refs['mubtn'].contains(e.target)
      if (isInnerBox || isInnerBtn) {
        return
      }
      this.isShowMuList = false
    },
    handleOpen(key, keyPath) {
      //   console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      //   console.log(key, keyPath)
    },
    selectMu(key, keyPath) {
      //原来老页面跳转
      //   const p_mu = key.split('-')[0]
      //   const level2_id = key.split('-')[1]
      //   const orgCodeUrl = getQueryVariable('orgCode')
      //   const monthUrl = getQueryVariable('date')
      //   if (p_mu === '2') {
      //     let month = this.month
      //     let code = ''
      //     if (this.orgCode && this.orgCode.value) {
      //       code = this.orgCode.value
      //     } else {
      //       code = orgCodeUrl
      //     }
      //     const viewCode = '10' + level2_id
      //     this.isShowMuList = false
      //     const host = this.getRootPath_dc()
      //     window.location.href = host + `/bigScreen/income/gotoScheme?viewCode=${viewCode}&date=${month}&orgCode=${code}`
      //     return
      //   }
      let page = 'zl'
      if (key === '1-1') {
        page = 'zl'
      } else if (key === '3-1') {
        page = 'chn'
      } else if (key === '2-1') {
        page = 'chnzl'
      } else if (key === '2-2') {
        page = 'srfx'
      } else if (key === '2-3') {
        page = 'xzlw'
      } else if (key === '2-4') {
        page = 'clkh'
      } else if (key === '2-5') {
        page = 'zhsr'
      } else if (key === '4-1') {
        page = 'zqsc'
      } else if (key === '5-1') {
        page = 'bscf'
      }
      this.currentPage = page
      this.$router.push({ name: page })
      this.isShowMuList = false
    },
    setDefaultMu() {
      const name = this.$route.name
      let page = '1-1'
      if (name === 'zl') {
        page = '1-1'
      } else if (name === 'chn') {
        page = '3-1'
      } else if (name === 'zqsc') {
        page = '4-1'
      }
      this.dfmu = page
    },
    risezeMu() {
      const box_h = this.$refs['viewBox'].offsetHeight
      const mu_h = box_h * 0.4
      const scale = (mu_h - 30) / 253
      const dom = document.getElementById('top-mu-box')

      scale < 1 && (dom.style.transform = `scale(${scale})`)
      scale > 1.2 && (dom.style.transform = `scale(${scale - 0.2})`)
    },
    hlayer() {
      timer && clearTimeout(timer)
    },
    hoverMu(e) {
      if (e.type === 'mouseenter') {
        timer && clearTimeout(timer)
        this.isShowMu = true
      }
      if (e.type === 'mouseleave') {
        timer = setTimeout(() => {
          this.isShowMu = false
        }, 500)
      }
    },
    hoverTitle(e) {
      if (e.type === 'mouseenter') {
        timer && clearTimeout(timer)
        this.setCurrentMuStatus()
        this.isShowMu = true
      }
      if (e.type === 'mouseleave') {
        timer = setTimeout(() => {
          this.isShowMu = false
        }, 500)
      }
    },
    handleMuClick(mu, page) {
      //   this.isShowMu = false
      const p_mu = mu.split(',')[0]
      const line_id = mu.split(',')[1]
      if (p_mu === 'mu2') {
        // this.$Message.warning('暂时不能跳转！')

        const month = this.month
        const code = this.orgCode.value
        const viewCode = '10' + line_id.split('-')[1]
        //   window.open(`/bigScreen/income/gotoScheme?viewCode=${viewCode}&date=${month}&orgCode=${code}`)
        const host = this.getRootPath_dc()
        window.location.href = host + `/bigScreen/income/gotoScheme?viewCode=${viewCode}&date=${month}&orgCode=${code}`
        return
      }

      this.currentMuNode = line_id
      this.currentPage = page
      this.$router.push({ name: page })
    },
    getRootPath_dc() {
      //   var pathName = window.location.pathname.substring(1)
      //   var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'))
      //   if (webName == '') {
      return window.location.protocol + '//' + window.location.host
      //   } else {
      //     return window.location.protocol + '//' + window.location.host + '/' + webName
      //   }
    },
    setCurrentMuStatus() {
      const name = this.$route.name
      const mus = document.querySelectorAll('.mu-layer .mu-1')
      Array.prototype.forEach.call(mus, function (val) {
        val.setAttribute('class', 'mu-1')
      })
      const t_mu = document.querySelector('.' + name + ' .mu-1')
      t_mu.setAttribute('class', 'mu-1 current')
      const lis = document.querySelectorAll('.mu-layer .mu-2 li')
      Array.prototype.forEach.call(lis, function (val) {
        val.setAttribute('class', '')
      })
      const t_li = document.querySelector('.' + name + ' li')
      t_li.setAttribute('class', 'current')
      const lines = document.querySelectorAll('#svg-lines .line')
      Array.prototype.forEach.call(lines, function (val) {
        val.setAttribute('stroke', 'rgba(55, 178, 255, 0.7)')
      })
      const t = document.querySelector('#line-' + t_li.getAttribute('muid'))
      t.setAttribute('stroke', '#E7941C')
    },
    handleChange() {
      const node = this.$refs.refHandle.getCheckedNodes()
      console.log('node', node)
      const currentNode = node[0].data
      this.setOrgCode(currentNode)
    },
    // indexPage() {
    //   this.$router.push({ name: 'zl' })
    //   this.currentPage = 'zl'
    // },
    setTime(newval) {
      this.setMonth(newval)
    },
    // prePage() {
    //   const name = this.$route.name
    //   const index = routerArr.indexOf(name) - 1
    //   const t_name = index > -1 ? routerArr[index] : routerArr[routerArr.length - 1]
    //   this.currentPage = t_name
    //   this.$router.push({ name: t_name })
    // },
    // nextPage() {
    //   const name = this.$route.name
    //   const index = routerArr.indexOf(name) + 1
    //   const t_name = index < routerArr.length ? routerArr[index] : routerArr[0]
    //   this.currentPage = t_name
    //   this.$router.push({ name: t_name })
    // },
    //获取效能对标页面外链跳转ID
    getOutLinkId() {
      this.$http.post('/bigScreen/common/getCustomReportId', { viewCode: '9' }).then((res) => {
        this.setOutLinkId(res.data.data.customReportId)
      })
    },
  },
}
</script>
<style lang="scss">
.view {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .left-mu {
    position: absolute;
    left: 20px;
    // top: 7.5%;
    top: calc(11% - 28px);
    height: 89%;
    z-index: 10;
    .mu-scroll {
      height: calc(100% - 20px);
      overflow-y: auto;
    }
    .frame {
      cursor: pointer;
      width: 112px;
      height: 28px;
      position: relative;
      img {
        width: 112px;
        height: 28px;
      }
      .ph {
        width: 100%;
        height: 28px;
        line-height: 28px;
        text-align: center;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .el-menu-left {
      border-radius: 3px;
      margin-top: 8px;
      position: relative;
      &::before {
        content: '';
        display: inline-block;
        width: 0;
        height: 0;
        border: 10px solid;
        border-color: transparent transparent #fff;
        position: absolute;
        left: 20px;
        top: -15px;
        z-index: -1;
      }
      .el-menu-item-group__title {
        padding: 0;
      }
      //   .el-menu-item.is-active {
      //     font-weight: bold;
      //   }
      .el-submenu.is-active .el-submenu__title {
        .el-icon-menu,
        span {
          font-weight: bold;
          color: #409eff;
        }
      }
    }
  }
  .income-switch-btn {
    position: absolute;
    left: 145px;
    z-index: 10;
    top: calc(11% - 28px);
    display: flex;
    background: url('../static/income/index/select.png') no-repeat;
    background-size: contain;
    & > div {
      width: 56px;
      height: 28px;
      position: relative;
      //   padding: 5px 40px;
      //   border: 1px solid #02e8fe;
      //   background: rgba(35, 72, 190, 0.5);
      cursor: pointer;
      display: flex;

      align-items: center;

      i {
        display: inline-block;
        width: 52px;
        height: 22px;
        line-height: 22px;
        text-align: center;
      }
    }
    .zq {
      justify-content: flex-end;
      i {
        width: 53px;
      }
    }
    .zh {
      justify-content: flex-start;
    }
    .zh::before {
      content: '';
      display: block;
      position: absolute;
      width: 1px;
      height: 24px;
      background: rgba(64, 233, 255, 0.836);
      left: 0px;
      top: 2px;
    }
    .current {
      //   background: #409eff;
      i {
        background: rgb(58, 128, 235);
      }
    }
  }
  .top-mu {
    position: absolute;
    width: 100%;
    top: 9%;
    height: 40%;
    // transform: scale(0.9);
    transform-origin: center top;
    opacity: 0;
    z-index: -1;
    top: -29%;
    // transition: all 0.1s;
    &.open_mu {
      top: 9%;
      opacity: 1;
      z-index: 1;
    }
    .mu {
      position: absolute;
      left: calc(50% - 48px);
      width: 928px;
      height: 253px;
      transform: translateX(-50%);
      display: flex;
      flex-wrap: nowrap;
      .mu-item {
        width: 232px;
        height: 253px;
        position: absolute;
        top: 0;
        left: 0;
        .mu-1 {
          //   width: 243px;
          width: 223px;
          height: 37px;
          line-height: 35px;
          text-align: center;
          font-size: 19px;
          font-weight: bold;
          background: url('../static/income/blue1.png') no-repeat;
          background-size: contain;
          position: absolute;
          left: -15px;
          top: 14px;
          //   cursor: pointer;
          &.current {
            background: url('../static/income/yellow1.png') no-repeat;
            background-size: contain;
          }
        }
        .mu-2 {
          height: 200px;
          position: absolute;
          left: 21px;
          top: 78px;
          li {
            &:nth-child(1) {
              margin-top: 0px;
            }
            min-width: 200px;
            height: 30px;
            line-height: 28px;
            padding-left: 5px;
            padding-right: 5px;
            text-align: left;
            font-size: 13px;
            font-weight: bold;
            background: url('../static/income/blue2.png') no-repeat;
            background-size: contain;
            margin-top: 9px;
            cursor: pointer;
            &.current {
              background: url('../static/income/yellow2.png') no-repeat;
              background-size: contain;
              height: 31px;
              line-height: 28px;
            }
          }
        }
      }
      .mu2 {
        left: 276px;
      }
      .mu3 {
        left: 546px;
      }
      .mu4 {
        left: 826px;
      }
    }
    .mu-svg {
      display: inline-block;
    }
    // background-color: rgb(0, 255, 157);
  }
  .child-page {
    position: absolute;
    top: 11%;
    height: 89%;
    width: 100%;
    // transition: all 0.25s;
    &.is_open_mu {
      overflow: hidden;
      top: 50%;
      transform-origin: left top;
      transform: scale(1, 0.55);
    }
  }
  .bkimg {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .bkimg_h {
    position: absolute;
    width: 96%;
    height: 13%;
    top: 0;
    left: 2%;
  }
  .header {
    position: absolute;
    width: 100%;
    height: 7.5%;
    // color: rgb(0, 224, 255);
    font-size: 1em;
    & > div {
      position: absolute;
      bottom: 10%;
    }
    .left {
      height: 100%;
      .logo-img {
        margin-top: 20px;
        width: 65%;
      }
      .back {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-left: 5px;
        .img {
          width: 15px;
          height: 15px;
        }
        span {
          font-size: 12px;
          transform: scale(0.9);
        }
      }
    }
    .center {
      bottom: 20%;
    }
    .btn-img {
      position: relative;
      padding: 5px 10px;
      cursor: pointer;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    .btn {
      //   background: url('../static/btn.png') no-repeat;
      background-color: #2648b9;
      padding: 2px 18px;
      cursor: pointer;
      background-size: cover;
      background-position: center 0;
      border: 1px solid rgba(45, 139, 240, 0.69);
      &::before {
        position: absolute;
        content: '';
        display: block;
        background: #00a2ff;
        width: 19px;
        height: 2px;
        left: -1px;
        top: -1px;
      }
      &::after {
        position: absolute;
        content: '';
        display: block;
        background: #00a2ff;
        width: 2px;
        height: 10px;
        left: -1px;
        top: -1px;
      }
    }
    .left {
      width: 23.5%;
      left: 1%;
      //   color: rgba(0, 225, 255, 0.855);
      div {
        display: inline-block;
        // float: left;
      }
    }
    .right {
      right: 1.3%;
      //   width: 24.5%;
      bottom: -10px;
      width: 320px;
      //   color: rgba(0, 225, 255, 0.855);
      & > div {
        display: inline-block;
        img.bk {
          display: inline-block;
          width: 130px;
          height: 30px;
          position: absolute;
        }
      }
      .date {
        display: inline-block;
        width: 100px;
        img.bk {
          top: 5px;
          width: 100px;
        }
      }

      .city-box {
        width: 120px;
        .text {
          display: inline-block;
        }
        img.bk {
          top: 5px;
          width: 120px;
        }
      }
      .text-box {
        height: 30px;
        position: absolute;
        bottom: 3px;
        padding-left: 5px;
        padding-right: 30px;
        color: #fff;
        p {
          height: 15px;
          line-height: 15px;
          width: 80px;
        }
        .ic {
          cursor: pointer;
          width: 18px;
          height: 18px;
          position: absolute;
          left: 80px;
          top: 4px;
        }
      }
    }
    .big-title {
      font-size: 28px;
      font-weight: bold;
      left: 50%;
      bottom: 16%;
      transform: translateX(-50%);
      color: rgb(15, 202, 235);
      text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.05), 3px 4px 3px rgba(0, 0, 0, 0.205);
    }
    .pre {
      left: 33%;
    }
    .next {
      right: 33%;
    }
  }
}
@media only screen and (min-width: 1500px) {
  .view {
    .header {
      .big-title {
        font-size: 32px;
      }
      .left {
        .logo-img {
          margin-top: 32px;
          width: 60%;
        }
        .back {
          padding-left: 5px;
          .img {
            width: 15px;
            height: 15px;
          }
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.ivu-select-dropdown {
  z-index: 99999998;
}
.ivu-date-picker-cells.ivu-date-picker-cells-month {
  width: 260px;
}
.ivu-date-picker-cells.ivu-date-picker-cells-year {
  width: 260px;
}

.ivu-input-suffix {
  display: none;
}
.ivu-date-picker-focused input.ivu-input {
  font-size: 12px;
}
.ivu-input-wrapper .ivu-input {
  font-size: 12px;
  //   color: rgba(0, 225, 255, 0.855);
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.ivu-spin-fix {
  background-color: rgba(2, 2, 2, 0.6);
  font-size: 16px;
  z-index: 99;
  .demo-spin-icon-load {
    width: 20px;
    height: 20px;
    background-color: #2d8cf0;
  }
}
.ivu-picker-panel-icon-btn i {
  position: relative;
  width: 20px;
  height: 14px;
}
.ivu-icon-ios-arrow-back:before {
  position: absolute;
  content: '';
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
}
.ivu-icon-ios-arrow-forward:before {
  position: absolute;
  content: '';
  display: inline-block;
  left: 0;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.8);
}
.ivu-date-picker-prev-btn-arrow-double i:after {
  position: absolute;

  content: '';
  display: inline-block;
  top: 0;
  right: 2px;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
}
.ivu-date-picker-next-btn-arrow-double i:after {
  position: absolute;
  content: '';
  display: inline-block;
  top: 0;
  right: 2px;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.8);
}
</style>
<style lang="scss">
// 修改联级下拉样式
.el-cascader__dropdown,
.el-picker-panel,
.el-select-dropdown {
  z-index: 9999999 !important;
}
.el-input__inner {
  height: 28px;
  line-height: 28px;
}
.el-input__suffix {
  display: none;
}
.el-input--suffix .el-input__inner {
  padding-right: 0px;
}
.el-input__inner {
  padding: 0 5px;
}

.el-cascader-node__postfix {
  right: 5px;
}

.el-cascader-node {
  height: 32px;
  line-height: 32px;
}
.el-cascader .el-input .el-input__inner {
  text-align: center;
}
.el-radio__inner {
  display: none;
}
.el-cascader-node > .el-radio,
.el-radio:last-child {
  display: none;
}
.el-cascader-menu__wrap {
  height: 320px;
}
.el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-select .el-input__inner:focus {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-cascader:not(.is-disabled):hover .el-input__inner {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-select:hover .el-input__inner {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-input__inner:hover {
  border-color: rgba(36, 114, 240, 0.4);
}
.city-box .el-input__inner,
.type-box .el-input__inner {
  background-color: transparent;
  //   color: #00e0ff;
  color: #fff;
  border: 1px solid rgba(36, 114, 240, 0.4);
  //   box-shadow: 0 0 8px 5px rgba(36, 114, 240, 0.4) inset;
}
.el-cascader-node__label {
  overflow: inherit;
}
.el-cascader-node__postfix {
  display: none;
}
.el-cascader-menu {
  min-width: 80px;
}
.el-cascader-node {
  padding: 0 10px 0 10px;
}
// 修改下拉样式

//修改时间
.el-input__prefix {
  display: none;
}
.el-input--prefix .el-input__inner {
  padding-left: 7px;
}
.el-date-editor.el-input {
  width: 100px;
}
.date .el-input__inner {
  background-color: rgba(240, 248, 255, 0);
  border: none;
  //   color: #00e0ff;
  color: #fff;
  cursor: pointer;
  text-align: center;
}
.bg_boder_inner_box {
  //   overflow: hidden;
  span {
    position: absolute;
    left: -1%;
    top: -1%;
    width: 102%;
    height: 102%;
    background: url('../static/income/chart_bg.png') no-repeat;
    background-size: cover;
  }
}
</style>
