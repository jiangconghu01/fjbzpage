<template>
  <div class="chnsrfx">
    <div class="top_left top chart bg_boder_box">
      <Title>存量客户基本包外收入增长</Title>
      <div id="srfx_chart_1" class="chart_box"></div>
    </div>
    <div class="top_right top chart bg_boder_box">
      <Title>存量客户基本包外收入损失</Title>
      <div id="srfx_chart_2" class="chart_box"></div>
    </div>
    <div class="center_left center chart bg_boder_box">
      <Title>存量客户升档收入</Title>
      <div id="srfx_chart_3" class="chart_box"></div>
    </div>
    <div class="center_right center chart bg_boder_box">
      <Title>存量客户降档损失</Title>
      <div id="srfx_chart_4" class="chart_box"></div>
    </div>
    <div class="bottom_left bottom chart bg_boder_box">
      <Title>新增客户收入增长</Title>
      <div id="srfx_chart_5" class="chart_box"></div>
    </div>
    <div class="bottom_right bottom chart bg_boder_box">
      <Title>客户离网收入损失</Title>
      <div id="srfx_chart_6" class="chart_box"></div>
    </div>
  </div>
</template>
<script>
import Title from '@/components/income.title.vue'
import barLine from '@/chartconfig/income/chn/barline.js'
import { getDatesParams, getMonthsArr, formatNumberRgx } from '../../page.util'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { Title },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['month', 'orgCode', 'authCityLevel', 'listAuth', 'incomeType']),
  },
  watch: {
    month(nv, ov) {
      this.initCharts()
    },
    orgCode(nv, ov) {
      this.initCharts()
    },
    incomeType(nv, ov) {
      this.initCharts()
    },
  },
  created() {},
  mounted() {
    this.initCharts()
  },
  methods: {
    ...mapMutations(['setChartArr']),
    async initCharts() {
      const month = this.month
      const code = this.orgCode.value
      const type = '0000'
      //   if (!code) {
      //     return
      //   }
      const encodeRes = await this.$http.post('/channelBigScreen/modInfoList', {
        viewCode: '102',
        chnlType: type,
      })
      const encodes = encodeRes.data.data
      const dateArr = getMonthsArr(month.split('-')[0], month.split('-')[1], 13, '-')
      const xAxisArr = dateArr.map((v) => v.substr(-2) + '月')
      for (let index = 0; index < 6; index++) {
        const i = this.incomeType === 'zq' ? index : index + 6
        const encode = encodes[i].idxs.map((ele) => ele.idxCde)
        const chartCode = encodes[i].chartCode
        const box = this.$echarts.init(document.getElementById('srfx_chart_' + (index + 1)))
        box.clear()
        this.setChartArr({ name: 'chart' + (index + 1), val: box })
        const config = JSON.parse(JSON.stringify(barLine))
        config.xAxis[0].data = xAxisArr
        const param = JSON.parse(getDatesParams(dateArr, [code], encode, chartCode, type))
        this.$http.post('/channelBigScreen/modIdxVOList', param).then((res) => {
          const list = res.data.data
          const barData = []
          const lineData = []
          let maxBarData = 0
          list.forEach((v) => {
            v.value = v.idxValue
            v.name = v.idxName
            if (v.idxCde === encode[0]) {
              barData.push(v)
              maxBarData = Number(v.idxValue) > maxBarData ? v.idxValue : maxBarData
            }
            if (v.idxCde === encode[1]) {
              lineData.push(v)
            }
          })
          const lineData2 = lineData.map((val, index) => {
            val.value = Number(barData[index].value) * 1.15
            return val
          })

          config.series[0].data = barData
          config.series[1].data = lineData2
          config.series[0].itemStyle.normal.label.formatter = function (p) {
            return Number(p.value) === 0 ? '' : formatNumberRgx(Number(p.value / 10000).toFixed(2))
          }
          config.series[1].itemStyle.normal.label.formatter = function (p) {
            return Number(p.value) === 0 ? '' : (p.data.idxValue * 100).toFixed(2) + '%'
          }
          const _this = this
          config.series[0].itemStyle.normal.color = function (params) {
            if (params.dataIndex == 12 && index % 2 === 0) {
              const color = new _this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: 'rgb(223,81,198)' },
                  { offset: 1, color: 'rgb(6,184,238)' },
                ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
              )
              return color
            }
            if (params.dataIndex == 12 && index % 2 === 1) {
              const color = new _this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: 'rgb(245,131,82)' },
                  { offset: 1, color: 'rgb(19,183,230)' },
                ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
              )
              return color
            }
          }
          box.setOption(config)
        })
      }

      //'LSQS_0000_1'
    },
  },
}
</script>
<style lang="scss" scoped>
.chnsrfx {
  width: calc(100% - 40px) !important;
  left: 20px;
  .chart {
    position: absolute;
    height: 32%;
    width: 49.5%;
    .chart_box {
      position: absolute;
      width: 100%;
      height: calc(100% - 10px);
      left: 0;
      bottom: 0;
    }
  }
  .top {
    top: 0;
  }
  .center {
    top: 33%;
  }
  .bottom {
    top: 66%;
  }
  .top_right,
  .center_right,
  .bottom_right {
    right: 0px;
  }
}
</style>
