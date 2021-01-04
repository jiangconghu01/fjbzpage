import echarts from 'echarts'
import { formatNumberRgx } from '../../incomepages/page.util'
const fontColor = '#fff'
const colors = ['#32BEFF', '#E581E2']
let chartData = [
  { name: 'CHN市场\n折后账单收入', value: 30 },
  { name: 'CHN市场\n非账单收入', value: 40 },
  { name: 'B市场收入\n(扣减其他收入)', value: 42 },
  { name: '网间结算\n及其他收入', value: 27 },
]

let xData = chartData.map((v) => v.name)
let sData = chartData
const oneBaritem1 = {
  color: new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#65D9FF', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#0092FD', // 100% 处的颜色
      },
    ],
    false
  ),
}
const oneBaritem2 = {
  color: new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#EBB3FF', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#E14FC4', // 100% 处的颜色
      },
    ],
    false
  ),
}
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },

    formatter: function (p) {
      return (
        '<p>' +
        p[0].data.idxName.replace(/[\s*#]/g, '') +
        '</p><p>' +
        // p[0].marker +
        '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#32BEFF;"></span>' +
        p[0].seriesName +
        ':' +
        // formatNumberRgx((p[0].data.idxValue / 10000).toFixed(2)) +
        p[0].data.value +
        '%</p>' +
        '<p>' +
        '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#E581E2;"></span>' +
        p[1].seriesName +
        ':' +
        p[1].data.value +
        '%</p>'
      )
    },
  },
  grid: {
    top: '45',
    right: '2%',
    left: '2%',
    bottom: '50',
  },
  legend: {
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
    right: 10,
    top: 10,
    itemWidth: 15,
    itemHeight: 10,
    data: ['去年同期', '2020年截止X月'],
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
        textStyle: {
          fontSize: 12,
        },
      },
    },
  ],
  yAxis: [
    {
      axisLabel: {
        formatter: '{value}',
        color: fontColor,
        show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(151,151,151,0.5)',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  //   color: colors,
  series: [
    {
      name: '去年同期',
      type: 'bar',
      data: sData,
      barWidth: '18px',
      barGap: '50%',
      label: {
        show: true,
        position: [-20, -15],
        // fontWeight: 'bold',
        color: '#fff',
        formatter: function (p) {
          return formatNumberRgx((p.data.idxValue / 100000000).toFixed(2))
        },
      },
      itemStyle: oneBaritem1,
    },
    {
      name: '2020年截止X月',
      type: 'bar',
      data: sData,
      barWidth: '18px',
      barGap: '50%',
      label: {
        show: true,
        position: [0, -15],
        // fontWeight: 'bold',
        color: '#fff',
        formatter: function (p) {
          //   return addNumberUnit(p.value)
          return formatNumberRgx((p.data.idxValue / 100000000).toFixed(2))
        },
      },
      itemStyle: oneBaritem2,
    },
  ],
}
export default option
