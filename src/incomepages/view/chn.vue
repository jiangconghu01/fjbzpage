<template>
  <!-- <div class="chn">
    <div class="top chart bg_boder_box">
      <Title>非账单收入结构分析</Title>
      <Button-group size="small" class="btn-switch">
        <i-button type="primary" :class="[topChartStatus === 'current_month' ? 'current' : '']" @click="switchView('current_month')"> 当月 </i-button>
        <i-button type="primary" :class="[topChartStatus === 'accmulate_num' ? 'current' : '']" @click="switchView('accmulate_num')"> 累计 </i-button>
      </Button-group>
      <div class="bg_boder_inner_box"></div>
      <div id="chn_top_chart" class="chart_container"></div>
    </div>
    <div class="bottom">
      <div class="left chart bg_boder_box">
        <Title>累计非账单收入结构分析</Title>
        <div class="bg_boder_inner_box"></div>
        <div id="chn_bottom_left_chart" class="chart_container"></div>
      </div>
      <div class="right chart bg_boder_box">
        <Title>全省-月度非账单收入时序分析</Title>
        <div class="bg_boder_inner_box"></div>
        <div id="chn_bottom_right_chart" class="chart_container"></div>
      </div>
    </div>
  </div> -->
  <div class="chn">
    <div class="top chart bg_boder_box">
      <Title>非账单收入结构分析</Title>
      <Button-group size="small" class="btn-switch">
        <i-button type="primary" :class="[topChartStatus === 'current_month' ? 'current' : '']" @click="switchView('current_month')"> 当月 </i-button>
        <i-button type="primary" :class="[topChartStatus === 'accmulate_num' ? 'current' : '']" @click="switchView('accmulate_num')"> 累计 </i-button>
      </Button-group>
      <div class="bg_boder_inner_box"><span></span></div>
      <div id="chn_top_chart" class="chart_container"></div>
    </div>
    <div class="bottom">
      <div class="left chart bg_boder_box">
        <Title>累计非账单收入结构分析</Title>
        <div class="bg_boder_inner_box"><span></span></div>
        <div id="chn_bottom_left_chart" class="chart_container"></div>
      </div>
      <div class="right chart bg_boder_box">
        <Title>全省-月度非账单收入时序分析</Title>
        <div class="bg_boder_inner_box"><span></span></div>
        <div id="chn_bottom_right_chart" class="chart_container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '@/components/income.title.vue'
import stack from '@/chartconfig/income/stack.js'
import barLine from '@/chartconfig/income/barline.js'
import line from '@/chartconfig/income/line.js'
import { mapGetters, mapMutations } from 'vuex'
import { getDatesParams, getMonthsArr, sumAarrays } from '../page.util'
export default {
  components: { Title },
  data() {
    return {
      encodes: [],
      topChartStatus: 'current_month',
    }
  },
  computed: {
    ...mapGetters(['month', 'orgCode', 'authCityLevel']),
  },
  watch: {
    month(nv, ov) {
      this.initpage()
    },
    orgCode(nv, ov) {
      this.initpage('sub')
    },
  },
  created() {},
  mounted() {
    this.initpage()
  },
  methods: {
    ...mapMutations(['setChartArr']),
    switchView(p) {
      this.topChartStatus = p
      const month = this.month
      const code = this.orgCode.value
      const type = '0000'
      this.top(month, '59', type)
    },
    async initpage(sub) {
      const month = this.month
      const code = this.orgCode.value
      const type = '0000'
      const encodes = await this.$http.post('/channelBigScreen/modInfoList', {
        viewCode: '107',
        chnlType: type,
      })
      this.encodes = encodes.data.data
      !sub && this.top(month, '59', type)
      !sub && this.bottomLeft(month, '59', type)
      this.bottomRight(month, code, type)
    },
    top(month, code, type) {
      const box = this.$echarts.init(document.getElementById('chn_top_chart'))
      this.setChartArr({ name: 'chart1', val: box })

      let encode = []
      let chartCode = ''
      if (this.topChartStatus === 'current_month') {
        if (this.encodes[0] && this.encodes[0].idxs.length) {
          encode = this.encodes[0].idxs.map((ele) => ele.idxCde)
          chartCode = this.encodes[0].chartCode
        } else {
          encode = ['FZDSR_0000_1_1', 'FZDSR_0000_1_2', 'FZDSR_0000_1_3', 'FZDSR_0000_1_4']
          chartCode = 'FZDSR_0000_1'
        }
      } else {
        if (this.encodes[1] && this.encodes[1].idxs.length) {
          encode = this.encodes[1].idxs.map((ele) => ele.idxCde)
          chartCode = this.encodes[1].chartCode
        } else {
          encode = ['FZDSR_0000_2_1', 'FZDSR_0000_2_2', 'FZDSR_0000_2_3', 'FZDSR_0000_2_4']
          chartCode = 'FZDSR_0000_2'
        }
      }
      //   const cityArr = [code, ...this.$cityLevel.cityCodeArr]
      const c_code = this.authCityLevel[0].children.map((val) => val.value)
      const c_Name = this.authCityLevel[0].children.map((val) => val.orgName)
      const cityArr = [code, ...c_code]
      const xArr = ['全省', ...c_Name]
      const param = JSON.parse(getDatesParams([month], cityArr, encode, chartCode, type))
      const colors_light = ['#4EDBDF', '#FEBD60', '#51CCFF', '#C28DF5']
      const colors = ['#1AA4B9', '#BE8751', '#0798E2', '#8A5AD5']
      this.$http.post('/channelBigScreen/modIdxVOList', param).then((res) => {
        const chart_s = []
        const chart_legend = []
        const array_arr = [] //堆积图二维数组
        encode.forEach((v, i) => {
          const arr = []
          res.data.data.forEach((val) => {
            if (val.idxCde == v) {
              arr.push(Number(val.idxValue) ? Number(val.idxValue) : 0)
            }
          })
          array_arr.push(arr)
        })
        const array_sum = sumAarrays(...array_arr) //堆积图二维数组和
        encode.forEach((ele, i) => {
          const s = {
            name: 'xxxxx',
            type: 'bar',
            stack: '总量',
            data: [],
            barWidth: '30',
            label: {
              show: false,
              position: 'top',
              fontWeight: 'bold',
            },
          }
          res.data.data.forEach((val, index) => {
            if (val.idxCde == ele) {
              s.name = val.idxName
              val.value = val.idxValue
              ;(val.itemStyle = {
                color: index === 0 ? colors_light[i] : colors[i],
              }),
                s.data.push(val)
            }
          })
          s.data = s.data.map((v, ind) => {
            if (array_sum[ind]) {
              v.value = ((v.value / array_sum[ind]) * 100).toFixed(2)
            } else {
              v.value = 0
            }
            return v
          })
          chart_s.push(s)
          chart_legend.push(s.name)
        })
        stack.xAxis[0].data = xArr
        stack.series = chart_s
        stack.legend.data = chart_legend
        box.setOption(stack)
      })
    },
    bottomLeft(month, code, type) {
      const oneBaritem = {
        color: new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: '#5EF6DF', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0798E2', // 100% 处的颜色
            },
          ],
          false
        ),
      }
      const box = this.$echarts.init(document.getElementById('chn_bottom_left_chart'))
      this.setChartArr({ name: 'chart2', val: box })
      let encode = []
      let chartCode = ''
      if (this.encodes[2] && this.encodes[2].idxs.length) {
        encode = this.encodes[2].idxs.map((ele) => ele.idxCde)
        chartCode = this.encodes[2].chartCode
      } else {
        encode = ['FZDSR_0000_3_1']
        chartCode = 'FZDSR_0000_3'
      }
      const c_code = this.authCityLevel[0].children.map((val) => val.value)
      const c_Name = this.authCityLevel[0].children.map((val) => val.orgName)
      const cityArr = [code, ...c_code]
      const xArr = ['全省', ...c_Name]
      const dateArr = getMonthsArr(month.split('-')[0], month.split('-')[1], 13, '-')
      //   const xAxis_d = getMonthsArr(month.split('-')[0], month.split('-')[1], 13, '/')
      const param = JSON.parse(getDatesParams([dateArr[0], dateArr[12]], cityArr, encode, chartCode, type))
      this.$http.post('/channelBigScreen/modIdxVOList', param).then((res) => {
        const curr_d = res.data.data.filter((val) => {
          return val.periodDate == dateArr[12]
        })
        const before_d = res.data.data.filter((val) => {
          return val.periodDate == dateArr[0]
        })
        barLine.series[0].data = curr_d.map((val) => {
          val.value = val.idxValue
          return val
        })
        barLine.xAxis[0].data = xArr
        barLine.series[0].data[0].itemStyle = oneBaritem
        barLine.series[1].name = '截止' + month.split('-')[1] + '月同比%'
        barLine.legend.data[1] = '截止' + month.split('-')[1] + '月同比%'
        barLine.series[1].data = before_d.map((val, index) => {
          let v = 0
          if (Number(val.idxValue)) {
            v = (((curr_d[index].idxValue - val.idxValue) / val.idxValue) * 100).toFixed(2)
          } else if (curr_d[index].idxValue - val.idxValue && Number(val.idxValue) === 0) {
            v = 1
          }
          return v
        })
        box.setOption(barLine)
        const _this = this
        // const orgcode = this.orgCode.value
        box.off('click')
        box.on('click', function (params) {
          if (params.componentSubType === 'bar') {
            _this.bottomRight(month, params.data.accountCode, type)
          }
        })
      })
    },
    bottomRight(month, code, type) {
      const box = this.$echarts.init(document.getElementById('chn_bottom_right_chart'))
      this.setChartArr({ name: 'chart3', val: box })
      let encode = []
      let chartCode = ''
      if (this.encodes[3] && this.encodes[3].idxs.length) {
        encode = this.encodes[3].idxs.map((ele) => ele.idxCde)
        chartCode = this.encodes[3].chartCode
      } else {
        encode = ['FZDSR_0000_4_1', 'FZDSR_0000_4_2', 'FZDSR_0000_4_3', 'FZDSR_0000_4_4']
        chartCode = 'FZDSR_0000_4'
      }
      const dateArr = getMonthsArr(month.split('-')[0], month.split('-')[1], 13, '-')
      const xAxis_d = getMonthsArr(month.split('-')[0], month.split('-')[1], 13, '/')
      const param = JSON.parse(getDatesParams(dateArr, [code], encode, chartCode, type))
      this.$http.post('/channelBigScreen/modIdxVOList', param).then((res) => {
        const chart_s = []
        const chart_legend = []
        encode.forEach((ele) => {
          const s = {
            name: '',
            type: 'line',
            smooth: true,
            symbolSize: 6,
            zlevel: 3,
            data: [],
          }
          res.data.data.forEach((val) => {
            if (val.idxCde == ele) {
              s.name = val.idxName
              val.value = val.idxValue
              s.data.push(val)
            }
          })
          chart_s.push(s)
          chart_legend.push(s.name)
        })
        line.series = chart_s
        line.legend.data = chart_legend
        line.xAxis[0].data = xAxis_d
        box.setOption(line)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.chn {
  width: 100%;
  display: flex;
  flex-direction: column;
  & > div {
    flex: 1;
    margin-left: 20px;
    width: calc(100% - 40px);
    margin-bottom: 15px;
  }
  .chart {
    // background-color: rgba(127, 255, 212, 0.322);
    .chart_container {
      position: absolute;
      top: 32px;
      width: 100%;
      height: calc(100% - 32px);
    }
  }
  .bottom {
    display: flex;
    & > div {
      flex: 1;
    }
    .left {
      margin-right: 8px;
    }
    .right {
      margin-left: 8px;
    }
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
</style>
