<template>
  <div ref="zlBox" class="zl">
    <div class="left chart bg_boder_box">
      <Title>当月通信服收入结构分析</Title>
      <div class="bg_boder_inner_box"></div>
      <img class="bg_img" src="../../static/income/index/chartbg.png" />
      <div id="zl_left_box" class="chart_container">
        <div class="top">
          <div class="item fzd" :class="[levelCurrent === 'fzd' ? 'current' : '', positionList[0]]" @click="topHandleClick(positionList[0], 'fzd')">
            <div class="circle-text-content">
              <p class="num">{{ leftViewData[2] ? leftViewData[2] : 0 }}</p>
              <p class="unit">万元</p>
              <div class="name">
                <p>CHN市场非</p>
                <p>账单收入</p>
              </div>
            </div>
            <i class="light"></i>
          </div>
          <div class="item wj" :class="[levelCurrent === 'wj' ? 'current' : '', positionList[1]]" @click="topHandleClick(positionList[1], 'wj')">
            <div class="circle-text-content">
              <p class="num">{{ leftViewData[5] ? leftViewData[5] : 0 }}</p>
              <p class="unit">万元</p>
              <div class="name">
                <p>网间结算及</p>
                <p>其他收入</p>
              </div>
            </div>
          </div>
          <div class="item all">
            <div class="circle-text-content">
              <p class="num">{{ leftViewData[0] ? leftViewData[0] : 0 }}</p>
              <p class="unit">万元</p>
              <div class="name">
                <p>通信服收入</p>
              </div>
            </div>
          </div>
          <div class="item zd" :class="[levelCurrent === 'zd' ? 'current' : '', positionList[2]]" @click="topHandleClick(positionList[2], 'zd')">
            <div class="circle-text-content">
              <p class="num">{{ leftViewData[1] ? leftViewData[1] : 0 }}</p>
              <p class="unit">万元</p>
              <div class="name">
                <p>CHN市场</p>
                <p>账单收入</p>
              </div>
            </div>
          </div>
          <div class="item bsc" :class="[levelCurrent === 'bsc' ? 'current' : '', positionList[3]]" @click="topHandleClick(positionList[3], 'bsc')">
            <div class="subtraction"></div>
            <div class="circle-text-content t1">
              <p class="num">{{ leftViewData[3] ? leftViewData[3] : 0 }}</p>
              <p class="unit">万元</p>
              <div class="name">
                <p>B市场收入</p>
              </div>
            </div>
            <div class="circle-text-content t2">
              <p class="num">{{ leftViewData[4] ? leftViewData[4] : 0 }}</p>
              <p class="unit">万元</p>
              <div class="name">
                <p>B市场商品销售</p>
                <p>及其他收入</p>
              </div>
            </div>
          </div>
          <img v-show="levelCurrent === 'zd' || levelCurrent === 'fzd'" class="row_img" src="../../static/income/index/row_down.png" />
        </div>
        <div class="bottom">
          <div class="layer">
            <ul class="level2" :class="[levelCurrent]">
              <li v-show="levelCurrent === 'zd'" class="zd_item">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[6] ? leftViewData[6] : 0 }}</i> <i class="unit">万</i>
                  </p>
                  <p class="name">客户数</p>
                </div>
              </li>
              <li v-show="levelCurrent === 'zd'" class="zd_item calc">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[7] ? leftViewData[7] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">折后ARPU</p>
                </div>
              </li>
              <li v-show="levelCurrent === 'fzd'" class="zd_item">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[20] ? leftViewData[20] : 0 }}</i> <i class="unit">元</i>
                  </p>
                  <p class="name">网内结算</p>
                </div>
              </li>
              <li v-show="levelCurrent === 'fzd'" class="zd_item calc add">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[21] ? leftViewData[21] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">跨期包摊销</p>
                </div>
              </li>
              <li v-show="levelCurrent === 'fzd'" class="zd_item calc add">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[22] ? leftViewData[22] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">其他</p>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="levelCurrent === 'zd'" class="svg-layer">
            <ul class="level3">
              <li class="l3-1">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[8] ? leftViewData[8] : 0 }}</i> <i class="unit">万</i>
                  </p>
                  <p class="name">新增客户数</p>
                </div>
              </li>
              <li class="l3-2 calc" :class="[level4Status === 'left' ? 'current' : '']" @click="level3Clidk('left')">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[9] ? leftViewData[9] : 0 }}</i> <i class="unit">元</i>
                  </p>
                  <p class="name">新增客户数折后ARPU</p>
                </div>
              </li>
              <li class="l3-3">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[10] ? leftViewData[10] : 0 }}</i> <i class="unit">万</i>
                  </p>
                  <p class="name">存量客户数</p>
                </div>
              </li>
              <li class="l3-4 calc" :class="[level4Status === 'right' ? 'current' : '']" @click="level3Clidk('right')">
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[11] ? leftViewData[11] : 0 }}</i> <i class="unit">元</i>
                  </p>
                  <p class="name">存量客户数折后ARPU</p>
                </div>
              </li>
            </ul>
            <ul v-show="level4Status === 'left'" class="level4">
              <li>
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[12] ? leftViewData[12] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">基础套餐折后收入</p>
                </div>
              </li>
              <li>
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[13] ? leftViewData[13] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">可选包折后收入</p>
                </div>
              </li>
              <li>
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[14] ? leftViewData[14] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">套外语言/流量收入</p>
                </div>
              </li>
              <li>
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[15] ? leftViewData[15] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">其他类型收入</p>
                </div>
              </li>
            </ul>
            <ul v-show="level4Status === 'right'" class="level4 right">
              <li>
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[16] ? leftViewData[16] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">基础套餐折后收入</p>
                </div>
              </li>
              <li>
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[17] ? leftViewData[17] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">可选包折后收入</p>
                </div>
              </li>
              <li>
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[18] ? leftViewData[18] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">套外语言/流量收入</p>
                </div>
              </li>
              <li>
                <div class="text-content">
                  <p>
                    <i class="num">{{ leftViewData[19] ? leftViewData[19] : 0 }}</i> <i class="unit">万元</i>
                  </p>
                  <p class="name">其他类型收入</p>
                </div>
              </li>
            </ul>
          </div>
          <svg v-if="levelCurrent === 'zd'" class="svg-frame" viewBox="0 0 532 89" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="all-frame" transform="translate(-429.000000, -504.000000)" fill="none" stroke-width="1">
              <g id="top" transform="translate(429.755126, 504.450880)" stroke="rgba(88, 160, 251, 0.7)" stroke-width="1">
                <polyline id="path" points="137.935044 2.84217094e-14 137.935044 11.2271588 298.086128 11.2271588 298.086128 2.84217094e-14"></polyline>
                <polyline id="path-2" points="218.010586 11.2271588 218.010586 16.8908734 -4.84080744e-14 16.8908734 -5.68434189e-14 27.1650751"></polyline>
                <polyline id="path-3" points="218.010586 16.8908734 437.937163 16.8908734 437.937163 27.1650751"></polyline>
                <line id="path-4" x1="140.284452" y1="16.8908734" x2="140.284452" y2="27.1650751"></line>
                <line id="path-5" x1="298.086128" y1="16.8908734" x2="298.086128" y2="27.1650751"></line>
              </g>
              <g v-if="level4Status === 'left'" id="b_left" transform="translate(479.551612, 568.610820)" stroke="rgba(88, 190, 251, 0.5)">
                <polyline id="path-6" points="90.4879662 5.68434189e-14 90.4879662 11.8828824 324.874308 11.8828824 324.874308 23.8274033"></polyline>
                <line id="path-7" x1="217.110408" y1="11.9137016" x2="217.110408" y2="23.8274033"></line>
                <line id="path-8" x1="108.675149" y1="11.9137016" x2="108.675149" y2="23.8274033"></line>
                <polyline id="path-9" points="90.4879662 11.9137016 -2.84217094e-14 11.9137016 -2.84217094e-14 23.8274033"></polyline>
              </g>
              <g v-if="level4Status === 'right'" id="b_right" transform="translate(588.226761, 568.610820)" stroke="rgba(88, 190, 251, 0.8)">
                <polyline id="path-10" points="279.528365 0 279.528365 11.9137016 2.84217094e-14 11.9137016 2.84217094e-14 23.8274033"></polyline>
                <line id="path-11" x1="108.435259" y1="12" x2="108.435259" y2="23.8274033"></line>
                <line id="path-12" x1="216.324851" y1="12" x2="216.324851" y2="23.8274033"></line>
                <polyline id="path-13" points="279.528365 11.9137016 371.773239 11.9137016 371.773239 24"></polyline>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top chart bg_boder_box">
        <Title>累计通信服务收入分析</Title>
        <div class="bg_boder_inner_box"></div>
        <div id="zl_right_top_chart" class="chart_container"></div>
      </div>
      <div class="bottom chart bg_boder_box">
        <Title>月度四轮收入时序分析</Title>
        <div class="bg_boder_inner_box"></div>
        <div id="zl_right_bottom_chart" class="chart_container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '@/components/income.title'
import zLstack from '@/chartconfig/income/zl.stack.js'
import zLbar from '@/chartconfig/income/zl.bar.js'
import { mapGetters, mapMutations } from 'vuex'
import { getDatesParams, getMonthsArr, sumAarrays } from '../page.util'
export default {
  components: { Title },
  data() {
    return {
      encodes: [],
      levelCurrent: 'zd',
      level4Status: 'left',
      leftViewData: [],
      itemList: ['fzd', 'wj', 'zd', 'bsc'],
      positionList: ['sw1', 'sw2', 'sw3', 'sw4'],
    }
  },
  computed: {
    ...mapGetters(['month', 'orgCode']),
  },
  watch: {
    month(nv, ov) {
      this.initpage()
    },
    orgCode(nv, ov) {
      this.initpage()
    },
  },
  created() {},
  mounted() {
    this.initpage()
    this.risezeFrame()
  },
  methods: {
    ...mapMutations(['setChartArr']),
    topHandleClick(p, item) {
      const click_item = item
      const click_item_postion = p
      const index = this.itemList.indexOf(click_item)

      const old_item = this.levelCurrent
      const old_item_positon = this.positionList.indexOf('sw3')
      if (click_item === old_item) {
        const month = this.month
        const code = this.orgCode.value
        if (item === 'zd') {
          window.open(`/bigScreen/income/gotoScheme?viewCode=101&date=${month}&orgCode=${code}`)
        } else if (item === 'fzd') {
          this.$router.push({ name: 'chn' })
        } else if (item === 'bsc') {
          this.$router.push({ name: 'zqsc' })
        }
        return
      }
      this.positionList[old_item_positon] = click_item_postion
      this.positionList[index] = 'sw3'
      this.levelCurrent = click_item
    },
    level3Clidk(p) {
      this.level4Status = p
    },
    async initpage() {
      const month = this.month
      const code = this.orgCode.value
      const type = '0000'
      const encodes = await this.$http.post('/channelBigScreen/modInfoList', {
        viewCode: '106',
        chnlType: type,
      })
      this.encodes = encodes.data.data
      this.leftView(month, code, type)
      this.rightTop(month, code, type)
      this.rightBottom(month, code, type)
    },
    leftView(month, code, type) {
      let p = []
      for (let index = 0; index < 5; index++) {
        const element = this.encodes[index]
        const encode = element.idxs.map((ele) => ele.idxCde)
        const chartCode = element.chartCode
        const param = JSON.parse(getDatesParams([month], [code], encode, chartCode, type))
        p = p.concat(param)
      }
      this.$http.post('/channelBigScreen/modIdxVOList', p).then((res) => {
        const resdata = res.data.data
        if (resdata) {
          this.leftViewData = resdata.map((val) => {
            let value = '0.00'
            if (Number(val.idxValue)) {
              if (val.idxCde === 'TFSR_0000_2_4' || val.idxCde === 'TFSR_0000_2_6' || val.idxCde === 'TFSR_0000_2_2') {
                value = Number(val.idxValue).toFixed(2)
              } else {
                value = (val.idxValue / 10000).toFixed(2)
              }
            }
            return value
          })
        }
      })
    },
    rightTop(month, code, type) {
      const box = this.$echarts.init(document.getElementById('zl_right_top_chart'))
      this.setChartArr({ name: 'chart1', val: box })
      let encode = []
      let chartCode = ''
      if (this.encodes[5] && this.encodes[5].idxs.length) {
        encode = this.encodes[5].idxs.map((ele) => ele.idxCde)
        chartCode = this.encodes[5].chartCode
      } else {
        encode = ['TFSR_0000_6_1', 'TFSR_0000_6_2', 'TFSR_0000_6_3', 'TFSR_0000_6_4']
        chartCode = 'TFSR_0000_6'
      }
      const year = month.split('-')[0]
      const selectMonth = month.split('-')[1]
      const dateArr = getMonthsArr(year, selectMonth, 13, '-')
      const param = JSON.parse(getDatesParams([dateArr[0], dateArr[12]], [code], encode, chartCode, type))
      this.$http.post('/channelBigScreen/modIdxVOList', param).then((res) => {
        const curr_d = []
        const before_d = []
        let sum_curr = 0
        let sum_before = 0
        res.data.data.forEach((ele) => {
          ele.value = ele.idxValue
          if (ele.periodDate == dateArr[12]) {
            sum_curr += Number(ele.idxValue) ? Number(ele.idxValue) : 0
            curr_d.push(ele)
          }
          if (ele.periodDate == dateArr[0]) {
            sum_before += Number(ele.idxValue) ? Number(ele.idxValue) : 0
            before_d.push(ele)
          }
        })

        zLbar.series[0].data = before_d.map((val) => {
          if (sum_before) {
            val.value = ((val.value / sum_before) * 100).toFixed(2)
          }
          return val
        })
        zLbar.series[1].data = curr_d.map((val) => {
          if (sum_curr) {
            val.value = ((val.value / sum_curr) * 100).toFixed(2)
          }
          return val
        })
        zLbar.series[1].name = year + '年截止' + selectMonth + '月'
        zLbar.legend.data[1] = year + '年截止' + selectMonth + '月'
        box.setOption(zLbar)
      })
    },
    rightBottom(month, code, type) {
      const box = this.$echarts.init(document.getElementById('zl_right_bottom_chart'))
      this.setChartArr({ name: 'chart2', val: box })
      const year = month.split('-')[0]
      const selectMonth = month.split('-')[1]
      const dateArr = getMonthsArr(year, selectMonth, 13, '-')

      let encode = []
      let chartCode = ''
      if (this.encodes[6] && this.encodes[6].idxs.length) {
        encode = this.encodes[6].idxs.map((ele) => ele.idxCde)
        chartCode = this.encodes[6].chartCode
      } else {
        encode = ['TFSR_0000_7_1', 'TFSR_0000_7_2', 'TFSR_0000_7_3', 'TFSR_0000_7_4']
        chartCode = 'TFSR_0000_7'
      }
      const param = JSON.parse(getDatesParams(dateArr, [code], encode, chartCode, type))
      this.$http.post('/channelBigScreen/modIdxVOList', param).then((res) => {
        const data1 = res.data.data.filter((val) => val.idxCde == encode[0]).map((val) => Number(val.idxValue).toFixed(2))
        const data2 = res.data.data.filter((val) => val.idxCde == encode[1]).map((val) => Number(val.idxValue).toFixed(2))
        const data3 = res.data.data.filter((val) => val.idxCde == encode[2]).map((val) => Number(val.idxValue).toFixed(2))
        const data4 = res.data.data.filter((val) => val.idxCde == encode[3]).map((val) => Number(val.idxValue).toFixed(2))
        const sum = sumAarrays(data1, data2, data3, data4)

        zLstack.series[0].data = data1.map((val) => {
          return (val / 100000000).toFixed(2)
        })
        zLstack.series[1].data = data2.map((val) => {
          return (val / 100000000).toFixed(2)
        })
        zLstack.series[2].data = data3.map((val) => {
          return (val / 100000000).toFixed(2)
        })
        zLstack.series[3].data = data4.map((val, index) => {
          return {
            name: '',
            value: (val / 100000000).toFixed(2),
            value2: (sum[index] / 100000000).toFixed(2),
          }
        })
        zLstack.xAxis[0].data = dateArr.map((val) => val.split('-')[1] + '月')
        box.setOption(zLstack)
      })
    },
    risezeFrame() {
      const box_h = this.$refs['zlBox'].offsetHeight
      const mu_h = 610
      const scale = box_h / mu_h
      if (scale < 1 || scale > 1.1) {
        const dom = document.getElementById('zl_left_box')
        dom.style.transform = `scale(${scale})`
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.zl {
  width: 100%;
  display: flex;
  //   color: rgba(81, 203, 255, 0.753);
  & > div {
    display: flex;
    flex-direction: column;
    .chart {
      flex: 1;
      margin-bottom: 15px;
      .sum {
        position: absolute;
        left: 20px;
        top: 25px;
        width: 100px;
        height: 40px;
        background: url('../../static/income/hj.png') no-repeat;
        background-size: contain;
        span {
          position: absolute;
          font-weight: bold;
        }
        .text {
          left: 7px;
          top: 10px;
        }
        .number {
          left: 45px;
          top: 6px;
          font-size: 16px;
        }
      }
    }
  }
  .left {
    flex: 13;
    margin: 0 8px 15px 20px;
    position: relative;
    .bg_img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .top {
      height: 60%;
      position: relative;
      .item {
        width: 121px;
        height: 132px;
        background: url('../../static/income/index/item.png') no-repeat;
        background-size: cover;
        position: absolute;
        cursor: pointer;
        transform-style: preserve-3d;
        transition: all 800ms cubic-bezier(0.26, 0.86, 0.44, 0.985) 0s;
        transform: translateX(-50%);
        overflow: hidden;
        &.current {
          background: url('../../static/income/index/item_current.png') no-repeat;
          background-size: cover;
        }
        &:hover {
          color: rgb(255, 197, 7);
        }
        // .light {
        //   cursor: pointer;
        //   display: inline-block;
        //   position: absolute;
        //   width: 20%;
        //   height: 50%;
        //   left: -130%;
        //   top: -100%;
        //   transition: 0.5s;
        //   transform: skewx(-25deg);
        //   background-image: linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
        // }
        // &:hover .light {
        //   left: 130%;
        //   top: 100%;
        // }
      }
      .all {
        left: 50%;
        bottom: 45%;
        width: 175px;
        height: 190px;
        background: url('../../static/income/index/center.jpg') no-repeat;
        background-size: cover;
        &:hover {
          .circle-text-content .name p {
            color: rgb(255, 197, 7);
          }
        }
        .circle-text-content {
          padding-top: 125px;
          .name {
            p {
              font-size: 30px;
              color: rgba(255, 255, 255, 0.805);
            }
            text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.05), 3px 4px 3px rgba(0, 0, 0, 0.205);
          }
          .num {
            // transform: scale(0.8, 1) translateX(10%);
            transform: scale(0.8, 1);
            height: 60px;
            line-height: 60px;
            font-size: 50px;
            font-weight: bold;
            text-shadow: 2px 3px 26px rgba(255, 255, 255, 1);
          }
          .unit {
            margin-left: 5px;
            font-size: 24px;
            font-weight: bold;
          }
        }
      }
      .bsc {
        width: 168px;
        height: 124px;
        background: url('../../static/income/index/item2.png') no-repeat;
        background-size: cover;

        &.current {
          background: url('../../static/income/index/item2_current.png') no-repeat;
          background-size: cover;
        }
        &.sw4 {
          width: 194px;
          height: 144px;
          .subtraction {
            width: 15px;
            height: 4px;
            left: 47%;
            top: 44%;
          }
          .t1 {
            left: -17%;
            top: 10px;
            transform: scale(0.48);
          }
          .t2 {
            left: 32%;
            top: 20px;
            transform: scale(0.4);
          }
        }
        .subtraction {
          width: 10px;
          height: 3px;
          position: absolute;
          background: rgb(255, 255, 255);
          left: 48%;
          top: 43%;
        }
        .t1 {
          left: -14%;
          top: 5px;
          transform: scale(0.45);
        }
        .t2 {
          left: 35%;
          top: 14px;
          transform: scale(0.37);
          .num {
            color: #e369d3;
          }
          .unit {
            color: #e369d3;
          }
        }
      }
      .sw1 {
        left: 18%;
        bottom: 19%;
        // animation: bounce-in-top 2s infinite 0s;
      }
      .sw2 {
        left: 30%;
        bottom: 40%;
        transform: perspective(600px) translateX(-50%) translateZ(-120px);
        // animation: bounce-in-top2 2.3s infinite 0s;
      }
      .sw3 {
        left: 50%;
        bottom: 2%;
        transform: perspective(600px) translateX(-50%) translateZ(10px);
      }
      .sw4 {
        left: 75%;
        bottom: 32%;
        transform: perspective(600px) translateX(-50%) translateZ(-20px);
        // animation: bounce-in-top4 2.6s infinite 0s;
      }
      .row_img {
        width: 16px;
        position: absolute;
        left: calc(50% - 1px);
        // left: 50%;
        bottom: -16px;
        animation: bounce-in-top 1.5s infinite 0s;
        transition: display 0.9s;
      }
      .circle-text-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
        padding-top: 55px;
        p {
          text-align: center;
          font-size: 22px;
          font-weight: bold;
          text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.05), 3px 4px 3px rgba(0, 0, 0, 0.205);
        }
        .name {
          //   color: rgba(255, 255, 255, 0.805);
          text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.05), 3px 4px 3px rgba(0, 0, 0, 0.205);
        }
        .num {
          height: 40px;
          line-height: 40px;
          font-size: 38px;
          font-weight: bold;
        }
        .unit {
          margin-left: 5px;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .bottom {
      height: 40%;
      position: relative;
      .svg-frame,
      .svg-layer {
        width: 532px;
        height: 89px;
        position: absolute;
        left: calc(50% + 48px);
        top: 75px;
        transform: translateX(-50%);
      }
      .svg-layer {
        z-index: 1;
        .level3 {
          li {
            position: absolute;
            width: 129px;
            height: 50px;
            background: url('../../static/income/index/l3.png') no-repeat;
            background-size: cover;
            top: 22px;
            &.current {
              background: url('../../static/income/index/l3_current.png') no-repeat;
              background-size: cover;
            }
          }
          .l3-1 {
            left: -70px;
          }
          .l3-2 {
            left: 72px;
          }
          .l3-3 {
            left: 230px;
          }
          .l3-4 {
            left: 372px;
          }
          .calc {
            cursor: pointer;
            &::before {
              content: '';
              display: block;
              width: 11px;
              height: 11px;
              position: absolute;
              left: -10px;
              top: 18px;
              background: url('../../static/income/index/add.png') no-repeat;
              background-size: cover;
            }
          }
        }
        .level4 {
          position: absolute;
          bottom: -41px;
          left: -25px;
          display: flex;
          width: 480px;
          &.right {
            left: 90px;
          }
          li {
            width: 119px;
            height: 50px;
            background: url('../../static/income/index/l4_new.png') no-repeat;
            // background-size: 100%;
            // background-position: 5px 0px;
            background-size: contain;
            position: relative;
            .text-content {
              padding-top: 15px;
              p {
                font-size: 19px;
              }
              .num {
                font-size: 26px;
              }
              .name {
                color: rgba(255, 255, 255, 0.905);
              }
            }
          }
        }
      }
      .layer {
        position: relative;

        .level2 {
          width: 100%;
          position: absolute;
          left: 50%;
          top: 10px;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          &.fzd {
            top: 25px;
          }
          li {
            width: 132px;
            height: 67px;
            background: url('../../static/income/index/l2.png') no-repeat;
            background-size: cover;
            position: relative;
            .text-content {
              padding-top: 25px;
              p {
                height: 48px;
                line-height: 48px;
                font-size: 26px;
              }
              .num {
                font-size: 42px;
              }
              .name {
                color: rgba(255, 255, 255, 0.855);
              }
              .unit {
                margin-left: 5px;
                font-size: 20px;
              }
            }
          }
          .calc {
            margin-left: 35px;
            position: relative;
            &::before {
              content: '';
              display: block;
              width: 15px;
              height: 15px;
              position: absolute;
              left: -23px;
              top: 25px;
              background: url('../../static/income/index/add.png') no-repeat;
              background-size: cover;
            }
            &.add::before {
              transform: rotate(45deg);
            }
          }
        }
      }
      .text-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
        padding-top: 20px;
        p {
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          height: 30px;
          line-height: 30px;
          text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.05), 3px 4px 3px rgba(0, 0, 0, 0.205);
        }
        .name {
          color: rgba(255, 255, 255, 0.805);
          text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.05), 3px 4px 3px rgba(0, 0, 0, 0.205);
        }
        .num {
          font-size: 28px;
          font-weight: bold;
        }
        .unit {
          margin-left: 5px;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  .right {
    flex: 7;
    margin: 0 20px 0 8px;
  }
  .chart_container {
    position: absolute;
    top: 32px;
    width: 100%;
    height: calc(100% - 32px);
  }
}
</style>
<style lang="scss">
.ivu-btn-primary {
  background-color: rgba(4, 4, 112, 0);
  span {
    font-weight: bold;
  }
}
.ivu-btn-group-small > .ivu-btn {
  padding: 1px 12px;
  font-size: 12px;
  border-radius: 1px;
}
.btn-switch {
  position: absolute;
  left: 50%;
  top: 42px;
  transform: translateX(-50%);
  z-index: 1;

  .ivu-btn-primary {
    border-color: #29bee398;
    color: #2795da;
    span {
      font-weight: bold;
    }
  }
  .current.ivu-btn-primary {
    color: #fff;
    //   background-color: #f90;
    //   border-color: #f90;
    background-color: rgba(16, 100, 204, 0.78);
    border-color: #29bde3;
  }
}
@keyframes bounce-in-top {
  0% {
    transform: translateX(-50%) translateY(0px);
    animation-timing-function: ease-in;
  }
  40% {
    transform: translateX(-50%) translateY(-3px);
    animation-timing-function: ease-in;
  }
  65% {
    transform: translateX(-50%) translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateX(-50%) translateY(-5px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateX(-50%) translateY(0);
    animation-timing-function: ease-out;
  }
}
@keyframes bounce-in-top2 {
  0% {
    transform: perspective(600px) translateX(-50%) translateZ(-120px) translateY(0px);
    animation-timing-function: ease-in;
  }
  40% {
    transform: perspective(600px) translateX(-50%) translateZ(-120px) translateY(-3px);
    animation-timing-function: ease-in;
  }
  65% {
    transform: perspective(600px) translateX(-50%) translateZ(-120px) translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: perspective(600px) translateX(-50%) translateZ(-120px) translateY(-5px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: perspective(600px) translateX(-50%) translateZ(-120px) translateY(0);
    animation-timing-function: ease-out;
  }
}
@keyframes bounce-in-top4 {
  0% {
    transform: perspective(600px) translateX(-50%) translateZ(-20px) translateY(0px);
    animation-timing-function: ease-in;
  }
  40% {
    transform: perspective(600px) translateX(-50%) translateZ(-20px) translateY(-3px);
    animation-timing-function: ease-in;
  }
  65% {
    transform: perspective(600px) translateX(-50%) translateZ(-20px) translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: perspective(600px) translateX(-50%) translateZ(-20px) translateY(-5px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: perspective(600px) translateX(-50%) translateZ(-20px) translateY(0);
    animation-timing-function: ease-out;
  }
}
</style>
