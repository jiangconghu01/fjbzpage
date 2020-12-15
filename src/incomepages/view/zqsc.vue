<template>
  <div class="zqsc">
    <div class="left">
      <div class="top chart bg_boder_box">
        <Title>政企产品出账收入</Title>
        <Button-group size="small" class="btn-switch">
          <i-button type="primary" :class="[leftTopStatus === 'current_month' ? 'current' : '']" @click="switchView('top', 'current_month')"> 当月 </i-button>
          <i-button type="primary" :class="[leftTopStatus === 'accmulate_num' ? 'current' : '']" @click="switchView('top', 'accmulate_num')"> 累计 </i-button>
        </Button-group>
        <div class="sum">
          <span class="text">合计</span><span class="number">{{ leftTopSum }}</span>
        </div>
        <div class="bg_boder_inner_box"><span></span></div>
        <div id="left_top_chart" class="chart_container"></div>
      </div>
      <div class="bottom chart bg_boder_box">
        <Title>政企产品折扣统计</Title>
        <Button-group size="small" class="btn-switch">
          <i-button type="primary" :class="[leftBottomStatus === 'current_month' ? 'current' : '']" @click="switchView('bottom', 'current_month')"> 当月 </i-button>
          <i-button type="primary" :class="[leftBottomStatus === 'accmulate_num' ? 'current' : '']" @click="switchView('bottom', 'accmulate_num')"> 累计 </i-button>
        </Button-group>
        <div class="sum">
          <span class="text">合计</span><span class="number">{{ leftBottomSum }}</span>
        </div>
        <div class="bg_boder_inner_box"><span></span></div>
        <div id="left_bottom_chart" class="chart_container"></div>
      </div>
    </div>
    <div class="right">
      <div class="top chart bg_boder_box">
        <Title :title="rightTopTitle">产品出账时序分析-集团电话</Title>
        <div class="bg_boder_inner_box"><span></span></div>
        <div id="right_top_chart" class="chart_container"></div>
      </div>
      <div class="bottom chart bg_boder_box">
        <Title :title="rightBottomTitle">产品折扣时序分析-互联网专线</Title>
        <div class="bg_boder_inner_box"><span></span></div>
        <div id="right_bottom_chart" class="chart_container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '@/components/income.title.vue'
import bar from '@/chartconfig/income/bar.js'
import { mapGetters, mapMutations } from 'vuex'
import { insertStr, addNumberUnit } from '../page.util'
const colors = ['#3E36DD', '#2E59D6', '#3769E7', '#0B87D8', '#0F9BD7', '#0F9BD7', '#1CCAD2', '#23E3D0', '#25EDCF', '#5EF6DF']
const TypeMap = {
  current_month: '1',
  accmulate_num: '2',
}
export default {
  components: { Title },
  data() {
    return {
      viewCode: '108',

      leftTopStatus: 'current_month',
      leftTopSum: 0,
      rightTopTitle: '产品出账时序分析-暂无',
      leftBottomStatus: 'current_month',
      leftBottomSum: 0,
      rightBottomTitle: '产品折扣时序分析-暂无',
    }
  },
  computed: {
    ...mapGetters(['month', 'orgCode', 'isloading']),
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
  },
  methods: {
    ...mapMutations(['setChartArr']),
    switchView(chart, p) {
      const month = this.month.replace('-', '')
      const code = this.orgCode.value
      if (chart === 'top') {
        this.leftTopStatus = p
        this.leftTop(month, code)
      }
      if (chart === 'bottom') {
        this.leftBottomStatus = p
        this.leftBottom(month, code)
      }
    },
    initpage() {
      const month = this.month.replace('-', '')
      //   const month = '202010'
      const code = this.orgCode.value
      this.leftTop(month, code)
      this.leftBottom(month, code)
    },
    leftHandle(month, code, box, type, status) {
      // {"1", "出账"}
      // {"2", "折扣"}
      // {"3", "销售"}
      // {"4", "其他"}
      //{"1", "当前"}
      // {"2", "累计"}

      const config = JSON.parse(JSON.stringify(bar))
      config.series[0].label.formatter = function (p) {
        return addNumberUnit(p.value)
      }
      this.$http.post('/bigScreen/groupProductIncome/top10', { viewCode: this.viewCode, homeCity: code, sumMonth: month, amtType: type, dimensionType: status }).then((res) => {
        const list = res.data.data
        let sum = 0
        let t_list = []
        if (list && list.length > 0) {
          t_list = list.slice(0, 10)
          type === '1' && this.rightTop(month, code, list[0])
          type === '2' && this.rightBottom(month, code, list[0])
        }
        const label = []
        const data = t_list.map((val, index) => {
          sum += Number(val.resultValue)
          label.push({ value: val.productName, id: val.productId })
          val.value = Number(val.resultValue).toFixed(0)
          val.name = val.productName
          val.itemStyle = {
            color: colors[index],
          }
          return val
        })
        const formaterLabel = label.map((val) => {
          let t = val
          if (val.value.length > 4) {
            t.value = insertStr(val.value, 3, '\n')
          }
          return t
        })
        type === '1' && (this.leftTopSum = addNumberUnit(sum))
        type === '2' && (this.leftBottomSum = addNumberUnit(sum))
        config.series[0].data = data
        config.xAxis[0].data = formaterLabel
        box.setOption(config)
        const _this = this
        box.off('click')
        box.on('click', function (params) {
          console.log(params)
          type === '1' && _this.rightTop(month, code, params.data, params.color)
          type === '2' && _this.rightBottom(month, code, params.data, params.color)
        })
      })
    },
    leftTop(month, code) {
      const box = this.$echarts.init(document.getElementById('left_top_chart'))
      this.setChartArr({ name: 'chart1', val: box })
      const status = TypeMap[this.leftTopStatus]
      this.leftHandle(month, code, box, '1', status)
    },
    leftBottom(month, code) {
      const box = this.$echarts.init(document.getElementById('left_bottom_chart'))
      this.setChartArr({ name: 'chart2', val: box })
      const status = TypeMap[this.leftBottomStatus]
      this.leftHandle(month, code, box, '2', status)
    },
    rightTop(month, code, item, itemcolor) {
      const box = this.$echarts.init(document.getElementById('right_top_chart'))
      this.setChartArr({ name: 'chart3', val: box })
      const status = TypeMap[this.leftTopStatus]
      const config = JSON.parse(JSON.stringify(bar))
      config.series[0].label.formatter = function (p) {
        return addNumberUnit(p.value)
      }
      ;(this.rightTopTitle = '产品出账时序分析-' + item.productName),
        this.$http
          .post('/bigScreen/groupProductIncome/periodData13', { viewCode: this.viewCode, homeCity: code, sumMonth: month, amtType: '1', productId: item.productId, dimensionType: status })
          .then((res) => {
            const data = res.data.data.map((val) => {
              val.value = val.resultValue ? Number(val.resultValue).toFixed(0) : 0
              return val
            })
            const xarr = data.map((val) => {
              return (val.sumMonth + '').substr(-2) + '月'
            })
            config.xAxis[0].data = xarr
            config.series[0].data = data
            config.color = [itemcolor ? itemcolor : '#3E36DD']
            box.setOption(config)
          })
    },
    rightBottom(month, code, item, itemcolor) {
      const box = this.$echarts.init(document.getElementById('right_bottom_chart'))
      this.setChartArr({ name: 'chart4', val: box })
      const status = TypeMap[this.leftBottomStatus]
      const config = JSON.parse(JSON.stringify(bar))
      config.series[0].label.formatter = function (p) {
        return addNumberUnit(p.value)
      }
      ;(this.rightBottomTitle = '产品折扣时序分析-' + item.productName),
        this.$http
          .post('/bigScreen/groupProductIncome/periodData13', { viewCode: this.viewCode, homeCity: code, sumMonth: month, amtType: '2', productId: item.productId, dimensionType: status })
          .then((res) => {
            const data = res.data.data.map((val) => {
              val.value = val.resultValue ? Number(val.resultValue).toFixed(0) : 0
              return val
            })
            const xarr = data.map((val) => {
              return (val.sumMonth + '').substr(-2) + '月'
            })
            config.xAxis[0].data = xarr
            config.series[0].data = data
            config.color = [itemcolor ? itemcolor : '#3E36DD']
            box.setOption(config)
          })
    },
  },
}
</script>
<style lang="scss" scoped>
.zqsc {
  width: 100%;
  display: flex;
  //   color: rgba(81, 203, 255, 0.753);
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    .chart {
      flex: 1;
      margin-bottom: 15px;
      .sum {
        position: absolute;
        left: 20px;
        top: 10px;
        width: 120px;
        height: 50px;
        background: url('../../static/income/hj.png') no-repeat;
        background-size: contain;
        span {
          position: absolute;
          font-weight: bold;
        }
        .text {
          left: 9px;
          top: 15px;
        }
        .number {
          left: 49px;
          top: 10px;
          font-size: 16px;
        }
      }
    }
  }
  .left {
    margin: 0 8px 0 20px;
  }
  .right {
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
</style>
