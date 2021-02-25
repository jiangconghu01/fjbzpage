import citys from '../citycode'
import { addNumberUnit } from '../../incomepages/page.util'
import echarts from 'echarts'
const fontColor = '#fff'
const colors_light = ['#4EDBDF', '#FEBD60', '#51CCFF', '#C28DF5']
const colors = ['#1AA4B9', '#BE8751', '#0798E2', '#8A5AD5']
const linecolor = '#ECD867'
//itemStyle
const oneBaritem = {
  color: new echarts.graphic.LinearGradient(
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
        color: '#3E36DD', // 100% 处的颜色
      },
    ],
    false
  ),
}
const hexToRgba = (hex, opacity) => {
  let rgbaColor = ''
  let reg = /^#[\da-f]{6}$/i
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt('0x' + hex.slice(3, 5))},${parseInt('0x' + hex.slice(5, 7))},${opacity})`
  }
  return rgbaColor
}
let chartData = Object.keys(citys.cityCodeMap).map((val) => {
  return {
    name: val,
    value: (Math.random() * 1000).toFixed(0),
  }
})
chartData.unshift({ name: '全省', value: (Math.random() * 1000).toFixed(0), itemStyle: oneBaritem })
let xData = chartData.map((v) => v.name)
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: '40',
    right: '60',
    left: '80',
    bottom: '50',
  },
  legend: {
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
    right: 10,
    itemWidth: 15,
    itemHeight: 10,
    data: ['累计非账单收入', '截止x月同比%'],
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
      //   name: '收入',
      axisLabel: {
        // formatter: function (p) {
        //   return addNumberUnit(p)
        // },
        color: fontColor,
      },
      splitLine: {
        show: false,
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
    {
      //   name: '同比',
      axisLabel: {
        formatter: function (p) {
          return p + '%'
        },
        color: fontColor,
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(81, 203, 255, 0.22)',
        },
      },
      axisTick: {
        show: false,
      },
    },
  ],
  color: ['#0798E2'],
  series: [
    {
      name: '累计非账单收入',
      type: 'bar',
      data: chartData,
      barWidth: '30',
      yAxisIndex: 0,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: '截止x月同比%',
      type: 'line',
      smooth: true,
      //   showSymbol: false,
      symbol: 'circle',
      symbolSize: 6,
      yAxisIndex: 1,
      zlevel: 3,
      lineStyle: {
        color: linecolor,
      },
      itemStyle: {
        color: linecolor,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: hexToRgba(linecolor, 0.6),
              },
              {
                offset: 1,
                color: hexToRgba(linecolor, 0.2),
              },
            ],
            false
          ),
          shadowColor: hexToRgba(linecolor, 0.1),
          shadowBlur: 10,
        },
      },
      data: chartData,
    },
  ],
}
export default option
