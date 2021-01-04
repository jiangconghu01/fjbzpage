import echarts from 'echarts'
import { addNumberUnit } from '../../incomepages/page.util'
const fontColor = '#fff'
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
// const labelData = ['CHN市场\n折后账单当月收入', 'CHN市场\n非账单当月收入', 'B市场当月收入(扣减\n商品销售和其他收入)', '网间结算\n及其他当月收入']
// const labelData = ['CHN市场非账单收入', 'CHN市场折后账单收入', '网间结算及其他收入', 'B市场收入(扣减商品销售及其他收入)']
const labelData = ['网间结算及其他收入', 'B市场收入(扣减其他收入)', 'CHN市场非账单收入', 'CHN市场折后账单收入'].reverse()
//CHN市场折后账单当月收入 1
// CHN市场非账单当月收入 0
// B市场当月收入（扣减商品销售、其他收入）3
// 网间结算及其他当月收入 2
function getLinearGradientItem(color1, color2) {
  return {
    color: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: color2, // 0% 处的颜色
        },
        {
          offset: 1,
          color: color1, // 100% 处的颜色
        },
      ],
      false
    ),
  }
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
        p[0].axisValue +
        '</p><p>' +
        '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#A581FF;"></span>' +
        p[3].seriesName +
        ':' +
        p[3].data.value +
        '</p>' +
        '<p>' +
        '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3AABFF;"></span>' +
        p[2].seriesName +
        ':' +
        p[2].data.value +
        '</p>' +
        '<p>' +
        '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FBC551;"></span>' +
        p[1].seriesName +
        ':' +
        p[1].data.value +
        '</p>' +
        '<p>' +
        '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#36E2E7;"></span>' +
        p[0].seriesName +
        ':' +
        p[0].data.value +
        '</p>'
      )
    },
  },
  grid: {
    top: '80',
    right: '15',
    left: '15',
    bottom: '15',
    containLabel: true,
  },
  legend: {
    textStyle: {
      color: '#fff',
      fontSize: 12,
    },
    left: 10,
    itemWidth: 15,
    itemHeight: 10,
    width: 380,
    data: labelData,
  },
  xAxis: [
    {
      type: 'category',
      data: xarr,
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
        show: false,
        // formatter: function (p) {
        //   return addNumberUnit(p)
        // },
        color: 'rgba(81, 203, 255, 0.753)',
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(151,151,151,0.5)',
        },
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
  series: [
    {
      name: labelData[0],
      type: 'bar',
      stack: '总量',
      data: getData(),
      barWidth: 18,
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        formatter: function (p) {
          const v4 = p.data.valuelist[3]
          const v3 = p.data.valuelist[2]
          const v2 = p.data.valuelist[1]
          const v1 = p.data.valuelist[0]
          let label = ''
          if (v4 < 0 && v3 < 0 && v2 < 0 && v1 >= 0) {
            label = p.data.value2
          }
          return label
        },
      },
      itemStyle: getLinearGradientItem('#36E2E7', '#8FFCFF'),
    },
    {
      name: labelData[1],
      type: 'bar',
      stack: '总量',
      data: getData(1),
      barWidth: 18,
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        formatter: function (p) {
          const v4 = p.data.valuelist[3]
          const v3 = p.data.valuelist[2]
          const v2 = p.data.valuelist[1]
          let label = ''
          if (v4 < 0 && v3 < 0 && v2 >= 0) {
            label = p.data.value2
          }
          return label
        },
      },

      itemStyle: getLinearGradientItem('#FBC551', '#FFE7B4'),
    },
    {
      name: labelData[2],
      type: 'bar',
      stack: '总量',
      data: getData(2),
      barWidth: 18,
      label: {
        show: true,
        position: 'top',
        color: '#fff',
        formatter: function (p) {
          const v4 = p.data.valuelist[3]
          const v3 = p.data.valuelist[2]
          let label = ''
          if (v4 < 0 && v3 >= 0) {
            label = p.data.value2
          }
          return label
        },
      },
      itemStyle: getLinearGradientItem('#3AABFF', '#6BD7FF'),
    },
    {
      name: labelData[3],
      type: 'bar',
      stack: '总量',
      data: getData(3),
      barWidth: 18,
      label: {
        show: true,
        position: 'top',
        // fontWeight: 'bold',
        color: '#fff',
        formatter: function (p) {
          const v4 = p.data.valuelist[3]
          let label = ''
          if (v4 >= 0) {
            label = p.data.value2
          }
          return label
        },
      },
      itemStyle: getLinearGradientItem('#A581FF', '#CBB7FF'),
    },
  ],
}
export default option
