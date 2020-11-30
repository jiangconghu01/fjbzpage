const map = {
  title: {
    text: '效益分布',
    left: '10px',
    textStyle: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 16,
      fontWeight: 300,
    },
  },
  tooltip: {
    trigger: 'item',
    confine: true,
    formatter: function (params, ticket, callback) {
      return (
        '<div style="background-color:#10a3f9;padding:5px;"><p style="color:#fff;padding:3px;">效益:' +
        params.data.value2 +
        '万元</p>' +
        '<p style="color:#fff;padding:3px;">效益比:' +
        params.data.value +
        '</p>' +
        '<p style="color:#fff;font-size:20px;margin-top:10px;text-align:center;">' +
        params.data.name +
        '</p></div>'
      )
    },
  },
  visualMap: {
    type: 'continuous',
    orient: 'vertical',
    itemWidth: 10,
    itemHeight: 80,
    text: ['High', 'Low'],
    showLabel: true,
    seriesIndex: [0],
    min: -3,
    max: 3,
    inRange: {
      color: ['#1E9FFF', '#51BF30', '#FFB800', '#F56C6C'],
    },
    textStyle: {
      color: '#7B93A7',
    },
    x2: 0,
    y2: 60,
  },
  geo: {
    id: 1,
    map: 'fjs',
    zoom: 1,
    zlevel: 0,
    label: {
      show: true,
      color: 'rgba(255, 255, 255, 0.8)',
      emphasis: {
        show: true,
      },
    },
    roam: true,
    itemStyle: {
      normal: {
        borderColor: 'rgba(147, 235, 248, 1)',
        borderWidth: 1,
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
            },
            {
              offset: 1,
              color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        shadowColor: 'rgba(128, 217, 248, 1)',
        shadowOffsetX: -2,
        shadowOffsetY: 2,
        shadowBlur: 10,
      },
      emphasis: {
        areaColor: '#389BB7',
        borderWidth: 2,
      },
    },
  },
  //   roam: true,
  series: [
    {
      type: 'map',
      // selectedMode: 'single',
      geoIndex: 0,
      map: 'fjs',
      // mapLocation: {
      //   x: 'center',
      //   y: 'center',
      // },
      data: [],
      label: {
        normal: {
          show: true,
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(255, 255, 255, 0.8)',
          borderWidth: 1,
        },
        emphasis: {
          label: {
            show: true,
          },
        },
      },
    },
    {
      type: 'effectScatter',
      tooltip: {
        show: false,
      },
      coordinateSystem: 'geo',
      zlevel: 4,
      symbolSize: 8,
      label: {
        normal: {
          show: false,
          position: 'right',
          formatter: '{b}',
          color: 'white',
        },
      },
      itemStyle: {
        normal: {
          color: '#ff9100',
        },
      },
      rippleEffect: {
        scale: 3,
        brushType: 'stroke',
      },
      data: [],
    },
  ],
}

export default map
