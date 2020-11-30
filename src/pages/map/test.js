import echarts from 'echarts'
// 绘制左侧面
const CubeLeft = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c0 = [shape.x, shape.y]
    const c1 = [shape.x - 13, shape.y - 10]
    const c2 = [xAxisPoint[0] - 13, xAxisPoint[1]]
    const c3 = [xAxisPoint[0], xAxisPoint[1]]
    ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath()
  },
})
// 绘制右侧面
const CubeRight = echarts.graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx, shape) {
    const xAxisPoint = shape.xAxisPoint
    const c1 = [shape.x, shape.y]
    const c2 = [xAxisPoint[0], xAxisPoint[1]]
    const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9]
    const c4 = [shape.x + 18, shape.y - 9]
    ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath()
  },
})

// 注册三个面图形
echarts.graphic.registerShape('CubeLeft', CubeLeft)

const option = {
  backgroundColor: '#012366',

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: function (params, ticket, callback) {
      const item = params[0]
      return item.name + ' : ' + item.value
    },
  },
  grid: {
    left: 40,
    right: 40,
    bottom: 100,
    top: 100,
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisLine: {
      show: true,
      lineStyle: {
        color: 'white',
      },
    },
    offset: 25,
    axisTick: {
      show: false,
      length: 9,
      alignWithLabel: true,
      lineStyle: {
        color: '#7DFFFD',
      },
    },
    axisLabel: {
      fontSize: 16,
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      show: true,
      lineStyle: {
        color: 'white',
      },
    },
    boundaryGap: ['20%', '20%'],
  },
  series: [
    {
      type: 'custom',
      renderItem: (params, api) => {
        console.log(api.value(0), api.value(1))
        const location = api.coord([api.value(0), api.value(1)])
        var color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#01B0FF', // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#0338FF', // 100% 处的颜色
          },
        ])
        return {
          type: 'group',
          children: [
            {
              type: 'CubeLeft',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: color,
              },
            },
          ],
        }
      },
      data: [{ value: 2016, value2: 222 }, 1230, 3790, 2349, 1654, 1120, 1980, 980, 1333, 2001, 1820, 3200],
    },
  ],
}
export default option
