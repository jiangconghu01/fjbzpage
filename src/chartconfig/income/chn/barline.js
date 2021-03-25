import echarts from 'echarts'
import { addNumberUnit, formatNumberRgx } from '../../../incomepages/page.util'
const xAxisArr = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '10', '1', '12', '1']

const option = {
  color: ['rgb(51,169,249)', '#AD8036'],
  grid: {
    top: 40,
    right: 0,
    left: 0,
    bottom: 30,
  },
  legend: {
    data: ['绝对值', '增幅'],
    textStyle: {
      color: '#50CBFF',
    },
    orient: 'horizontal', // 'vertical'
    x2: '2%', // 'center' | 'left' | {number},
    y: 0, // 'center' | 'bottom' | {number}
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
          fontWeight: 'blod',
          fontSize: 14,
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
          color: '',
          /*信息显示方式*/
          label: {
            show: true,
            position: 'insideTop',
            // fontSize: 10,
            color: '#fff',
            fontWeight: 'blod',
          },
        },
      },
      data: [234, 234, 347, 99, 23, 776, 66, 664, 222, 66, 664, 222, 66, 664, 222],
    },
    {
      name: '增幅',
      type: 'line',
      itemStyle: {
        normal: {
          color: 'rgb(236,216,103)', //拐点颜色
          label: {
            show: true,
            // fontSize: 10,
            color: '#fff',
            fontWeight: 'blod',
          },
        },
      },
      lineStyle: {
        normal: {
          color: 'rgb(235,215,104)', //折线的颜色
          width: 1,
        },
      },
      symbol: 'circle', //拐点设置为实心
      symbolSize: 6,
      data: [234, 234, 347, 99, 23, 776, 66, 664, 222, 66, 664, 222, 66],
    },
  ],
}
export default option
