<template>
  <div class="xndb-box">
    <div class="left view_1 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div class="chart-box icon-box">
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_qd.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">社会渠道总量</div>
            <div class="text data">
              {{ view_1_obj[0] ? format(Number(view_1_obj[0].idxValue)) : 0 }}个
            </div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_ywl.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">业务量及环比增长率</div>
            <div class="text data">
              {{
                view_1_obj[1]
                  ? format(Number(view_1_obj[1].idxValue).toFixed(0))
                  : 0
              }}笔/{{
                view_1_obj[2]
                  ? Number(view_1_obj[2].idxValue * 100).toFixed(2)
                  : 0
              }}%
            </div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_ywsr.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">业务收入及环比增长率</div>
            <div class="text data">
              {{
                view_1_obj[3]
                  ? format((Number(view_1_obj[3].idxValue) / 10000).toFixed(2))
                  : 0
              }}万元/{{
                view_1_obj[4]
                  ? Number(view_1_obj[4].idxValue * 100).toFixed(2)
                  : 0
              }}%
            </div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_cj.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">酬金及环比增长率</div>
            <div class="text data">
              {{
                view_1_obj[5]
                  ? format((Number(view_1_obj[5].idxValue) / 10000).toFixed(2))
                  : 0
              }}万元/{{
                view_1_obj[6]
                  ? Number(view_1_obj[6].idxValue * 100).toFixed(2)
                  : 0
              }}%
            </div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_xyb.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">效益及效益比</div>
            <div class="text data">
              {{
                view_1_obj[7]
                  ? format((Number(view_1_obj[7].idxValue) / 10000).toFixed(0))
                  : 0
              }}万元/{{
                view_1_obj[8] ? Number(view_1_obj[8].idxValue).toFixed(2) : 0
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="left view_2 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div id="view_left_top" class="chart-box"></div>
      <div
        :class="[v2Status == 'zb' ? 'current' : '']"
        class="title l"
        @click="toZbView()"
      >
        <Title>酬金占收比分析</Title>
      </div>
      <div
        :class="[v2Status == 'date' ? 'current' : '']"
        class="title r"
        @click="toDateView()"
      >
        <Title>酬金及收入时序分析</Title>
      </div>
    </div>
    <div class="left view_3 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div id="view_left_bottom" class="chart-box">
        <div id="pie1" class="pie1"></div>
        <div id="pie2" class="pie2"></div>
      </div>
      <Title class="title" :title="pieTitle">酬金结构分析</Title>
    </div>
    <div class="right view_4 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <Title class="title">效益分布</Title>
      <div id="view-map" class="chart-box map-box"></div>
      <p v-show="!isTopMapView" class="back">
        <i-button type="primary" size="small" @click="backtoTop">
          返回
        </i-button>
      </p>
      <p class="link-text">
        <span @click="linkToPage(1)">查看明细</span>
        <span @click="linkToPage(2)"> 应用案例</span>
      </p>
      <div class="all_data_view">
        <div class="circle">
          <div class="sector1"></div>
          <div class="sector2"></div>
          <div class="circle_inset"></div>
          <div class="circle_inset inset_up"></div>
          <h4 class="name">{{ orgCode.orgName }}</h4>
        </div>
        <div class="data bg_title">
          {{ view_1_obj[8] ? Number(view_1_obj[8].idxValue).toFixed(2) : 0 }}
        </div>
      </div>
    </div>
    <div class="right view_5 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div id="view_right_bottom" class="chart-box">
        <div
          class="top top1"
          :style="{
            backgroundImage: 'url(' + require('../../static/btn.png') + ')',
          }"
        >
          <p
            v-for="(item, index) in top3"
            :key="item.orgName + 'top'"
            class="item"
          >
            <i class="num">{{ index + 1 }}</i>
            <i class="name">{{ item.orgName }}</i>
            <i class="data">{{ (item.value * 100).toFixed(2) }}%</i>
          </p>
        </div>
        <div
          class="top top2"
          :style="{
            backgroundImage: 'url(' + require('../../static/btn.png') + ')',
          }"
        >
          <p v-for="item in last3" :key="item.orgName + 'last'" class="item">
            <i class="num">{{ item.indexNum + 1 }}</i>
            <i class="name">{{ item.orgName }}</i>
            <i class="data">{{ (item.value * 100).toFixed(2) }}%</i>
          </p>
        </div>
      </div>
      <Title class="title">酬金占收比TOP</Title>
    </div>
  </div>
</template>
<script>
import map_config from '@/chartconfig/map.js'
import { view9_1 as bar_config } from '@/chartconfig/bar.js'
import line_config from '@/chartconfig/line.js'
import {
  circleOption1 as pie_config1,
  circleOption2 as pie_config2,
} from '@/chartconfig/pie2.js'
import Title from '@/components/title.vue'
// import json from '@/chartconfig/mapjson/530000.json'
import {
  getDatesParams,
  handleArrdata,
  handleDataEncode2Arr,
  findeUpCityObj,
  handleMapdata,
  formatNumberRgx,
  getMonthsArr,
  //   findMapCode,
} from '../page.util'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Title,
  },
  data() {
    return {
      v2Status: 'zb',
      view9: null,
      mapSum: '0.00',
      isTopMapView: true,
      mapBox: null,
      view_1_obj: [],
      view_2_obj: [],
      view_3_obj: [],
      view_4_obj: [],
      view_5_obj: [],
      view_6_obj: [],
      pieTitleCity: '',
    }
  },
  computed: {
    ...mapGetters(['month', 'orgCode', 'type', 'outLinkId', 'authCityLevel']),
    top3() {
      const copy = JSON.parse(JSON.stringify(this.view_2_obj.slice(1)))
      const arr = copy.sort((a, b) => a.value - b.value)

      return arr.slice(0, 3)
    },
    last3() {
      const copy = JSON.parse(JSON.stringify(this.view_2_obj.slice(1)))
      const arr = copy.sort((a, b) => a.value - b.value)
      arr.map((e, index) => {
        e.indexNum = index
        return e
      })
      return arr.length > 5 ? arr.slice(-3) : arr.length > 3 ? arr.slice(3) : []
    },
    pieTitle() {
      return '当月酬金结构分析（' + this.pieTitleCity + '）'
    },
  },
  watch: {
    month() {
      this.getEncodesAndRequestData()
    },
    orgCode(newval) {
      this.isTopMapView = newval.orgCode == '59'
      this.getEncodesAndRequestData()
    },
    type() {
      try {
        this.getEncodesAndRequestData()
      } catch (error) {
        this.$Message.error('该类型无对应指标，无法获取数据！')
        this.setIsloading(false)
      }
    },
  },
  created() {},
  mounted() {
    // this.initLeftTop()
    this.orgCode.orgCode && this.getEncodesAndRequestData()
    this.isTopMapView = this.orgCode.orgCode == '59'
  },
  methods: {
    ...mapMutations([
      'setChartArr',
      'setOrgCode',
      'setIsloading',
      'setUpdateTime',
    ]),
    format(num) {
      return formatNumberRgx(num)
    },
    backtoTop() {
      const code = this.orgCode.orgCode
      const t = findeUpCityObj(this.authCityLevel, code).parent
      this.setOrgCode(t)
    },
    linkToPage(type) {
      if (type == 1) {
        window.open(
          `/customquery/customQueryInit/${this.outLinkId}?orgCode=${this.orgCode.orgCode}&periodDate=${this.month}`
        )
      }
      if (type == 2) {
        window.open(`/help/useCaseDetail/show?modelCode=bigScren9`)
        // this.$Message.info('暂无功能！')
      }
    },
    toZbView() {
      this.v2Status = 'zb'
      const bar_box = this.$echarts.init(
        document.getElementById('view_left_top')
      )
      bar_box.clear()
      bar_box.setOption(bar_config)
      this.initPie(this.orgCode.orgCode, this.orgCode.orgName)
    },
    toDateView() {
      this.v2Status = 'date'
      const bar_box = this.$echarts.init(
        document.getElementById('view_left_top')
      )
      bar_box.clear()
      bar_box.setOption(line_config)
    },
    //设置地图数据
    initMap(view9encodes_6, orgCodesArr, chartCode, subOrg) {
      const orgCode = this.orgCode.orgCode
      const map_box = this.$echarts.init(document.getElementById('view-map'))
      this.mapBox = map_box
      this.setChartArr({ name: 'chart4', val: map_box })
      const parms = getDatesParams(
        [this.month],
        orgCodesArr,
        view9encodes_6,
        chartCode,
        this.type.value
      )
      Promise.all([
        this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)),
        this.$http.post('/channel/map/assembleJsonObject', {
          parentOrgCode: orgCode,
          viewCode: '9',
        }),
      ]).then(([res1, res2]) => {
        const mapdata = handleMapdata(res1.data.data, subOrg.data.data, 2)
        //求和设置右上角总数
        // const mapsum = eval(
        //   mapdata
        //     .map((ele) => {
        //       return ele.value
        //     })
        //     .join('+')
        // )
        // this.mapSum = mapsum
        //动态设置地图visulMap最大值和最小值,同时找出top1显示
        let top1 = mapdata[0]
        const vals = mapdata.map((v, index) => {
          if (Number(v.value) > Number(top1.value)) {
            top1 = v
          }
          return v.value
        })
        // const max = ~~(Math.max(...vals) + 1)
        // const min = ~~(Math.min(...vals) - 1)
        const max = Math.max(...vals) + 0.2
        const min = Math.min(...vals) - 0.2

        const mapjson = res2.data
        if (!mapjson.features || mapjson.features.length < 1) {
          map_config.isLimitAuth = false
          this.$Message.warning({
            content: '地图数据为空,或者没有权限！不能加载地图',
            top: 50,
            duration: 3,
          })
          map_box.clear()
          return
        } else {
          map_config.isLimitAuth = true
        }
        // const coord = mapjson.features.map((val) => {
        //   return {
        //     name: val.properties.name,
        //     value: val.properties.center,
        //   }
        // })
        this.$echarts.registerMap('fjs', mapjson)
        map_config.visualMap.min = min
        map_config.visualMap.max = max
        map_config.series[0].data = mapdata
        // map_config.series[1].data = coord
        map_box.clear()
        map_box.setOption(map_config)
        //显示top1
        map_box.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          name: top1.name,
          position: ['50%', '50%'],
        })
        //鼠标移入地图区域隐藏top1，移开显示top1
        map_box.off('globalout')
        map_box.on('globalout', () => {
          map_box.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            name: top1.name,
            position: ['50%', '50%'],
          })
        })
      })
      map_box && map_box.off('click')
      map_box &&
        map_box.on('click', (param) => {
          const t = findeUpCityObj(this.authCityLevel, param.data.orgCode)
          this.setOrgCode(t.self)
        })
      setTimeout(() => {
        this.setIsloading(false)
      }, 400)
    },
    //设置饼图数据
    initPie(orgCode, name) {
      this.pieTitleCity = name
      const view9_chart_2 = this.$echarts.init(document.getElementById('pie1'))
      const view9_chart_3 = this.$echarts.init(document.getElementById('pie2'))
      this.setChartArr({ name: 'chart2', val: view9_chart_2 })
      this.setChartArr({ name: 'chart3', val: view9_chart_3 })
      const view9 = this.view9
      const view9encodes_4 = view9.data.data[3].idxs.map((e) => e.idxCde)
      const view9encodes_5 = view9.data.data[4].idxs.map((e) => e.idxCde)
      let dates = [this.month]
      const chartCode = view9.data.data[0].chartCode
      const orgCodes = [orgCode]
      const type = this.type.value
      const parms_view9_chart_2 = getDatesParams(
        dates,
        orgCodes,
        view9encodes_4,
        chartCode,
        type
      )
      const parms_view9_chart_3 = getDatesParams(
        dates,
        orgCodes,
        view9encodes_5,
        chartCode,
        type
      )
      Promise.all([
        this.$http.post(
          '/channelBigScreen/modIdxVOList',
          JSON.parse(parms_view9_chart_2)
        ),
        this.$http.post(
          '/channelBigScreen/modIdxVOList',
          JSON.parse(parms_view9_chart_3)
        ),
      ]).then(([res1, res2]) => {
        this.view_4_obj = handleArrdata(res1.data.data, 2)
        const sum1 = eval(this.view_4_obj.map((ele) => ele.value).join('+'))

        this.view_5_obj = handleArrdata(res2.data.data, 2)
        const sum2 = eval(this.view_5_obj.map((ele) => ele.value).join('+'))

        const sum = sum1 + sum2
        pie_config1.title.text =
          '{a|' +
          '基础酬金' +
          '}\n{c|' +
          formatNumberRgx((sum1 / 10000).toFixed(2)) +
          '万}\n{c|' +
          (sum == 0 ? 0 : ((sum1 / sum) * 100).toFixed(2)) +
          '%}'
        pie_config1.series[0].data = this.view_4_obj
        view9_chart_2.setOption(pie_config1)
        view9_chart_2.resize()

        pie_config2.title.text =
          '{a|' +
          '激励酬金' +
          '}\n{c|' +
          formatNumberRgx((sum2 / 10000).toFixed(2)) +
          '万}\n{c|' +
          (sum == 0 ? 0 : ((sum2 / sum) * 100).toFixed(2)) +
          '%}'
        pie_config2.series[0].data = this.view_5_obj
        view9_chart_3.setOption(pie_config2)
        view9_chart_3.resize()
      })

      //   let parms = getDatesParams(
      //     dates,
      //     orgCodes,
      //     view9encodes_4,
      //     chartCode,
      //     type
      //   )
      //   this.$http
      //     .post('/channelBigScreen/modIdxVOList', JSON.parse(parms))
      //     .then((res) => {
      //       this.view_4_obj = handleArrdata(res.data.data, 2)
      //       const sum = eval(this.view_4_obj.map((ele) => ele.value).join('+'))

      //       pie_config1.title.text =
      //         '{a|' +
      //         '基础酬金' +
      //         '}\n{c|' +
      //         formatNumberRgx((sum / 10000).toFixed(2)) +
      //         '万}'

      //       pie_config1.series[0].data = this.view_4_obj
      //       view9_chart_2.setOption(pie_config1)
      //       view9_chart_2.resize()
      //     })
      //   const view9encodes_5 = view9.data.data[4].idxs.map((e) => e.idxCde)
      //   dates = [this.month]
      //   parms = getDatesParams(dates, orgCodes, view9encodes_5, chartCode, type)
      //   this.$http
      //     .post('/channelBigScreen/modIdxVOList', JSON.parse(parms))
      //     .then((res) => {
      //       this.view_5_obj = handleArrdata(res.data.data, 2)
      //       const sum = eval(this.view_5_obj.map((ele) => ele.value).join('+'))
      //       pie_config2.title.text =
      //         '{a|' +
      //         '激励酬金' +
      //         '}\n{c|' +
      //         formatNumberRgx((sum / 10000).toFixed(2)) +
      //         '万}'
      //       pie_config2.series[0].data = this.view_5_obj
      //       view9_chart_3.setOption(pie_config2)
      //       view9_chart_3.resize()
      //     })
    },
    //查询指标并取值
    async getEncodesAndRequestData() {
      this.setIsloading(true)
      const view9 = await this.$http.post('/channelBigScreen/modInfoList', {
        viewCode: '9',
        chnlType: this.type.value,
      })
      this.view9 = view9
      if (!view9.data.data || view9.data.data.length == 0) {
        this.$Message.error('该类型无对应指标，无法获取数据！')
        this.setIsloading(false)
      }
      const view9encodes_1 = view9.data.data[0].idxs.map((e) => e.idxCde)
      const chartCode = view9.data.data[0].chartCode
      let dates = [this.month]
      let orgCodes = [this.orgCode.orgCode]
      const type = this.type.value
      let parms = getDatesParams(
        dates,
        orgCodes,
        view9encodes_1,
        chartCode,
        type
      )
      //设置view_1值
      this.$http
        .post('/channelBigScreen/modIdxVOList', JSON.parse(parms))
        .then((res) => {
          this.view_1_obj = res.data.data
        })

      //设置view_2&3 的值
      const view9_chart_1 = this.$echarts.init(
        document.getElementById('view_left_top')
      )
      //   const view9_chart_2 = this.$echarts.init(document.getElementById('pie1'))
      //   const view9_chart_3 = this.$echarts.init(document.getElementById('pie2'))
      this.setChartArr({ name: 'chart1', val: view9_chart_1 })
      //   this.setChartArr({ name: 'chart2', val: view9_chart_2 })
      //   this.setChartArr({ name: 'chart3', val: view9_chart_3 })
      const subOrg = await this.$http.post(
        '/channelBigScreen/common/orgInfoList',
        {
          viewCode: '9',
          orgCode: this.orgCode.orgCode,
        }
      )
      const orgCodesArr = subOrg.data.data.map((ele) => ele.orgCode)
      const orgNames = subOrg.data.data.map((ele) => ele.orgName)
      //添加本级选中单位
      orgCodesArr.unshift(this.orgCode.orgCode)
      orgNames.unshift(this.orgCode.orgName)
      const view9encodes_2 =
        view9.data.data[1].idxs.length > 0
          ? view9.data.data[1].idxs.map((e) => e.idxCde)
          : []
      parms = getDatesParams(
        dates,
        orgCodesArr,
        view9encodes_2,
        chartCode,
        type
      )
      //地域分布图
      this.$http
        .post('/channelBigScreen/modIdxVOList', JSON.parse(parms))
        .then((res) => {
          this.view_2_obj = handleDataEncode2Arr(
            res.data.data,
            view9encodes_2,
            4
          )[view9encodes_2[0]].map((item, index) => {
            item.orgName = orgNames[index]
            item.orgCode = orgCodesArr[index]
            item.index = index
            return item
          })

          bar_config.xAxis[0].data = orgNames
          const data = this.view_2_obj
          data[0].itemStyle = {
            color: new this.$echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#FF5722',
                },
                {
                  offset: 1,

                  color: '#FFB800',
                },
              ],
              false
            ),
          }
          bar_config.series[0].data = data
          if (this.v2Status == 'zb') {
            view9_chart_1.setOption(bar_config)
          }
        })
      view9_chart_1.off('click')
      view9_chart_1.on('click', (ele) => {
        const t_code = ele.data.orgCode
        const t_name = ele.data.orgName
        this.initPie(t_code, t_name)
      })
      //时序图
      const view9encodes_3 =
        view9.data.data[2].idxs.length > 0
          ? view9.data.data[2].idxs.map((e) => e.idxCde)
          : []
      orgCodes = [this.orgCode.orgCode]
      dates = getMonthsArr(
        this.month.split('-')[0],
        this.month.split('-')[1],
        13,
        '-'
      )
      parms = getDatesParams(dates, orgCodes, view9encodes_3, chartCode, type)
      this.$http
        .post('/channelBigScreen/modIdxVOList', JSON.parse(parms))
        .then((res) => {
          this.view_3_obj = handleDataEncode2Arr(
            res.data.data,
            view9encodes_3,
            2
          )
          line_config.xAxis.data = getMonthsArr(
            this.month.split('-')[0],
            this.month.split('-')[1],
            13,
            '/'
          )
          line_config.series[0].data = this.view_3_obj[view9encodes_3[0]]
          line_config.series[1].data = this.view_3_obj[view9encodes_3[1]]
          if (this.v2Status == 'date') {
            view9_chart_1.setOption(line_config)
          }
        })

      //view_4饼图的数据设置
      this.initPie(this.orgCode.orgCode, this.orgCode.orgName)

      //设置地图
      const view9encodes_6 = view9.data.data[5].idxs.map((e) => e.idxCde)
      this.initMap(view9encodes_6, orgCodesArr.slice(1), chartCode, subOrg)

      //更新时间
      const view9encodes_7 = ['CJXN_0000_7_1']
      parms = getDatesParams(
        [this.month],
        [this.orgCode.orgCode],
        view9encodes_7,
        chartCode,
        type
      )
      this.$http
        .post('/channelBigScreen/modIdxVOList', JSON.parse(parms))
        .then((res) => {
          const data = res.data.data
          const time = data[0]['idxValue']
          this.setUpdateTime(time)
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.xndb-box {
  position: absolute;
  top: 8%;
  width: 100%;
  height: 92%;
  & > div {
    .bg {
      width: 100%;
      height: 100%;
    }
    .title {
      position: absolute;
      width: 35%;
      left: 10px;
      top: 0px;
    }
    .chart-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .map-box {
      width: 100%;
      height: 100%;
    }
  }
  .left {
    position: absolute;
    width: 62%;
    left: 1%;
  }
  .view_1 {
    top: 2%;
    height: 20%;
    font-size: 1.1em;
    .icon-box {
      .icon-item {
        color: rgba(255, 255, 255, 0.747);
        display: inline-block;
        width: 18.2%;
        margin-left: 1.2%;
        float: left;
        height: 100%;
        position: relative;
        .layout {
          width: 100%;
          @include Ycenter;
        }
        img {
          margin: 5px auto;
          display: block;
        }
        .text {
          text-align: center;
          white-space: nowrap;
        }
      }
    }
  }
  .view_2 {
    top: 24%;
    height: 33%;
    .sub-title {
      width: 100%;
    }
    .l {
      left: 15%;
      cursor: pointer;
    }
    .r {
      left: 50%;
      cursor: pointer;
    }
    .current {
      .sub-title {
        color: orange;
      }
    }
  }
  .view_3 {
    top: 59%;
    height: 39%;
    .pie1 {
      position: absolute;
      width: 50%;
      left: 0;
      top: 20px;
      height: calc(100% - 25px);
      //   height: 100%;
    }
    .pie2 {
      position: absolute;
      width: 50%;
      top: 20px;
      height: calc(100% - 25px);
      //   height: 100%;
      left: 50%;
    }
  }
  .right {
    position: absolute;
    width: 35%;
    left: 64%;
  }
  .view_4 {
    top: 2%;
    height: 55%;
    .back {
      position: absolute;
      left: 20px;
      top: 35px;
      button {
        cursor: pointer;
      }
    }
    .link-text {
      font-size: 14px;

      position: absolute;
      bottom: 5%;
      right: 5%;
      span {
        margin-left: 15px;
        cursor: pointer;
        font-weight: 700;
      }
    }
    .all_data_view {
      position: absolute;
      right: 5%;
      top: 8%;
      width: 140px;
      height: 60px;

      & > div {
        position: absolute;
      }
      .data {
        height: 40px;
        line-height: 40px;
        width: 110px;
        left: 30px;
        top: 10px;
        font-weight: bold;
        z-index: 99;
        font-size: 18px;
        padding-left: 32px;
        text-align: center;
        background-color: rgba(16, 163, 249, 0.231);
        box-shadow: 0 0 3px 3px rgba(36, 114, 240, 0.4) inset,
          0 0 4px 4px rgba(36, 114, 240, 0.3);
      }
      .circle {
        z-index: 101;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 2px solid rgba(36, 114, 240, 0.7);
        box-shadow: 0 0 10px 10px rgba(36, 114, 240, 0.4) inset,
          0 0 6px 6px rgba(36, 114, 240, 0.3);
        .name {
          @include center;
          font-size: 14px;
          width: 100%;
          text-align: center;
          font-weight: bold;
        }
        .sector1,
        .sector2 {
          position: absolute;
          left: 2px;
          top: 2px;
          width: 26px;
          height: 26px;
          border-radius: 100% 0 0 0;
          background-color: #b0e0e6;
        }
        .sector2 {
          transform: rotate(180deg);
          transform-origin: 100% 100%;
        }
        .circle_inset {
          width: 48px;
          height: 48px;
          @include center;
          border-radius: 50%;
          background-color: rgba(0, 1, 83, 0.932);
          //   background-color: rgba(255, 183, 0, 0.953);
          //   box-shadow: 0 0 1px 1px #ffb700;
        }
        .inset_up {
          background-color: rgba(16, 163, 249, 0.231);
          box-shadow: 0 0 3px 3px rgba(36, 114, 240, 0.4) inset,
            0 0 8px 8px rgba(36, 114, 240, 0.3);
        }
      }
    }
  }
  .view_5 {
    top: 59%;
    height: 39%;
    .top {
      position: absolute;
      width: 44%;
      height: 66%;
      top: 20%;
      //   border: 1px solid #033aff6e;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      //   box-shadow: 0 0 5px 5px rgba(36, 114, 240, 0.4) inset,
      //     0 0 4px 4px rgba(36, 114, 240, 0.3);
      //   background-color: #07a2fc15;
      //   box-shadow: 0 0 28px 25px #0263ff3b inset,
      //     0 0 0px 6px rgba(36, 114, 240, 0.3),
      //     6px 6px 4px 6px rgba(18, 63, 134, 0.588);
      .item {
        height: 30%;
        font-size: 18px;
        margin: 0 5%;
        display: flex;
        align-items: center;
        .name {
          flex: 1;
          margin-left: 10px;
          font-size: 16px;
        }
        .num {
          color: #e9d533;
          padding-top: 2px;
        }
        .data {
          color: #e9d533;
        }
      }
    }
    .top1 {
      left: 4%;
    }
    .top2 {
      left: 52%;
    }
  }
}
</style>
<style>
.map-box div:nth-child(2) {
  background-color: rgba(0, 0, 0, 0) !important;
}
.map-tip {
  position: relative;
}
.map-tip-text {
  position: absolute;
  left: 5px;
  top: 5px;
}
.svgofback {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
