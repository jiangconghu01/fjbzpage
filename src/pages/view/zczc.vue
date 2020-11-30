<template>
  <div class="zczc-box">
    <div class="left view_1">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div class="chart-box icon-box bg_title">
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_qd.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">社会渠道总量</div>
            <div class="text data">{{ view_1_obj[0] ? format(Number(view_1_obj[0].idxValue).toFixed(0)) : 0 }}个</div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_ywl.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">业务量及增长率</div>
            <div class="text data">{{ view_1_obj[1] ? format(Number(view_1_obj[1].idxValue).toFixed(0)) : 0 }}笔/{{ view_1_obj[2] ? Number(view_1_obj[2].idxValue * 100).toFixed(2) : 0 }}%</div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_ywsr.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">业务收入及环比增长率</div>
            <div class="text data">
              {{ view_1_obj[3] ? format((Number(view_1_obj[3].idxValue) / 10000).toFixed(2)) : 0 }}万元/{{ view_1_obj[4] ? Number(view_1_obj[4].idxValue * 100).toFixed(2) : 0 }}%
            </div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_cj.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">酬金及环比增长率</div>
            <div class="text data">
              {{ view_1_obj[5] ? format(Number(view_1_obj[5].idxValue / 10000).toFixed(2)) : 0 }}万元/{{ view_1_obj[6] ? Number(view_1_obj[6].idxValue * 100).toFixed(2) : 0 }}%
            </div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_xyb.png" alt="" />
            <div class="text city">{{ orgCode.orgName }}</div>
            <div class="text dsc">效益及效益比</div>
            <div class="text data">{{ view_1_obj[7] ? format(Number(view_1_obj[7].idxValue / 10000).toFixed(2)) : 0 }}万元/{{ view_1_obj[8] ? Number(view_1_obj[8].idxValue).toFixed(2) : 0 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="left view_2 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div id="view_left_top" class="chart-box"></div>
      <Title class="title">酬金分业务口维度分析</Title>
      <Button-group size="small" class="btn-switch">
        <i-button type="primary" :class="[view2 == 'compare' ? 'current' : '']" @click="view2compare"> 按经营单元对比 </i-button>
        <i-button type="primary" :class="[view2 == 'date' ? 'current' : '']" @click="view2date"> 时序图</i-button>
      </Button-group>
      <p class="unit">单位:万元</p>
    </div>
    <div class="left view_3 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div id="view_left_bottom" class="chart-box"></div>
      <Title class="title">
        <p>
        <i>户均酬金结算分析</i>
        <span class="desc-title"
            ><i>(&ensp;口径说明</i>

            <Poptip trigger="hover" class="tip-box" placement="top-start">
        <i><img class="tip-icon" src="../../static/qusetion.jpg" alt="" /></i>
              <div slot="title">
        <i>户均酬金</i>
              </div>
        <div slot="content">
        <p>渠道分析范围为社会渠道，薪酬类型为代办渠道酬金；</p>
                <p>集团信息化产品酬金、激励酬金不参与统计；</p>
        <p>户均酬金的算法=某一个业务发展月在酬金周期内酬金值合计/有效计酬业务笔数；</p>
                <p>举例说明：某业务共有三期，酬金值取三期所有酬金值，有效计酬业务笔数以首期的笔数为准。</p>
        </div>
            </Poptip>
            <i>)</i>
          </span>
        </p>
      </Title>
      <Button-group size="small" class="btn-switch">
        <i-button type="primary" :class="[view3 == 'compare' ? 'current' : '']" @click="view3compare"> 按经营单元对比 </i-button
        ><i-button type="primary" :class="[view3 == 'date' ? 'current' : '']" @click="view3date"> 时序图 </i-button>
      </Button-group>
      <p class="unit">单位:元</p>
    </div>
    <div class="right view_4">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div class="chart-box icon-box bg_title">
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_dx.png" alt="" />
            <div class="text city">电信</div>
            <div class="text dsc">社会渠道总量</div>
            <div class="text data">{{ view_1_obj[9] ? format(Number(view_1_obj[9].idxValue).toFixed(0)) : 0 }}个</div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/icon_dxywl.png" alt="" />
            <div class="text city">电信</div>
            <div class="text dsc">业务量及环比增长率</div>
            <div class="text data">{{ view_1_obj[10] ? format(Number(view_1_obj[10].idxValue).toFixed(0)) : 0 }}笔/{{ view_1_obj[11] ? Number(view_1_obj[11].idxValue * 100).toFixed(2) : 0 }}%</div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/lt_1.png" alt="" />
            <div class="text city">联通</div>
            <div class="text dsc">社会渠道总量</div>
            <div class="text data">{{ view_1_obj[12] ? format(Number(view_1_obj[12].idxValue).toFixed(0)) : 0 }}个</div>
          </div>
        </div>
        <div class="icon-item">
          <div class="layout">
            <img src="../../static/lt_2.png" alt="" />
            <div class="text city">联通</div>
            <div class="text dsc">业务量及环比增长率</div>
            <div class="text data">{{ view_1_obj[13] ? format(Number(view_1_obj[13].idxValue).toFixed(0)) : 0 }}元/{{ view_1_obj[14] ? Number(view_1_obj[14].idxValue * 100).toFixed(2) : 0 }}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="right view_5 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div id="view_right_top" class="chart-box"></div>
      <Title class="title">
        <p>
        <i>酬金预算执行进度分析</i>
        <span class="desc-title"
            ><i>(&ensp;口径说明</i>

            <Poptip trigger="hover" class="tip-box" placement="top-end">
        <i><img class="tip-icon" src="../../static/qusetion.jpg" alt="" /></i>
        <div slot="title">酬金预算执行进度</div>
        <div slot="content">
        <p>已使用酬金取全渠道酬金，按财务审核日期取当年累计到所选月份的已发放酬金；</p>
                <p>预算金额取全面预算系统所选月份所在年份的当年酬金预算总金额。</p>
                <p>执行进度=已使用酬金 / 酬金预算金额</p>
        </div>
            </Poptip>
            <i>)</i>
          </span>
        </p>
      </Title>
      <Button-group size="small" class="btn-switch">
        <i-button type="primary" :class="[view5 == 'compare' ? 'current' : '']" @click="view5compare"> 按经营单元对比 </i-button>
        <i-button type="primary" :class="[view5 == 'date' ? 'current' : '']" @click="view5date"> 时序图 </i-button>
      </Button-group>
    </div>
    <div class="right view_6 bg_title">
      <!-- <img class="bg" src="../../static/divBg.png" alt="" /> -->
      <div id="view_right_bottom" class="chart-box"></div>
      <Title class="title">
        <p>
        <i>高酬金渠道数量区域分布</i>
        <span class="desc-title"
            ><i>(&ensp;口径说明</i>
        <Poptip trigger="hover" class="tip-box" placement="top-end">
              <i><img class="tip-icon" src="../../static/qusetion.jpg" alt="" /></i>
              <div slot="title">高酬金渠道</div>
              <div slot="content">
        <p>渠道分析范围为社会渠道；</p>
                <p>高酬金的算法：某统计月的渠道产生的酬金值排名前10%，可区分地市前10%、县公司前10%；</p>
                <p>说明：若为连锁渠道，计算方式为：该连锁渠道下所有渠道的酬金值合计/连锁渠道数量，</p>
                <p>再参与排名，如存在跨区县的连锁渠道，则分开统计连锁渠道下各区县的渠道酬金合计及渠道数量。</p>
              </div>
        </Poptip>
            <i>)</i>
          </span>
        </p>
      </Title>
      <p class="unit">单位:个</p>
    </div>
  </div>
</template>
<script>
import Title from '@/components/title.vue'
import { getDatesParams, handleArrdata, handleDataEncode2Arr, formatNumberRgx, getMonthsArr, findMapCode, sumAarrays } from '../page.util'
import { tipLabelText } from '../page.static'
import {
  //   view10_1,
  //   view10_2,
  view10_3,
  view10_4,
  view10_5,
  view10_6,
  view10_7,
} from '@/chartconfig/bar.js'
import { view10_2_1, view10_2_2 } from '@/chartconfig/stack.js'
import line_config from '@/chartconfig/view10line.js'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    Title,
  },
  data() {
    return {
      view2: 'compare',
      view3: 'compare',
      view5: 'date',
      view_1_obj: {},
      bar_box_1: null,
      bar_box_2: null,
      bar_box_3: null,
      bar_box_4: null,
      tipText: tipLabelText,
    }
  },
  computed: {
    ...mapGetters(['month', 'orgCode', 'type']),
  },
  watch: {
    month() {
      this.getEncodesAndRequestData()
    },
    orgCode() {
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
    this.orgCode.orgCode && this.getEncodesAndRequestData()
  },
  methods: {
    ...mapMutations(['setChartArr', 'setIsloading', 'setUpdateTime']),
    format(num) {
      return formatNumberRgx(num)
    },
    view2compare() {
      this.view2 = 'compare'
      const bar_box = this.$echarts.init(document.getElementById('view_left_top'))
      bar_box.clear()
      bar_box.setOption(view10_2_1)
    },
    view2date() {
      this.view2 = 'date'
      const bar_box = this.$echarts.init(document.getElementById('view_left_top'))
      bar_box.clear()
      bar_box.setOption(view10_2_2)
    },
    view3compare() {
      this.view3 = 'compare'
      const bar_box = this.$echarts.init(document.getElementById('view_left_bottom'))
      bar_box.clear()
      bar_box.setOption(view10_3)
    },
    view3date() {
      this.view3 = 'date'
      const bar_box = this.$echarts.init(document.getElementById('view_left_bottom'))
      bar_box.clear()
      bar_box.setOption(view10_4)
    },
    view5compare() {
      this.view5 = 'compare'
      const bar_box = this.$echarts.init(document.getElementById('view_right_top'))
      bar_box.clear()
      bar_box.setOption(view10_5)
    },
    view5date() {
      this.view5 = 'date'
      const bar_box = this.$echarts.init(document.getElementById('view_right_top'))
      bar_box.clear()
      bar_box.setOption(line_config)
    },
    async getEncodesAndRequestData() {
      this.setIsloading(true)
      const view10 = await this.$http.post('/channelBigScreen/modInfoList', {
        viewCode: '10',
        chnlType: this.type.value,
      })
      if (!view10.data.data || view10.data.data.length == 0) {
        this.$Message.error('该类型无对应指标，无法获取数据！')
        this.setIsloading(false)
      }
      //设置view_1 头部图标框的值
      const view10encodes_1 = view10.data.data[0].idxs.map((e) => e.idxCde)
      const chartCode = view10.data.data[0].chartCode
      const dates = [this.month]
      const orgCodes = [this.orgCode.orgCode]
      const type = this.type.value
      let parms = getDatesParams(dates, orgCodes, view10encodes_1, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        this.view_1_obj = res.data.data
      })

      //获取下级地市名字和数组
      const subOrg = await this.$http.post('/channelBigScreen/common/orgInfoList', {
        viewCode: '10',
        orgCode: this.orgCode.orgCode,
      })
      const orgNames = subOrg.data.data.map((ele) => ele.orgName)
      const orgCodesArr = subOrg.data.data.map((ele) => ele.orgCode)
      const datesArr = getMonthsArr(this.month.split('-')[0], this.month.split('-')[1], 13, '-')
      const currentYearDateArr = getMonthsArr(this.month.split('-')[0], 12, 12, '-')
      const dateArrName = getMonthsArr(this.month.split('-')[0], this.month.split('-')[1], 13, '/')
      const currentYearDateArrName = getMonthsArr(this.month.split('-')[0], 12, 12, '/')
      //view-2地域分布图
      const view10encodes_2 = view10.data.data[1].idxs.map((e) => e.idxCde)
      const bar_box_1 = this.$echarts.init(document.getElementById('view_left_top'))
      const bar_box_2 = this.$echarts.init(document.getElementById('view_left_bottom'))
      const bar_box_3 = this.$echarts.init(document.getElementById('view_right_top'))
      const bar_box_4 = this.$echarts.init(document.getElementById('view_right_bottom'))
      this.setChartArr({ name: 'chart1', val: bar_box_1 })
      this.setChartArr({ name: 'chart2', val: bar_box_2 })
      this.setChartArr({ name: 'chart3', val: bar_box_3 })
      this.setChartArr({ name: 'chart4', val: bar_box_4 })
      parms = getDatesParams(dates, orgCodesArr, view10encodes_2, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        view10_2_1.xAxis[0].data = orgNames
        const t_data = handleDataEncode2Arr(res.data.data, view10encodes_2, 2)
        const sumArr = sumAarrays(
          t_data[view10encodes_2[0]].map((val) => val.value),
          t_data[view10encodes_2[1]].map((val) => val.value)
        )
        const sumValueDaraArr = t_data[view10encodes_2[1]].map((ele, index) => {
          ele['sumval'] = sumArr[index]
          return ele
        })
        view10_2_1.series[0].data = t_data[view10encodes_2[0]]
        view10_2_1.series[1].data = sumValueDaraArr ? sumValueDaraArr : []
        if (this.view2 == 'compare') {
          bar_box_1.setOption(view10_2_1)
        }
      })
      //view-2时序图
      parms = getDatesParams(datesArr, orgCodes, view10encodes_2, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        view10_2_2.xAxis[0].data = dateArrName
        view10_2_2.xAxis[0].axisLabel.rotate = 25
        const t_data = handleDataEncode2Arr(res.data.data, view10encodes_2, 2)
        const sumArr = sumAarrays(
          t_data[view10encodes_2[0]].map((val) => val.value),
          t_data[view10encodes_2[1]].map((val) => val.value)
        )
        const sumValueDaraArr = t_data[view10encodes_2[1]].map((ele, index) => {
          ele['sumval'] = sumArr[index]
          return ele
        })
        view10_2_2.series[0].data = t_data[view10encodes_2[0]]
        view10_2_2.series[1].data = sumValueDaraArr
        if (this.view2 == 'date') {
          bar_box_1.setOption(view10_2_2)
        }
      })

      //view-3地域分布图
      const view10encodes_3 = view10.data.data[3].idxs.map((e) => e.idxCde)

      parms = getDatesParams(dates, orgCodesArr, view10encodes_3, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        view10_3.xAxis[0].data = orgNames
        view10_3.series[0].data = handleArrdata(res.data.data, 2)
        if (this.view3 == 'compare') {
          bar_box_2.setOption(view10_3)
        }
      })
      //view-3时序图
      parms = getDatesParams(datesArr, orgCodes, view10encodes_3, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        view10_4.xAxis[0].data = dateArrName
        view10_4.xAxis[0].axisLabel.rotate = 25
        view10_4.series[0].data = handleArrdata(res.data.data, 2)
        if (this.view3 == 'date') {
          bar_box_2.setOption(view10_4)
        }
      })

      //view-5地域分布图
      const view10encodes_4 = view10.data.data[2].idxs.map((e) => e.idxCde)
      parms = getDatesParams(dates, orgCodesArr, view10encodes_4, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        view10_5.xAxis[0].data = orgNames
        const t_data = handleDataEncode2Arr(res.data.data, view10encodes_4, 4)
        const percent = t_data[view10encodes_4[0]]
        const usedNum = t_data[view10encodes_4[1]]
        const allNum = t_data[view10encodes_4[2]]
        const chartData = percent.map((ele, index) => {
          const t = ele
          t.value1 = usedNum[index].value
          t.value2 = allNum[index].value
          return t
        })
        view10_5.series[0].data = chartData
        if (this.view5 == 'compare') {
          bar_box_3.setOption(view10_5)
        }
      })
      //view-5时序图
      parms = getDatesParams(currentYearDateArr, orgCodes, view10encodes_4, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        line_config.xAxis[0].data = currentYearDateArrName
        line_config.xAxis[0].axisLabel.rotate = 25

        const t_data = handleDataEncode2Arr(res.data.data, view10encodes_4, 4)
        const percent = t_data[view10encodes_4[0]]
        const usedNum = t_data[view10encodes_4[1]]
        const allNum = t_data[view10encodes_4[2]]
        const chartData = percent.map((ele, index) => {
          const t = ele
          t.value1 = usedNum[index].value
          t.value2 = allNum[index].value
          return t
        })
        //   line_config.series[0].data = handleArrdata(res.data.data, 4)
        line_config.series[0].data = chartData
        if (this.view5 == 'date') {
          bar_box_3.setOption(line_config)
        }
      })

      //view-6地域分布图 ---最后一个没有切换的图
      const view10encodes_5 = view10.data.data[4].idxs.map((e) => e.idxCde)
      parms = getDatesParams(dates, orgCodesArr, view10encodes_5, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        view10_7.xAxis[0].data = orgNames
        view10_7.series[0].data = handleArrdata(res.data.data, 2)
        bar_box_4.setOption(view10_7)
      })

      //更新时间
      const view10encodes_6 = ['ZCZC_0000_6_1']
      parms = getDatesParams([this.month], [this.orgCode.orgCode], view10encodes_6, chartCode, type)
      this.$http.post('/channelBigScreen/modIdxVOList', JSON.parse(parms)).then((res) => {
        const data = res.data.data
        const time = data[0]['idxValue']
        this.setUpdateTime(time)
      })
      setTimeout(() => {
        this.setIsloading(false)
      }, 400)
    },
  },
}
</script>
<style lang="scss" scoped>
.zczc-box {
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
      min-width: 35%;
      left: 10px;
      top: 0px;
      .desc-title {
        font-size: 12px;
      }
    }
    .tip-box {
      color: #222325;
      .tip-icon {
        height: 20px;
        width: 20px;
        cursor: pointer;
        transform: translateY(6px);
      }
    }
    .unit {
      position: absolute;
      top: 5px;
      right: 0px;
      height: 24px;
      line-height: 24px;
      text-align: left;
      width: 60px;
    }
    .btn-switch {
      //   @include Xcenter;
      position: absolute;
      top: 5px;
      right: 70px;
      .current.ivu-btn-primary {
        color: #fff;
        background-color: #f90;
        border-color: #f90;
      }
    }
    .chart-box {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .left {
    position: absolute;
    width: 48.5%;
    left: 1%;
  }

  .view_1 {
    top: 2%;
    width: 55%;
    height: 22%;
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
    top: 26%;
    height: 35%;
  }
  .view_3 {
    top: 63%;
    height: 35%;
  }
  .right {
    position: absolute;
    width: 48.5%;
    left: 50.5%;
  }
  .view_4 {
    left: 57%;
    width: 42%;
    top: 2%;
    height: 22%;
    font-size: 1.1em;
    .icon-box {
      .icon-item {
        color: rgba(255, 255, 255, 0.747);
        display: inline-block;
        width: 23.5%;
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
        }
      }
    }
  }
  .view_5 {
    top: 26%;
    height: 35%;
  }
  .view_6 {
    top: 63%;
    height: 35%;
  }
}
</style>
