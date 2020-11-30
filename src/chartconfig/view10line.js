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
        (p[0].value * 100).toFixed(2) +
        '%</p>' +
        '<p>' +
        p[0].marker +
        '已用酬金:' +
        formatNumberRgx(Number(p[0].data.value1 / 10000).toFixed(2)) +
        '万</p>' +
        '<p>' +
        p[0].marker +
        '酬金总预算:' +
        formatNumberRgx(Number(p[0].data.value2 / 10000).toFixed(2)) +
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

  xAxis: [
    {
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
  ],
  yAxis: {
    type: 'value',
    // max: max_value>=100? max_value + 100: max_value+10,
    // max: max_value > 100 ? max_value * 2 : max_value + 10,
    // interval: 10,
    // nameLocation: "center",
    axisLabel: {
      //   formatter: function (val) {
      //     const vLabel = parseFloat(val * 100).toFixed(4)
      //     return vLabel + '%'
      //   },
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
      name: '占比',
      type: 'line',
      smooth: true,
      label: {
        show: true,
        position: 'top',
        color: 'rgba(255,255,255,0.8)',
        formatter: function (val) {
          return parseFloat(val.value * 100).toFixed(2) + '%'
        },
      },
      data: [],
    },
  ],
}
export default option
