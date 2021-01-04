import citys from '../citycode'
import { addNumberUnit, formatNumberRgx } from '../../incomepages/page.util'
const fontColor = '#fff'
// const colors_light = ['#65cf28', '#FEBD60', '#51CCFF', '#C28DF5']
// const colors = ['#1AA4B9', '#BE8751', '#0798E2', '#8A5AD5']
const color_n = ['#7BC84D', '#F48924', '#ED42A3', '#A352FF', '#FF6666', '#CF66FF', '#35D372', '#E0B45A', '#F85A40', '#DA4AF7', '#4C8BFF', '#FA5CBB', '#8878FF']
// let chartData = Object.keys(citys.cityCodeMap).map((val) => {
//   return {
//     name: val,
//     value: (Math.random() * 1000).toFixed(0),
//   }
// })
// chartData.unshift({ name: '全省', value: (Math.random() * 1000).toFixed(0) })
// let xData = chartData.map((v) => v.name)
// function getTdata(colornum) {
//   const sdata = Object.keys(citys.cityCodeMap).map((val) => {
//     return {
//       name: val,
//       value: (Math.random() * 1000).toFixed(0),
//     }
//   })
//   sdata.unshift({ name: '全省', value: (Math.random() * 1000).toFixed(0) })
//   return sdata.map((v, index) => {
//     return {
//       value: v.value,
//       itemStyle: {
//         color: index === 0 ? colors_light[colornum] : colors[colornum],
//       },
//     }
//   })
// }

const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (p) {
      let tooltip = '<p>' + p[0].axisValue + '</p>'
      for (let index = p.length - 1; index >= 0; index--) {
        const ele = p[index]
        tooltip += '<p>' + ele.marker + ele.seriesName + ':' + formatNumberRgx(ele.data.value) + '</p>'
      }
      return tooltip
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
      color: '#fff',
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
      data: [],
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
      //   name: '单位（%）',

      //   nameTextStyle: {
      //     color: '#fff',
      //     // fontWeight: '600',
      //   },
      //   max: 100,
      axisLabel: {
        color: '#fff',
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
  color: color_n,
  series: [
    {
      name: '网内结算收入',
      type: 'bar',
      stack: '总量',
      data: [],
      barWidth: 40,
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
      data: [],
      barWidth: 40,
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
      data: [],
      barWidth: 40,
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
      data: [],
      barWidth: 40,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
  ],
}
export default option
