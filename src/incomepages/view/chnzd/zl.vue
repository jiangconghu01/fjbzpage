<template>
  <div ref="chnzlbox" class="chnzl">
    <div class="top-left box">
      <div class="chart bg_boder_box">
        <Title>月度收入变动分析</Title>
        <div id="left_top_chart" class="chart_box"></div>
      </div>
      <p class="desc bg_boder_box">口径说明:个人客户-不含集团付号码、物联网号码、聚类号码</p>
      <div class="list">
        <div v-for="item in boxList" :key="item.label" class="list_box bg_boder_box">
          <p class="label">{{ item.label }}</p>
          <p class="number">
            <i class="text">环比</i>
            <i class="persent">{{ item.value }}</i>
            <img v-if="!item.isGrow" class="down" src="../../../static/income/down_row.png" alt="" />
            <img v-if="item.isGrow" class="up" src="../../../static/income/up_row.png" alt="" />
          </p>
        </div>
      </div>
    </div>
    <div class="top-right box bg_boder_box map-box">
      <Title>本月出账收入增幅变动温差图</Title>
      <div class="sum">
        <span class="text">{{ orgCode.label }}</span
        ><span class="number">{{ mapTipData + '%' }}</span>
      </div>
      <div id="right_map_chart" class="chart_box"></div>
    </div>
    <div ref="tablebox" class="bottom box">
      <div ref="table" class="scale">
        <div v-for="(item, key, index) in tableList" :key="key" class="list bg_boder_box" :class="['list_' + (index + 1)]">
          <Title>{{ tableTitle[index] }}</Title>
          <div class="table_box">
            <table>
              <thead>
                <tr class="hd">
                  <th class="num">序号</th>
                  <th class="name">产品名称</th>
                  <th class="out">
                    <i>出账收入</i>
                    <svg t="1614593211144" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2154" width="32" height="32">
                      <path d="M537.23364478 64.80373818l0 757.00934561L467.14018667 821.81308379 467.14018667 64.80373817l70.09345811 1e-8z" fill="#ffffff" p-id="2155"></path>
                      <path d="M607.32710289 785.36448563L503.58878481 961.99999999l-106.54205626-176.63551436 210.28037434 0z" fill="#ffffff" p-id="2156"></path>
                    </svg>
                  </th>
                  <th class="usernum">客户数</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ele, ind) in item" :key="ele.brandId">
                  <td>{{ ind + 1 }}</td>
                  <td class="name" :title="ele.productName">{{ ele.productName }}</td>
                  <td v-if="incomeType === 'zq'">{{ ele.sumFeeSum }}</td>
                  <td v-if="incomeType === 'zh'">{{ ele.discIncomeSum }}</td>
                  <td>{{ ele.userCntSum }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '@/components/income.title.vue'
import zlBar from '@/chartconfig/income/chn/zlbar.js'
import map_config from '@/chartconfig/income/chn/map.js'
import { getDatesParams, getMonthsArr, formatNumberRgx, handleMapdata } from '../../page.util'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Title,
  },
  data() {
    return {
      tableList: {
        l2: [],
        l3: [],
        l4: [],
        l6: [],
      },
      tableTitle: ['新增客户收入TOP10基本包', '存量客户升档收入TOP10基本包', '存量客户降档损失TOP10基本包', '客户离网收入TOP10基本包'],
      list: [
        {
          label: '新增客户收入增长',
          number: '0',
        },
        {
          label: '存量客户基本包外收入增长',
          number: '0',
        },
        {
          label: '存量客户升档收入',
          number: '0',
        },
        {
          label: '存量客户降档损失',
          number: '0',
        },
        {
          label: '存量客户基本包外收入损失',
          number: '0',
        },
        {
          label: '客户离网收入损失',
          number: '0',
        },
      ],
      mapTipData: 0,
    }
  },
  computed: {
    ...mapGetters(['month', 'orgCode', 'authCityLevel', 'listAuth', 'incomeType']),
    boxList() {
      return this.list.map((v) => {
        if (!v.idxName) {
          return ''
        }
        const name = v.idxName.split('_')
        v.label = name[0]
        v.isGrow = v.idxValue >= 0
        v.value = (v.idxValue * 100).toFixed(2) + '%'
        return v
      })
    },
  },
  watch: {
    month(nv, ov) {
      this.initTables()
      this.initCharts()
    },
    incomeType(nv, ov) {
      this.initTables()
      this.initCharts()
    },
    orgCode(nv, ov) {
      this.initTables()
      this.initCharts()
    },
  },
  created() {},
  mounted() {
    // const box = this.$echarts.init(document.getElementById('left_top_chart'))
    // box.setOption(zlBar)
    this.initTables()
    this.initCharts()
    this.scaleBottomTable()
    window.addEventListener('resize', this.scaleBottomTable)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.scaleBottomTable)
  },
  methods: {
    ...mapMutations(['setOrgCode', 'setChartArr']),
    scaleBottomTable() {
      const ref = this.$refs.tablebox
      const height = ref.clientHeight
      const table = this.$refs.table
      table.style.transform = `scale(1, ${height / 310})`
    },
    async initCharts() {
      const month = this.month
      const code = this.orgCode.value
      const type = '0000'
      const dataurl = '/channelBigScreen/modIdxVOList'
      const encodeRes = await this.$http.post('/channelBigScreen/modInfoList', {
        viewCode: '101',
        chnlType: '0000',
      })
      const encodes = encodeRes.data.data
      let encodeBar = []
      let barChartCode = ''

      let cenodeMap = []
      let mapChartCode = ''

      let encodeList = []
      let listChartCode = ''
      if (this.incomeType === 'zq') {
        encodeBar = encodes[0].idxs.map((ele) => ele.idxCde)
        barChartCode = encodes[0].chartCode

        encodeList = encodes[1].idxs.map((ele) => ele.idxCde)
        listChartCode = encodes[1].chartCode
        cenodeMap = encodes[2].idxs.map((ele) => ele.idxCde)
        mapChartCode = encodes[2].chartCode
      }
      if (this.incomeType === 'zh') {
        encodeBar = encodes[3].idxs.map((ele) => ele.idxCde)
        barChartCode = encodes[3].chartCode

        encodeList = encodes[4].idxs.map((ele) => ele.idxCde)
        listChartCode = encodes[4].chartCode
        cenodeMap = encodes[5].idxs.map((ele) => ele.idxCde)
        mapChartCode = encodes[5].chartCode
      }
      //查左中列表信息
      const paramList = JSON.parse(getDatesParams([month], [code], encodeList, listChartCode, type))
      this.$http.post(dataurl, paramList).then((res) => {
        const list = res.data.data
        this.list = list
      })
      //查左上图表数据
      const paramBar = JSON.parse(getDatesParams([month], [code], encodeBar, barChartCode, type))
      this.$http.post(dataurl, paramBar).then((res) => {
        this.initBar(res.data.data)
      })
      //查地图数据
      const subOrg = await this.$http.post('/channelBigScreen/common/orgInfoList', {
        viewCode: '101',
        orgCode: code,
      })

      this.initMap(cenodeMap, mapChartCode, subOrg.data.data)
    },
    initTables() {
      const userTypes = [
        { name: '新增用户', value: '2' },
        { name: '存量升档', value: '3' },
        { name: '存量降档', value: '4' },
        { name: '离网', value: '6' },
      ]
      const month = this.month.replace('-', '')
      const code = this.orgCode.value
      //   const code = '59'
      const urlMap = {
        zq: '/bigScreen/income/topN',
        zh: '/bigScreen/income/discTopN',
      }
      userTypes.forEach((ele) => {
        this.$http.post(urlMap[this.incomeType], { viewCode: '101', orgCode: code, sumMonth: month, topN: '10', userType: ele.value }).then((res) => {
          if (res.data.data) {
            this.tableList['l' + ele.value] = res.data.data.map((ele) => {
              ele.sumFeeSum = formatNumberRgx(Number(ele.sumFeeSum / 10000).toFixed(2))
              ele.userCntSum = formatNumberRgx(Number(ele.userCntSum / 10000).toFixed(2))
              ele.discIncomeSum = formatNumberRgx(Number(ele.discIncomeSum / 10000).toFixed(2))
              return ele
            })
          } else {
            this.tableList['l' + ele.value] = []
          }
        })
      })
    },
    initBar(list) {
      const data = list.map((v) => {
        v.value = Number(v.idxValue)
        v.name = v.idxName
        return v
      })
      //   const d = [213069.24, 1317.35, 18502, 875.23, 400, -709, -18493, 19716, 213214]
      //   const data = d.map((v) => ({ name: 'xxxx', value: v }))
      this.drawLine(data)
    },
    initMap(cenodeMap, mapChartCode, orgCodes) {
      const month = this.month
      const code = this.orgCode.value
      const type = '0000'
      const map_box = this.$echarts.init(document.getElementById('right_map_chart'))
      this.setChartArr({ name: 'chart2', val: map_box })
      const dataurl = '/channelBigScreen/modIdxVOList'
      const mapJsonUrl = '/channel/map/assembleJsonObject'
      const orgCodesArr = orgCodes.map((ele) => ele.orgCode)
      const paramMap = JSON.parse(getDatesParams([month], [code, ...orgCodesArr], cenodeMap, mapChartCode, type))
      Promise.all([
        this.$http.post(dataurl, paramMap),
        this.$http.post(mapJsonUrl, {
          parentOrgCode: code,
          viewCode: '101',
        }),
      ]).then(([res1, res2]) => {
        const resData = res1.data.data

        const targetData = handleMapdata(resData, orgCodes, 4)
        const provinceData = resData.filter((v) => v.accountCode === code)
        this.mapTipData = provinceData[0] ? Number(provinceData[0].idxValue * 100).toFixed(2) : 0
        const mapjson = res2.data
        if (!mapjson.features || mapjson.features.length < 1) {
          this.$Message.warning({
            content: '地图数据为空,或者没有权限！地图加载失败！',
            top: 50,
            duration: 3,
          })
          map_box.clear()
          return
        }
        this.$echarts.registerMap('fjs', mapjson)
        map_box.clear()

        let top1 = targetData[0]
        const vals = targetData.map((v, index) => {
          if (Number(v.value) > Number(top1.value)) {
            top1 = v
          }
          return v.value ? Number(v.value) : 0
        })
        let max = Math.max(...vals)
        let min = Math.min(...vals)
        if (max - min < 0.01) {
          max = max + 0.1
        }
        map_config.series[0].data = targetData
        map_config.visualMap.max = max
        map_config.visualMap.min = min
        map_box.setOption(map_config)
        //显示top1
        map_box.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          name: top1.name,
          position: ['55%', '55%'],
        })
        //鼠标移入地图区域隐藏top1，移开显示top1
        map_box.off('globalout')
        map_box.on('globalout', () => {
          map_box.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            name: top1.name,
            position: ['55%', '55%'],
          })
        })
        map_box && map_box.off('click')
        map_box &&
          map_box.on('click', (param) => {
            //   const t = findeUpCityObj(this.authCityLevel, param.data.orgCode)
            //   this.setOrgCode(t.self)
            console.log(param)
            this.setOrgCode({ value: param.data.orgCode, orgDefName: param.data.name, label: param.data.orgName })
          })
      })
    },
    drawLine: function (data) {
      const _this = this
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('left_top_chart'))
      this.setChartArr({ name: 'chart1', val: myChart })
      // 绘制图表
      // 获取系列的函数 可以配色
      myChart.clear()
      const legend = {
        start: '统计期量',
        end: '统计期量',
        minus: '回落',
        positive: '增加',
      }
      function getSeries(arr, renderItemName, legend) {
        let sum = 0
        const series = []

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
                x = (x / 10000).toFixed(2)
                return formatNumberRgx(x)
              },
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = new _this.$echarts.graphic.LinearGradient(
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
                  let colorList1 = new _this.$echarts.graphic.LinearGradient(
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

        let rectShape = _this.$echarts.graphic.clipRectByRect(
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
      let option = {
        grid: {
          top: 45,
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
              var newParamsName = '' // 最终拼接成的字符串
              var paramsNameNumber = params.length // 实际标签的个数
              var provideNumber = 6 // 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber) // 换行的话，需要显示几行，向上取整
              /**
               * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
               */
              // 条件等同于rowNumber>1
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = '' // 表示每一次截取的字符串
                  var start = p * provideNumber // 开始截取的位置
                  var end = start + provideNumber // 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p == rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr // 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params
              }
              //将最终的字符串返回
              return newParamsName
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
      option.xAxis.data = data.map((item) => item.name)
      myChart.setOption(option)
    },
  },
}
</script>
<style lang="scss" scoped>
.chnzl {
  width: calc(100% - 40px);
  left: 20px;
  .box {
    position: absolute;
    .chart_box {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  .top-left {
    width: 64%;
    left: 0;
    top: 0;
    height: 53%;
    display: flex;
    flex-direction: column;
    .chart {
      flex: 1;
    }
    .desc {
      margin-top: 5px;
      padding: 2px 0 2px 10px;
      font-size: 14px;
    }
    .list {
      height: 60px;
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      //   font-size: 14px;
      .list_box {
        padding: 5px 8px;
        .label {
          height: 24px;
          line-height: 24px;
          white-space: nowrap;
        }
        .number {
          font-size: 16px;
          white-space: nowrap;
          .text {
            margin-right: 3px;
          }
          img {
            width: 18px;
            // position: absolute;

            position: relative;
            right: 4px;
            top: 3px;
          }
          .up {
            transform: rotate(90deg);
          }
          .down {
            transform: rotate(-90deg);
          }
        }
      }
    }
  }
  .top-right {
    width: 35%;
    left: 65%;
    height: 53%;
  }
  .bottom {
    top: 55%;
    width: 100%;
    height: 43%;
    .scale {
      height: 310px;
      display: flex;
      transform-origin: left top;
    }

    .list {
      flex: 1;
      height: 100%;
      margin-left: 10px;
      overflow: hidden;
      .table_box {
        margin-top: 32px;
        overflow: hidden;
        height: calc(100% - 32px);
        table {
          width: 100%;
          margin-top: -15px;
          table-layout: fixed;
        }
        th {
          font-size: 13px;
          height: 10px;
          vertical-align: center;
          font-weight: bold;

          padding: 3px 0px;
          &.name {
            text-align: left;
            padding-left: 3px;
          }
          i {
            font-weight: bold;
          }
        }
        th.out {
          svg {
            width: 16px;
            position: relative;
            left: -5px;
            top: 11px;
          }
        }
        .num {
          width: 35px;
          padding-left: 3px;
        }
        .usernum {
          width: 50px;
        }
        .out {
          width: 80px;
        }
        td {
          text-align: left;
          padding: 3px 5px;
          white-space: nowrap;
          &.name {
            width: 50%;
            text-overflow: ellipsis;
            min-width: 180px;
            overflow: hidden;
          }
        }

        tr:nth-child(even) {
          background: #5978e2;
        }
        tr:nth-child(odd) {
          background: rgb(33, 71, 192);
        }
        tr.hd {
          height: 30px;
          background: #5978e2;
        }
      }
    }
    .list_1 {
      margin-left: 0px;
    }
  }
  .sum {
    position: absolute;
    right: 8px;
    top: 25px;
    width: 110px;
    height: 50px;
    background: url('../../../static/income/hj.png') no-repeat;
    background-size: contain;
    span {
      position: absolute;
      //   font-weight: bold;
    }
    .text {
      left: 9px;
      top: 13px;
      font-weight: bold;
    }
    .number {
      left: 55px;
      top: 9px;
      font-size: 16px;
      transform: scale(0.9, 1);
      transform-origin: left top;
    }
  }
}
</style>
<style lang="scss">
.map-box div:nth-child(2) {
  background-color: rgba(0, 0, 0, 0) !important;
  width: 140px;
  height: 100px;
  padding: 0 !important;
}
.map-tip {
  position: relative;
  width: 140px;
  height: 100px;
  p {
    height: 38px;
    line-height: 38px;
    text-align: center;
  }
}
.svgofback {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>
