import citys from '../citycode'
import { addNumberUnit } from '../../incomepages/page.util'
const fontColor = '#fff'
const colors_light = ['#4EDBDF', '#FEBD60', '#51CCFF', '#C28DF5']
const colors = ['#1AA4B9', '#BE8751', '#0798E2', '#8A5AD5']
let chartData = Object.keys(citys.cityCodeMap).map((val) => {
  return {
    name: val,
    value: (Math.random() * 1000).toFixed(0),
  }
})
chartData.unshift({ name: '全省', value: (Math.random() * 1000).toFixed(0) })
let xData = chartData.map((v) => v.name)
function getTdata(colornum) {
  const sdata = Object.keys(citys.cityCodeMap).map((val) => {
    return {
      name: val,
      value: (Math.random() * 1000).toFixed(0),
    }
  })
  sdata.unshift({ name: '全省', value: (Math.random() * 1000).toFixed(0) })
  return sdata.map((v, index) => {
    return {
      value: v.value,
      itemStyle: {
        color: index === 0 ? colors_light[colornum] : colors[colornum],
      },
    }
  })
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
    left: '80',
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
        textStyle: {
          fontSize: 12,
        },
      },
    },
  ],
  yAxis: [
    {
      axisLabel: {
        formatter: function (p) {
          return addNumberUnit(p)
        },
        color: 'rgba(81, 203, 255, 0.753)',
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(151,151,151,0.5)',
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(81, 203, 255, 0.22)',
        },
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
      type: 'bar',
      stack: '总量',
      data: getTdata(0),
      barWidth: '30',
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: '流量递延收入',
      type: 'bar',
      stack: '总量',
      data: getTdata(1),
      barWidth: '30',
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: '积分递延收入',
      type: 'bar',
      stack: '总量',
      data: getTdata(2),
      barWidth: '30',
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: '其他',
      type: 'bar',
      stack: '总量',
      data: getTdata(3),
      barWidth: '30',
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
  ],
}
export default option
