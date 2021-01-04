import echarts from 'echarts'
const fontColor = '#fff'
// const colors = ['#3E36DD', '#2E59D6', '#3769E7', '#0B87D8', '#0F9BD7', '#0F9BD7', '#1CCAD2', '#23E3D0', '#25EDCF', '#5EF6DF']
const colors = ['#DD6B4F', '#E47544', '#E8934D', '#F3A057', '#F2B158', '#F2BE66', '#F0C954', '#F0CE62', '#F1D477', '#F4E67A']
let chartData = [
  { name: '企信通', value: 300 },
  { name: '本地数据\n专线', value: 400 },
  { name: '互联网\n专线', value: 452 },
  { name: '企业宽带', value: 770 },
  { name: '跨省数据\n专线', value: 650 },
  { name: '集团电话', value: 256 },
  { name: '非专网\n专线', value: 350 },
  { name: '专网专号', value: 422 },
  { name: '移动云\n(laaS)', value: 235 },
  { name: '其他', value: 658 },
]

let xData = chartData.map((v) => v.name)
let sData = chartData.map((v, index) => {
  return {
    value: v.value,
    itemStyle: {
      color: colors[index],
    },
  }
})

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
    left: '2%',
    bottom: '50',
  },
  xAxis: [
    {
      type: 'category',
      data: xData,
      //   triggerEvent: true,
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
        formatter: '{value}',
        color: fontColor,
        show: false,
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
  //   color: colors,
  series: [
    {
      type: 'bar',
      data: sData,
      barWidth: '20px',
      label: {
        show: true,
        position: 'top',
        // fontWeight: 'bold',
        color: '#fff',
      },
    },
  ],
}
export default option
