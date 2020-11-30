<template>
  <div class="map-page">
    <div id="allmap" class="map-box"></div>
    <div id="charts_map" class="chart-map-box"></div>
    <div class="nav">
      layer
    </div>
    <div id="bar-gale"></div>
  </div>
</template>
<script>
import BMap from 'bdmap'
import map_config from '@/chartconfig/map2.js'
import json from '@/chartconfig/mapjson/530000.json'
import bar from './test.js'

export default {
  data() {
    return {
      map: null,
      count: 0,
      citylist: [],
      data: [],
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.initMap()
    this.initChartMap()
    this.initBar()
  },
  methods: {
    initBar() {
      const bar_box = this.$echarts.init(document.getElementById('bar-gale'))
      bar_box.setOption(bar)
    },
    initChartMap() {
      const map_box = this.$echarts.init(document.getElementById('charts_map'))
      this.$echarts.registerMap('fjs', json)
      const arr = this.$cityLevel.cityArr.map((ele, index) => {
        return {
          name: ele,
          value: Math.random() * 10 - 5,
          value2: (Math.random() * 1000).toFixed(2),
          selected: index == 2 ? true : false,
        }
      })
      const coord = json.features.map((val) => {
        return {
          name: val.properties.name,
          value: val.properties.center,
        }
      })
      map_config.series[0].data = arr
      map_config.series[1].data = coord
      // map_config.series[0].data = coord
      map_box.setOption(map_config)
      map_box.dispatchAction({
        type: 'showTip',
        // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
        seriesIndex: 0,
        // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
        dataIndex: 5,
        // 可选，数据名称，在有 dataIndex 的时候忽略
        // name?: string,
        // 本次显示 tooltip 的位置。只在本次 action 中生效。
        // 缺省则使用 option 中定义的 tooltip 位置。
        // position: Array.<number>|string|Function,
      })
      //   map_box.dispatchAction({
      //     type: 'mapSelect',
      //     // 可选，系列 index，可以是一个数组指定多个系列
      //     seriesIndex: 0,
      //     // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
      //     dataIndex: 3,
      //   })
      map_box.on('globalout', (e) => {
        map_box.dispatchAction({
          type: 'showTip',
          // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
          seriesIndex: 0,
          // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
          //   dataIndex: 3,
          // 可选，数据名称，在有 dataIndex 的时候忽略
          name: '福州市',
          // 本次显示 tooltip 的位置。只在本次 action 中生效。
          // 缺省则使用 option 中定义的 tooltip 位置。
          // position: Array.<number>|string|Function,
        })
      })
    },
    initMap() {
      // 百度地图API功能
      var map = new BMap.Map('allmap') // 创建Map实例
      //福州经纬度坐标点：119.3, 26.08，经度缩小一度，让地图居中显示
      //   map.centerAndZoom(new BMap.Point(118.3, 26.08), 8) // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMap.Point(118.3, 26.08), 5) // 初始化地图,设置中心点坐标和地图级别
      //添加地图类型控件 -- 三维卫星地图和普通地图
      //   console.log(BMAP_NORMAL_MAP, BMAP_HYBRID_MAP)
      //   map.addControl(
      //     new BMap.MapTypeControl({
      //       mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
      //     })
      //   )
      map.setCurrentCity('福州') // 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
      this.map = map
      this.getBoundary('福建')
    },
    getBoundary(districtName) {
      this.count++
      const bdary = new BMap.Boundary()
      bdary.get(districtName, (res) => {
        const len = res.boundaries.length
        console.log(districtName, res)
        for (let index = 0; index < len; index++) {
          this.citylist.push({
            points: res.boundaries[index],
            name: districtName,
          })
        }
        this.drawBoundary()
      })
    },
    drawBoundary() {
      let pointArray = []
      //循环添加各闭合区域
      for (let i = 0; i < this.citylist.length; i++) {
        //添加多边形层并显示
        const ply = new BMap.Polygon(this.citylist[i].points, {
          strokeWeight: 3, //边框宽度           trokeColor: "#FFA96E",   //边框颜色
          //   fillColor: '#DDE4F070', //填充颜色
          fillColor: '#9bb9ec70', //填充颜色
        }) //建立多边形覆盖物
        ply.name = this.citylist[i].name
        // ply.addEventListener("click", that.click);
        this.map.addOverlay(ply)

        //将点增加到视野范围内
        var path = ply.getPath()
        pointArray = pointArray.concat(path)
      }
      //限定显示区域(只显示特定区域，鼠标拖动松开后自动回到显示范围内)，需要引用api库
      // var boundply = new BMap.Polygon(pointArray);
      // BMapLib.AreaRestriction.setBounds(map, boundply.getBounds());
      this.map.setViewport(pointArray) //调整视野
    },
  },
}
</script>
<style lang="scss" scoped>
.map-page {
  position: relative;
}
#bar-gale {
  width: 800px;
  height: 400px;
  background-color: khaki;
}
.map-box {
  width: 60%;
  height: 600px;
  background-color: #eee;
  color: #9bb9ec70;
}
.chart-map-box {
  position: absolute;
  width: 39%;
  height: 600px;
  left: 60%;
  top: 0;
  background: #000153;
}
.nav {
  width: 130px;
  height: 300px;
  background-color: #fff;
  color: #555;
  position: absolute;
  left: 0;
  top: 50px;
}
</style>
<style lang="scss">
// 隐藏地图空间logo和标识
.BMap_cpyCtrl.BMap_noprint.anchorBL {
  display: none;
}
.anchorBL {
  display: none;
}
</style>
