import echarts from 'echarts'
import { addNumberUnit } from '../../incomepages/page.util'
const fontColor = '#fff'
const colors = ['#20C5CA', '#EDA148', '#09B6FD', '#AC69EC']
const linecolor = '#ECD867'

const xarr = Array.from({ length: 13 }, (v, k) => {
  return k < 10 ? '0' + k + '月' : k + '月'
})
function getData() {
  let chartData = xarr.map((val) => {
    return {
      name: val,
      value: (Math.random() * 1000).toFixed(0),
    }
  })
  return chartData
}

let xData = xarr
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: '40',
    right: '8%',
    left: '80',
    bottom: '50',
  },
  legend: {
    textStyle: {
      color: fontColor,
      fontSize: 12,
    },
    right: 10,
    itemWidth: 15,
    itemHeight: 10,
    data: ['网内结算收入', '流量递延收入', '积分递延收入', '其他'],
  },
  xAxis: [
    {
      type: 'category',
      data: xData,
      axisLine: {
        lineStyle: {
          color: 'rgba(63, 105, 230, 0.6)',
        },
      },
      axisTick: {
        show: true,
      },
      axisLabel: {
        margin: 10,
        color: fontColor,
        interval: 0, //强制显示文字
        rotate: 30,
        textStyle: {
          fontSize: 12,
        },
      },
    },
  ],
  yAxis: [
    {
      //   name: '收入',
      axisLabel: {
        formatter: function (p) {
          return addNumberUnit(p)
        },
        color: fontColor,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(81, 203, 255, 0.22)',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  color: colors,
  series: [
    {
      name: '网内结算收入',
      type: 'line',
      smooth: true,
      //   showSymbol: false,
      //   symbol: 'circle',
      symbolSize: 6,
      zlevel: 3,
      //   lineStyle: {
      //     color: linecolor,
      //   },
      //   itemStyle: {
      //     color: linecolor,
      //   },
      data: getData(),
    },
    {
      name: '流量递延收入',
      type: 'line',
      smooth: true,
      symbolSize: 6,
      zlevel: 3,
      data: getData(),
    },
    {
      name: '积分递延收入',
      type: 'line',
      smooth: true,
      symbolSize: 6,
      zlevel: 3,
      data: getData(),
    },
    {
      name: '其他',
      type: 'line',
      smooth: true,
      symbolSize: 6,
      zlevel: 3,
      data: getData(),
    },
  ],
}
export default option
