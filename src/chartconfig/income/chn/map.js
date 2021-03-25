import { formatNumberRgx } from '../../../pages/page.util'
const toolTiosOfMap = `    <svg class="svgofback" width="140" height="100" style="stroke: rgba(0, 225, 255, 0.842);stroke-width: 2;fill: none;">
<path d="
M 35 0 
L 10 0 
L 0 10
L 0 90 
L 10 100
L 35 100
"></path>
<path d="
M 105 0 
L 130 0 
L 140 10
L 140 90 
L 130 100
L 105 100
"></path>
<polygon stroke="rgba(0, 224, 255,0.9)" fill="rgba(0, 224, 255,0.5)" points="70 5, 10 5, 5 10, 5 90, 10 95,130 95, 130 95,135 90,135 10,130 5" />
</svg>`
const map = {
  //   title: {
  //     text: '效益分布',
  //     left: '10px',
  //     textStyle: {
  //       color: 'rgba(255, 255, 255, 0.8)',
  //       fontSize: 16,
  //       fontWeight: 300,
  //     },
  //   },
  tooltip: {
    trigger: 'item',
    // confine: true,

    // appendToBody: true,
    formatter: function (params, ticket, callback) {
      return (
        '<div class="map-tip">' +
        toolTiosOfMap +
        '<p style="color:#fff;padding:3px;">增幅:' +
        Number(params.data.value * 100).toFixed(2) +
        '%</p>' +
        '<p style="color:#fff;font-size:20px;margin-top:10px;text-align:center;">' +
        params.data.name +
        '</p></div></div>'
      )
      //       return `    <svg width="100" height="100" style="stroke: #000;stroke-width: 5;fill: none;">
      //     <ellipse cx="43" cy="43" rx="40" ry="40"></ellipse>
      // </svg>`
    },
  },
  visualMap: {
    min: 0,
    max: 1,
    left: 'right',
    top: 'bottom',
    padding: [0, 10, 30, 0],
    text: ['High', 'Low'], //取值范围的文字
    textStyle: {
      color: '#fff',
    },
    inRange: {
      //   color: ['#F56C6C', '#FFB800', '#51BF30', '#1E9FFF'], //取值范围的颜色
      color: ['#1E9FFF', '#51BF30', '#FFB800', '#F56C6C'], //取值范围的颜色
    },
    itemWidth: 20, //图形的宽度，即长条的宽度。
    itemHeight: 60,
    calculable: false,
    show: true, //图注
  },
  geo: {
    id: 1,
    map: 'fjs',
    zoom: 1,
    zlevel: 0,
    left: '15%',
    top: 40,
    label: {
      show: true,
      color: 'rgba(255, 255, 255, 0.8)',
      emphasis: {
        show: true,
        color: 'rgba(255, 255, 255, 0.8)',
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
      map: 'fjs',
      geoIndex: 0,
      // layoutCenter: ['20%', '50%'],

      roam: true,
      data: [],
      itemStyle: {
        normal: {
          label: {
            show: true,
            color: 'rgba(255, 255, 255, 0.8)',
          },
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
