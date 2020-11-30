import echarts from 'echarts'
import { formatNumberRgx } from '../pages/page.util'
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
  barBorderRadius: [0, 0, 10, 10],
}
const barColor2 = {
  color: new echarts.graphic.LinearGradient(
    0,
    0,
    0,
    1,
    [
      {
        offset: 0,
        color: '#FF5722', // 0% 处的颜色
      },
      {
        offset: 1,
        color: '#FFB800', // 100% 处的颜色
      },
    ],
    false
  ),
  barBorderRadius: [10, 10, 0, 0],
}
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
    top: 40,
    right: '4%',
    left: 80,
    bottom: 55,
  },
  legend: {
    data: ['基础酬金', '激励酬金'],
    orient: 'horizontal',
    icon: 'rect',
    show: true,
    top: 0,
    left: '37%',
    // right: 10,
    textStyle: {
      color: '#fff',
    },
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
      stack: 'num',
      name: '基础酬金',
      data: [],
      barWidth: '16px',
      label: {
        show: false,
        position: 'top',
        color: 'rgba(255,255,255,0.8)',
      },
      itemStyle: {
        normal: {
          color: '',
          barBorderRadius: [5, 5, 5, 5],
        },
      },
    },
    {
      type: 'bar',
      stack: 'num',
      name: '激励酬金',
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
          color: '',
          barBorderRadius: [5, 5, 5, 5],
        },
      },
    },
  ],
}
const view10_2_1 = JSON.parse(JSON.stringify(option))
view10_2_1.series[0].itemStyle.normal = barColor
view10_2_1.series[1].itemStyle.normal = barColor2
view10_2_1.series[1].label.formatter = function (val) {
  return formatNumberRgx(parseFloat(val.data.sumval / 10000).toFixed(2))
}
view10_2_1.yAxis[0].axisLabel.formatter = function (val) {
  const vLabel =
    parseFloat(val / 10000) > 10
      ? parseFloat(val / 10000).toFixed(0)
      : parseFloat(val / 10000).toFixed(2)
  return formatNumberRgx(vLabel)
}
view10_2_1.tooltip.formatter = function (p) {
  return (
    '<p>' +
    p[0].axisValue +
    '</p><p>' +
    p[0].marker.replace('[object Object]', '#0338FF') +
    p[0].seriesName +
    ':' +
    formatNumberRgx((p[0].value / 10000).toFixed(2)) +
    '万</p><p>' +
    p[1].marker.replace('[object Object]', '#FF5722') +
    p[1].seriesName +
    ':' +
    formatNumberRgx((p[1].value / 10000).toFixed(2)) +
    '万</p>'
  )
}
const view10_2_2 = JSON.parse(JSON.stringify(option))
view10_2_2.series[0].itemStyle.normal = barColor
view10_2_2.series[1].itemStyle.normal = barColor2
view10_2_2.series[1].label.formatter = function (val) {
  return formatNumberRgx(parseFloat(val.data.sumval / 10000).toFixed(2))
}
view10_2_2.yAxis[0].axisLabel.formatter = function (val) {
  const vLabel =
    parseFloat(val / 10000) > 10
      ? parseFloat(val / 10000).toFixed(0)
      : parseFloat(val / 10000).toFixed(2)
  return formatNumberRgx(vLabel)
}
view10_2_2.tooltip.formatter = function (p) {
  return (
    '<p>' +
    p[0].axisValue +
    '</p><p>' +
    p[0].marker.replace('[object Object]', '#0338FF') +
    p[0].seriesName +
    ':' +
    formatNumberRgx((p[0].value / 10000).toFixed(2)) +
    '万</p><p>' +
    p[1].marker.replace('[object Object]', '#FF5722') +
    p[1].seriesName +
    ':' +
    formatNumberRgx((p[1].value / 10000).toFixed(2)) +
    '万</p>'
  )
}
export { view10_2_1, view10_2_2 }
