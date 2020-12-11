<template>
  <div class="zl">
    <div class="left chart bg_boder_box">
      <Title>当月通信服收入结构分析</Title>
      <div class="bg_boder_inner_box"></div>
      <div id="zl_left_box" class="chart_container"></div>
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
import { getDatesParams, getMonthsArr } from '../page.util'
export default {
  components: { Title },
  data() {
    return {
      encodes: [],
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
  },
  methods: {
    ...mapMutations(['setChartArr']),
    async initpage() {
      const month = this.month
      const code = this.orgCode.value
      const type = '0000'
      const encodes = await this.$http.post('/channelBigScreen/modInfoList', {
        viewCode: '106',
        chnlType: type,
      })
      this.encodes = encodes.data.data
      this.rightTop(month, code, type)
      this.rightBottom(month, code, type)
    },
    rightTop(month, code, type) {
      const box = this.$echarts.init(document.getElementById('zl_right_top_chart'))
      this.setChartArr({ name: 'chart1', val: box })
      let encode = []
      let chartCode = ''
      if (this.encodes[4] && this.encodes[4].idxs.length) {
        encode = this.encodes[4].idxs.map((ele) => ele.idxCde)
        chartCode = this.encodes[4].chartCode
      } else {
        encode = ['TFSR_0000_3_1', 'TFSR_0000_3_2', 'TFSR_0000_3_3', 'TFSR_0000_3_4']
        chartCode = 'TFSR_0000_3'
      }
      const year = month.split('-')[0]
      const selectMonth = month.split('-')[1]
      const dateArr = getMonthsArr(year, selectMonth, 13, '-')
      const param = JSON.parse(getDatesParams([dateArr[0], dateArr[12]], [code], encode, chartCode, type))
      this.$http.post('/channelBigScreen/modIdxVOList', param).then((res) => {
        const curr_d = []
        const before_d = []
        res.data.data.forEach((ele) => {
          ele.value = ele.idxValue
          if (ele.periodDate == dateArr[12]) {
            curr_d.push(ele)
          }
          if (ele.periodDate == dateArr[0]) {
            before_d.push(ele)
          }
        })
        zLbar.series[0].data = before_d
        zLbar.series[1].data = curr_d
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
        encode = ['TFSR_0000_4_1', 'TFSR_0000_4_2', 'TFSR_0000_4_3', 'TFSR_0000_4_4']
        chartCode = 'TFSR_0000_4'
      }
      const param = JSON.parse(getDatesParams(dateArr, [code], encode, chartCode, type))
      this.$http.post('/channelBigScreen/modIdxVOList', param).then((res) => {
        const data1 = res.data.data.filter((val) => val.idxCde == encode[0])
        const data2 = res.data.data.filter((val) => val.idxCde == encode[1])
        const data3 = res.data.data.filter((val) => val.idxCde == encode[2])
        const data4 = res.data.data.filter((val) => val.idxCde == encode[3])
        zLstack.series[0].data = data1.map((val) => val.idxValue)
        zLstack.series[1].data = data2.map((val) => val.idxValue)
        zLstack.series[2].data = data3.map((val) => val.idxValue)
        zLstack.series[3].data = data4.map((val) => val.idxValue)
        zLstack.xAxis[0].data = dateArr.map((val) => val.split('-')[1] + '月')
        box.setOption(zLstack)
      })
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
    margin: 0 8px 0 20px;
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
</style>
