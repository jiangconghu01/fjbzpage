<template>
  <div class="routercompont">
    <ul class="city-list">
      <li v-for="(item, index) in citys" :key="item">
        <span class="rect" :style="{ backgroundColor: colors[index] }"></span>
        <span class="text">{{ item }}</span>
      </li>
    </ul>
    <div class="top">
      <div class="item bg_boder_box">
        <Title> <slot name="title1"></slot></Title>
        <div id="top_chart_1" class="chart_box"></div>
        <div class="sum">
          <span class="text">合计</span><span class="number">{{ sumList.sum1 }}</span>
        </div>
      </div>
      <div class="item bg_boder_box">
        <Title> <slot name="title2"></slot></Title>
        <div id="top_chart_2" class="chart_box"></div>
        <div class="sum">
          <span class="text">合计</span><span class="number">{{ sumList.sum2 }}</span>
        </div>
      </div>
      <div class="item bg_boder_box">
        <Title> <slot name="title3"></slot></Title>
        <div id="top_chart_3" class="chart_box"></div>
        <div class="sum">
          <span class="text">合计</span><span class="number">{{ sumList.sum3 }}</span>
        </div>
      </div>
      <div class="item bg_boder_box">
        <Title> <slot name="title4"></slot></Title>
        <div id="top_chart_4" class="chart_box"></div>
        <div class="sum">
          <span class="text">合计</span><span class="number">{{ sumList.sum4 }}</span>
        </div>
      </div>
    </div>
    <div class="bottom bg_boder_box">
      <Title :title="bottomTitle"> {{ bottomTitle }}</Title>
      <div id="bottom_chart" class="chart_box"></div>
      <div class="selector">
        <el-select v-model="value" placeholder="请选择" @change="selectCity">
          <el-option v-for="item in selectItems" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '@/components/income.title.vue'
import Bar from '@/chartconfig/income/chn/bar.js'
import Stack from '@/chartconfig/income/chn/stack.js'
import { formatNumberRgx } from '../../page.util'
import { mapGetters, mapMutations } from 'vuex'
const dimensionType = [{ type: '1' }, { type: '2' }]
const xzlwType = [
  { name: '新增用户', value: '2' },
  { name: '离网', value: '6' },
]
const clkhType = [
  { name: '存量升档', value: '3' },
  { name: '存量降档', value: '4' },
]
const titles = {
  t_1_2: '新增客户数',
  t_2_2: '新增客户收入',
  t_1_6: '离网客户数',
  t_2_6: '离网客户收入',
  t_1_3: '升档客户数',
  t_2_3: '升档客户收入',
  t_1_4: '降档客户数',
  t_2_4: '降档客户收入',
}

const pageType = { xzlw: '103', clkh: '104' }
export default {
  components: { Title },
  props: {
    pageName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colors: Stack.color,
      citys: [],
      value: '591',
      bottomType: this.pageName === 'xzlw' ? '2' : '3',
      dimensionType: this.pageName === 'xzlw' ? '1' : '2',
      bottomId: '',
      bottomTitle: '',
      sumList: {
        sum1: 0,
        sum2: 0,
        sum3: 0,
        sum4: 0,
      },
    }
  },
  computed: {
    ...mapGetters(['month', 'orgCode', 'authCityLevel', 'listAuth', 'incomeType']),
    selectItems() {
      const ciytlist = this.$cityLevel.children.map((v) => {
        v.label = v.name.replace('市', '')
        v.value = v.orgCode + ''
        return v
      })

      return [{ label: '福建', value: '59' }, ...ciytlist]
    },
  },
  watch: {
    month(nv, ov) {
      this.initTopCharts()
    },
    incomeType(nv, ov) {
      this.initTopCharts()
    },
  },
  created() {},
  mounted() {
    this.initTopCharts()
  },
  methods: {
    ...mapMutations(['setChartArr']),
    selectCity(val) {
      this.initBottomChart()
    },
    initTopCharts() {
      const month = this.month.replace('-', '')
      //   const code = this.orgCode.value
      const code = '59'
      const urlMap = {
        zq: '/bigScreen/income/detailTopN',
        zh: '/bigScreen/income/discDetailTopN',
      }
      let pageDatas = this.pageName === 'xzlw' ? xzlwType : clkhType
      dimensionType.forEach((dtype, dindex) => {
        pageDatas.forEach((ele, outindex) => {
          this.$http.post(urlMap[this.incomeType], { viewCode: pageType[this.pageName], orgCode: code, sumMonth: month, dimensionType: dtype.type, userType: ele.value }).then((res) => {
            const list = res.data.data
            //设置bottom图表默认值
            if (dindex === 0 && outindex === 0 && list) {
              const defaultBottom = list[0]
              //   this.value = defaultBottom.orgCode
              this.value = '59'
              this.bottomId = defaultBottom.brandId
              this.bottomTitle = titles['t_' + dtype.type + '_' + ele.value] + defaultBottom.productName + '变动分析'
              const box = this.$echarts.init(document.getElementById('bottom_chart'))
              box.clear()
              this.initBottomChart()
            }
            //------
            const target = {}
            const xObj = {}
            //客户数1和3图，收入2和4图
            const chartIndexs = dtype.type === '1' ? [1, 3] : [2, 4]
            const box = this.$echarts.init(document.getElementById('top_chart_' + chartIndexs[outindex]))
            box.clear()
            if (!list || list.length === 0) {
              this.sumList['sum' + chartIndexs[outindex]] = 0
              return
            }
            let chartsum = 0
            let columnSum = 0
            list.forEach((val) => {
              val.name = val.orgName
              val.value = Math.abs(val.resultValue ? val.resultValue : 0)
              val.dimensionType = dtype.type
              val.userType = ele.value
              chartsum += val.resultValue ? Number(val.resultValue) : 0
              if (!target[val.name]) {
                target[val.name] = [val]
              } else {
                target[val.name].push(val)
              }
              if (!xObj[val.productName]) {
                xObj[val.productName] = val.resultValue ? Number(val.resultValue) : 0
              } else {
                xObj[val.productName] += val.resultValue ? Number(val.resultValue) : 0
              }
            })
            const series = []
            const xAxis = Object.keys(xObj)
            this.citys = Object.keys(target)
            const sLength = this.citys.length
            Object.keys(target).forEach((ele) => {
              const data = xAxis.map((val) => {
                let t = { name: ele.name, productName: val, value: 0 }
                target[ele].forEach((v) => {
                  if (val === v.productName) {
                    t = v
                  }
                })
                t.sLength = sLength
                t.sum = xObj[val]
                return t
              })
              series.push({
                name: ele,
                type: 'bar',
                stack: 'number',
                data: data,
                barWidth: 20,
                label: {
                  show: true,
                  position: 'top',
                  fontWeight: 'bold',
                  color: '#fff',
                  formatter: function (p) {
                    if (p.seriesIndex === p.data.sLength - 1) {
                      return formatNumberRgx((p.data.sum / 10000).toFixed(2))
                    } else {
                      return ''
                    }
                  },
                },
              })
            })

            console.log(series)

            this.setChartArr({ name: 'chart' + chartIndexs[outindex], val: box })
            this.sumList['sum' + chartIndexs[outindex]] = formatNumberRgx(Number(chartsum / 10000).toFixed(2))
            const config = JSON.parse(JSON.stringify(Stack))
            config.series = series
            config.xAxis[0].data = xAxis
            // config.xAxis[0].axisLabel.formatter = function (p) {
            //   const params = p.split('（')
            //   let d = params[0]
            //   if (params.length > 1) {
            //     d = params[0] + '\n（' + params[1]
            //   }
            //   return d
            // }
            config.xAxis[0].axisLabel.formatter = function (params) {
              var newParamsName = '' // 最终拼接成的字符串
              var paramsNameNumber = params.length // 实际标签的个数
              var provideNumber = 6 // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
              /**
               * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
               */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = '' // 表示每一次截取的字符串
                  var start = p * provideNumber // 开始截取的位置
                  var end = start + provideNumber // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr // 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params
              }
              //将最终的字符串返回
              return newParamsName
            }
            config.tooltip.formatter = function (p) {
              let tooltip = '<p>' + p[0].axisValue + '</p>'
              for (let index = p.length - 1; index >= 0; index--) {
                const ele = p[index]
                tooltip += '<p>' + ele.marker + ele.seriesName + ':' + formatNumberRgx((ele.data.value / 10000).toFixed(2)) + '</p>'
              }
              return tooltip
            }
            box.setOption(config)
            const _this = this
            box.off('click')
            box.on('click', function (p) {
              console.log(p)
              //   _this.value = p.data.orgCode
              if (p.data.productName === '其他') {
                return
              }
              _this.value = '59'
              _this.bottomId = p.data.brandId
              _this.bottomType = p.data.userType
              _this.dimensionType = p.data.dimensionType
              _this.bottomTitle = titles['t_' + p.data.dimensionType + '_' + p.data.userType] + p.data.productName + '变动分析'
              _this.initBottomChart()
            })
            //请求结束
          })
        })
      })
    },
    initBottomChart() {
      const month = this.month.replace('-', '')
      const code = this.value
      const type = this.bottomType
      const dimensionType = this.dimensionType
      const id = this.bottomId
      const urlMap = {
        zq: '/bigScreen/income/periodIncomeData',
        zh: '/bigScreen/income/discPeriodIncomeData',
      }
      this.$http.post(urlMap[this.incomeType], { viewCode: pageType[this.pageName], orgCode: code, sumMonth: month, dimensionType: dimensionType, userType: type, brandId: id }).then((res) => {
        const list = res.data.data
        const box = this.$echarts.init(document.getElementById('bottom_chart'))
        box.clear()
        if (list.length > 0) {
          Bar.xAxis[0].data = list.map((v) => {
            return (v.sumMonth + '').substr(-2) + '月'
          })
          Bar.series[0].data = list.map((v) => {
            v.value = v.resultValue ? Math.abs(Number(v.resultValue)) : 0
            v.value1 = v.resultValue ? v.resultValue : 0
            return v
          })
          this.setChartArr({ name: 'chart5', val: box })
          box.setOption(Bar)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.routercompont {
  left: 20px;
  & > div {
    position: absolute;
    width: 100%;
  }
  .city-list {
    position: absolute;
    right: 55px;
    top: -2px;
    display: flex;
    li {
      display: flex;
      align-items: center;
      margin-left: 10px;
      .rect {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: chartreuse;
      }
      .text {
        margin-left: 5px;
        font-size: 14px;
      }
    }
  }
  .top {
    height: calc(50% - 30px);
    top: 20px;
    display: flex;
    justify-content: space-between;
    .item {
      width: 24.5%;
      .chart_box {
        position: absolute;
        width: 100%;
        height: calc(100% - 40px);
        left: 0;
        bottom: 0;
      }
    }
  }
  .bottom {
    height: calc(50% - 20px);
    bottom: 15px;
    .chart_box {
      position: absolute;
      width: 100%;
      height: calc(100% - 40px);
      left: 0;
      bottom: 0;
    }
    .selector {
      position: absolute;
      right: 5%;
      z-index: 1;
      top: 5px;
      /deep/ .el-input__inner {
        background: url('../../../static/income/index/select.png') no-repeat;
        background-size: contain;
        color: #14b2f0;
        border-color: rgba(0, 0, 0, 0);
        height: 32px;
        width: 120px;
      }
    }
  }
  .sum {
    position: absolute;
    left: 8px;
    top: 25px;
    width: 110px;
    height: 50px;
    background: url('../../../static/income/hj.png') no-repeat;
    background-size: contain;
    span {
      position: absolute;
      //   font-weight: bold;
    }
    .text {
      left: 9px;
      top: 13px;
    }
    .number {
      left: 50px;
      top: 8px;
      font-size: 16px;
      transform: scale(0.9, 1);
      transform-origin: left top;
    }
  }
}
</style>
