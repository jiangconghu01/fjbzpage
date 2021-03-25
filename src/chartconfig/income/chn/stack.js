const color_n = ['#4C8BFF', '#A352FF', '#DA4AF7', '#ED42A3', '#F85A40', '#F48924', '#E0B45A', '#7BC84D', '#35D372', '#8878FF', '#CF66FF', '#FA5CBB', '#FF6666', '#00BCF0']
import citys from '../../citycode'
import { addNumberUnit, formatNumberRgx } from '../../../incomepages/page.util'
const fontColor = '#fff'
const data = [23, 12, 32, 44]
const option = {
  grid: {
    top: '70',
    right: '1%',
    left: '1%',
    bottom: '50',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  xAxis: [
    {
      type: 'category',
      data: [23, 234, 234, 23],
      axisLine: {
        lineStyle: {
          color: 'rgba(0,85,189,0.2)', // 颜色
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
        color: '#fff',
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(151,151,151,0.5)',
        },
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
  ],
  color: color_n,
  series: [
    {
      name: '222',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: true,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'sss',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'dddd',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'ggg2',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'ggg3',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'g3gg',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'ggg5',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'gg6g',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'gg7g',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
    {
      name: 'gg9g',
      type: 'bar',
      stack: '总量',
      data: data,
      barWidth: 20,
      label: {
        show: false,
        position: 'top',
        fontWeight: 'bold',
      },
    },
  ],
}
export default option
