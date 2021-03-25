import echarts from 'echarts'
const d = [213069.24, 1317.35, 18502, 875.23, 400, -709, -18493, 19716, 213214]
const data = d.map((v) => ({ name: 'xxxx', value: v }))
const legend = {
  start: '统计期量',
  end: '统计期量',
  minus: '回落',
  positive: '增加',
}
function getSeries(arr, renderItemName, legend) {
  let sum = 0
  let series = []

  arr.forEach((item, index) => {
    sum += item.value
    const temp = {
      type: 'custom',
      name: item.name,
      renderItem: renderItemName,
      label: {
        show: true,
        position: 'top', //在上方显示
        textStyle: {
          //数值样式
          color: '#fff',
          fontSize: 14,
        },
        formatter: (p) => {
          let x = p.value[0]
          return x
        },
      },
      itemStyle: {
        normal: {
          color: function (params) {
            let colorList = new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: 'rgb(7,157,255)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgb(95,213,255)', // 100% 处的颜色
                },
              ],
              false
            )
            let colorList1 = new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: 'rgb(7,185,238)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgb(219,83,198)', // 100% 处的颜色
                },
              ],
              false
            )
            let colorList2 = 'rgb(236,159,78)'
            let colorList3 = 'rgb(51,169,249)'
            if (params.componentIndex == 0) {
              return colorList
            }
            if (params.seriesName == '回落') {
              return colorList2
            }
            if (params.seriesName == '增加') {
              return colorList3
            }
            if (params.seriesName == '统计期量' && params.componentIndex != 0) {
              return colorList1
            }
          },
        },
      },
      data: [{ value: [item.value, sum] }],
    }
    if (index == arr.length - 1) {
      temp.id = 'end'
      temp.data[0].value[1] = temp.data[0].value[0]
      temp.data[0].value.push(arr[0].value)
    }
    if (legend) {
      if (index == 0) {
        temp.name = legend.start
      } else if (index == arr.length - 1) {
        temp.name = legend.end
      } else if (item.value < 0) {
        temp.name = legend.minus
      } else {
        temp.name = legend.positive
      }
    }
    series.push(temp)
  })
  return series
}
function renderItem(params, api) {
  var categoryIndex = params.seriesIndex // 类目轴的索引
  var width = api.size([0, 1])[0] * 0.4 // 计算宽度

  // 计算 实际点
  var start = api.coord([categoryIndex, api.value(1)])
  var end = api.coord([categoryIndex, 0])

  var height = end[1] - start[1]
  var x = start[0] - width / 2
  var y = start[1]

  var lineY
  var startY
  console.log(start, end)
  if (categoryIndex !== 0 && params.seriesId != 'end') {
    // 前一个点的坐标
    var perStart = api.coord([categoryIndex - 1, api.value(1) - api.value(0)])
    var perEnd = api.coord([categoryIndex - 1, 0])
    height = height - (perEnd[1] - perStart[1])
    // 处理负值
    if (height < 0) {
      height = -height
      y = y - height
    }

    if (api.value(0) <= 0) {
      lineY = y + 0.5
    } else {
      lineY = y + height - 0.5
    }
  } else {
    lineY = y + 0.5
  }

  let rectShape = echarts.graphic.clipRectByRect(
    {
      x,
      y,
      width,
      height,
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    }
  )
  console.log(
    {
      x,
      y,
      width,
      height,
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height,
    }
  )
  return {
    type: 'rect',
    shape: rectShape,
    style: api.style(),
  }
}
const option = {
  grid: {
    top: 30,
    right: 0,
    left: 0,
    bottom: 35,
  },
  xAxis: {
    type: 'category',
    axisLine: {
      show: false,
    },
    axisTick: {
      //x轴刻度线
      show: false,
    },
    axisLabel: {
      interval: 0,
      textStyle: {
        color: '#fff', //坐标值得具体的颜色
        fontSize: '12',
      },
      formatter: function (params) {
        //将最终的字符串返回
        return 'sdfsdfsd'
      },
    },
  },
  yAxis: {
    type: 'value',
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
  //暂时去除hover后展示数据
  tooltip: {
    show: false,
    formatter: (p) => {
      return p.seriesName + ': ' + Math.abs(p.data.value[0])
    },
  },
  legend: {
    show: false,
  },
}
option.series = getSeries(data, renderItem, legend)
export default option
