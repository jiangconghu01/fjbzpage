import echarts from 'echarts'
import { addNumberUnit } from '../../incomepages/page.util'
const fontColor = '#fff'
const colors = ['#3E36DD', '#2E59D6', '#3769E7', '#0B87D8', '#0F9BD7', '#0F9BD7', '#1CCAD2', '#23E3D0', '#25EDCF', '#5EF6DF']
let chartData = [
  { name: 'CHN市场\n折后账单收入', value: 300 },
  { name: 'CHN市场\n非账单收入', value: 400 },
  { name: 'B市场收入\n(扣减商品销售和其他收入)', value: 452 },
  { name: '网间结算\n及其他收入', value: 770 },
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
  },
  grid: {
    top: '40',
    right: '2%',
    left: '2%',
    bottom: '50',
  },
  legend: {
    textStyle: {
      color: '#C7EBF9',
      fontSize: 12,
    },
    right: 10,
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
      barWidth: '15px',
      label: {
        show: true,
        position: 'top',
        fontWeight: 'bold',
        color: '#fff',
        formatter: function (p) {
          return p.value + '%'
        },
      },
      itemStyle: oneBaritem1,
    },
    {
      name: '2020年截止X月',
      type: 'bar',
      data: sData,
      barWidth: '15px',
      label: {
        show: true,
        position: 'top',
        fontWeight: 'bold',
        color: '#fff',
        formatter: function (p) {
          //   return addNumberUnit(p.value)
          return p.value + '%'
        },
      },
      itemStyle: oneBaritem2,
    },
  ],
}
export default option
