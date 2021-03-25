import echarts from 'echarts'
import { addNumberUnit, formatNumberRgx } from '../../../incomepages/page.util'
const xAxisArr = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '10', '1', '12', '1']

const option = {
  color: ['rgb(51,169,249)', '#AD8036'],
  grid: {
    top: 20,
    right: 0,
    left: 0,
    bottom: 30,
  },
  xAxis: [
    {
      type: 'category',
      data: xAxisArr,
      axisPointer: {
        type: 'shadow',
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(0,85,189,0.2)', // 颜色
        },
      },
      axisLabel: {
        interval: 0,
        textStyle: {
          color: '#fff', //坐标值得具体的颜色
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '',
      interval: 50,
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        //y轴刻度线
        show: false,
      },
      axisLabel: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '绝对值',
      type: 'bar',
      /*设置柱状图颜色*/
      barWidth: 16, // 柱图宽度
      itemStyle: {
        normal: {
          color: function (params) {
            // build a color map as your need.
            if (params.dataIndex == 12) {
              let color = new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
                [
                  { offset: 0, color: 'rgb(223,81,198)' },
                  { offset: 1, color: 'rgb(6,184,238)' },
                ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示位置
              )
              return color
            }
          },
          /*信息显示方式*/
          label: {
            show: true,
            position: 'top',
            fontWeight: 'bold',
            formatter: function (e) {
              if (e.value == 0) {
                return ''
              } else {
                return formatNumberRgx((e.data.value1 / 10000).toFixed(2))
              }
            },
            color: '#fff',
          },
        },
      },
      data: [234, 234, 347, 99, 23, 776, 66, 664, 222, 66, 664, 222, 66, 664, 222],
    },
  ],
}
export default option
