import echarts from 'echarts'
import { formatNumberRgx } from '../pages/page.util'
const option = {
  title: {
    // text: '数量',
    textStyle: {
      fontWeight: 'normal',
      fontSize: 16,
      color: '#F1F1F3',
    },
    top: '10%',
    left: '1.5%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: 45,
    right: '4%',
    left: 80,
    bottom: 55,
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.12)',
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 25,
        margin: 10,
        color: '#e2e9ff',
        textStyle: {
          fontSize: 14,
        },
      },
    },
  ],
  yAxis: [
    {
      splitNumber: 3,
      axisLabel: {
        formatter: '{value}',
        color: '#e2e9ff',
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.12)',
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.12)',
        },
      },
    },
  ],
  series: [
    {
      type: 'bar',
      data: [],
      barWidth: '16px',
      label: {
        show: true,
        position: 'top',
        color: 'rgba(255,255,255,0.8)',
        fontSize: 10,
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#0338FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#01B0FF', // 100% 处的颜色
              },
            ],
            false
          ),
          barBorderRadius: [10, 10, 0, 0],
          //   shadowColor: 'rgba(0,160,221,1)',
          //   shadowBlur: 2,
        },
      },
    },
  ],
}
const view9_option = {
  title: {
    // text: '数量',
    textStyle: {
      fontWeight: 'normal',
      fontSize: 16,
      color: '#F1F1F3',
    },
    top: '10%',
    left: '1.5%',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    top: 40,
    right: '4%',
    left: 60,
    bottom: 55,
  },
  xAxis: [
    {
      type: 'category',
      data: [],
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.12)',
        },
      },
      axisLabel: {
        interval: 0,
        rotate: 25,
        margin: 10,
        color: '#e2e9ff',
        textStyle: {
          fontSize: 14,
        },
      },
    },
  ],
  yAxis: [
    {
      splitNumber: 3,
      axisLabel: {
        formatter: '{value}',
        color: '#e2e9ff',
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.12)',
        },
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,0.12)',
        },
      },
    },
  ],
  series: [
    {
      type: 'bar',
      data: [],
      barWidth: '16px',
      label: {
        show: true,
        position: 'top',
        color: 'rgba(255,255,255,0.8)',
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: '#0338FF', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#01B0FF', // 100% 处的颜色
              },
            ],
            false
          ),
          barBorderRadius: [10, 10, 10, 10],
          //   shadowColor: 'rgba(0,160,221,1)',
          //   shadowBlur: 2,
        },
      },
    },
  ],
}
const barColor = {
  color: new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#0338FF', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#01B0FF', // 100% 处的颜色
      },
    ],
    false
  ),
  barBorderRadius: [10, 10, 10, 10],
}

const view9_1 = JSON.parse(JSON.stringify(view9_option))
view9_1.series[0].itemStyle.normal = barColor
view9_1.series[0].label.formatter = function (p) {
  return (p.value * 100).toFixed(2) + '%'
}

//暴力拷贝后小圆点的对象获取失败，直接指定小圆点的html=
const pointer =
  '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:##;"></span>'

const view10_3 = JSON.parse(JSON.stringify(option))
view10_3.series[0].itemStyle.normal = barColor
view10_3.series[0].label.formatter = function (val) {
  return formatNumberRgx(parseFloat(val.value).toFixed(2))
}

view10_3.tooltip.formatter = function (p) {
  return (
    '<p>' +
    p[0].axisValue +
    '</p><p>' +
    pointer.replace('##', '#0338FF') +
    formatNumberRgx(Number(p[0].value).toFixed(2)) +
    '元</p>'
  )
}

const view10_4 = JSON.parse(JSON.stringify(option))
view10_4.series[0].itemStyle.normal = barColor
view10_4.series[0].label.formatter = function (val) {
  return formatNumberRgx(parseFloat(val.value).toFixed(2))
}

view10_4.tooltip.formatter = function (p) {
  return (
    '<p>' +
    p[0].axisValue +
    '</p><p>' +
    pointer.replace('##', '#0338FF') +
    formatNumberRgx(Number(p[0].value).toFixed(2)) +
    '元</p>'
  )
}

const view10_5 = JSON.parse(JSON.stringify(option))
view10_5.series[0].itemStyle.normal = barColor
view10_5.series[0].label.formatter = function (val) {
  return (val.value * 100).toFixed(2) + '%'
}
// view10_5.yAxis[0].axisLabel.formatter = function (val) {
//   const vLabel = parseFloat(val * 100).toFixed(4)
//   return vLabel + '%'
// }
view10_5.tooltip.formatter = function (p) {
  return (
    '<p>' +
    p[0].axisValue +
    '</p>' +
    '<p>' +
    pointer.replace('##', '#0338FF') +
    '占比:' +
    (p[0].data.value * 100).toFixed(2) +
    '%</p>' +
    '<p>' +
    pointer.replace('##', '#0338FF') +
    '已用酬金:' +
    formatNumberRgx(Number(p[0].data.value1 / 10000).toFixed(2)) +
    '万</p>' +
    '<p>' +
    pointer.replace('##', '#0338FF') +
    '酬金总预算:' +
    formatNumberRgx(Number(p[0].data.value2 / 10000).toFixed(2)) +
    '万</p>'
  )
}
const view10_6 = JSON.parse(JSON.stringify(option))
view10_6.series[0].itemStyle.normal = barColor
view10_6.series[0].label.formatter = function (val) {
  return formatNumberRgx(parseFloat(val.value / 10000).toFixed(2))
}
view10_6.yAxis[0].axisLabel.formatter = function (val) {
  const vLabel =
    parseFloat(val / 10000) > 10
      ? parseFloat(val / 10000).toFixed(0)
      : parseFloat(val / 10000).toFixed(2)
  return formatNumberRgx(vLabel)
}
view10_6.tooltip.formatter = function (p) {
  return (
    '<p>' +
    p[0].axisValue +
    '</p><p>' +
    pointer.replace('##', '#0338FF') +
    formatNumberRgx((p[0].value / 10000).toFixed(2)) +
    '万</p>'
  )
}
const view10_7 = JSON.parse(JSON.stringify(option))
view10_7.series[0].itemStyle.normal = barColor
view10_7.series[0].label.formatter = function (val) {
  return formatNumberRgx(parseFloat(val.value).toFixed(0))
}
view10_7.yAxis[0].axisLabel.formatter = function (val) {
  const vLabel =
    parseFloat(val) > 10
      ? parseFloat(val).toFixed(0)
      : parseFloat(val).toFixed(0)
  return formatNumberRgx(vLabel)
}
view10_7.tooltip.formatter = function (p) {
  return (
    '<p>' +
    p[0].axisValue +
    '</p><p>' +
    pointer.replace('##', '#0338FF') +
    formatNumberRgx(Number(p[0].value).toFixed(0)) +
    '个</p>'
  )
}
export {
  view9_1,
  //   view10_1,
  //   view10_2,
  view10_3,
  view10_4,
  view10_5,
  view10_6,
  view10_7,
}
