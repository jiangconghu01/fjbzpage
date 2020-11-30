import { formatNumberRgx } from '../pages/page.util'

const option = {
  //   backgroundColor: '#fff',
  color: ['#FFB761', '#73A0FA', '#73DEB3'],
  tooltip: {
    trigger: 'axis',
    formatter: function (p) {
      return (
        '<p>' +
        p[0].axisValue +
        '</p><p>' +
        p[0].marker +
        p[0].seriesName +
        ':' +
        formatNumberRgx((p[0].value / 10000).toFixed(2)) +
        '万</p><p>' +
        p[1].marker +
        p[1].seriesName +
        ':' +
        formatNumberRgx((p[1].value / 10000).toFixed(2)) +
        '万</p>'
      )
    },
    // axisPointer: {
    //   type: 'cross',
    //   crossStyle: {
    //     color: 'rgba(255,255,255,0.12)',
    //   },
    //   lineStyle: {
    //     type: 'dashed',
    //   },
    // },
  },
  grid: {
    top: 48,
    right: '3%',
    left: 60,
    bottom: 60,
  },
  legend: {
    data: ['酬金', '收入'],
    orient: 'horizontal',
    icon: 'rect',
    show: true,
    right: 10,
    top: 25,
    textStyle: {
      color: '#fff',
    },
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLabel: {
      interval: 0,
      margin: 10,
      color: '#e2e9ff',

      rotate: 25,
      textStyle: {
        fontSize: 14,
      },
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
  yAxis: {
    type: 'value',
    // max: max_value>=100? max_value + 100: max_value+10,
    // max: max_value > 100 ? max_value * 2 : max_value + 10,
    // interval: 10,
    // nameLocation: "center",
    axisLabel: {
      formatter: function (val) {
        const vLabel =
          parseFloat(val / 10000) > 10
            ? parseFloat(val / 10000).toFixed(0)
            : parseFloat(val / 10000).toFixed(2)
        return formatNumberRgx(vLabel) + '万'
      },
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
  series: [
    {
      name: '酬金',
      type: 'line',
      smooth: true,
      label: {
        show: true,
        position: 'top',
        color: 'rgba(255,255,255,0.8)',
        formatter: function (val) {
          return (
            formatNumberRgx(parseFloat(val.value / 10000).toFixed(2)) + '万'
          )
        },
      },
      data: [],
    },
    {
      name: '收入',
      type: 'line',
      smooth: true,
      label: {
        show: false,
        position: 'top',
        color: 'rgba(255,255,255,0.8)',
        formatter: function (val) {
          return (
            formatNumberRgx(parseFloat(val.value / 10000).toFixed(2)) + '万'
          )
        },
      },
      data: [],
    },
  ],
}
export default option
