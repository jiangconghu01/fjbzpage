<template>
  <div class="zqsc">
    <div class="left">
      <div class="top chart bg_boder_box">
        <Title>政企产品出账收入</Title>
        <Button-group size="small" class="btn-switch">
          <i-button type="primary" class="current" @click="switchView('q')"> 当月 </i-button>
          <i-button type="primary" @click="switchView('a')"> 累计 </i-button>
        </Button-group>
        <div class="bg_boder_inner_box"></div>
        <div id="left_top_chart" class="chart_container"></div>
      </div>
      <div class="bottom chart bg_boder_box">
        <Title>政企产品折扣统计</Title>
        <Button-group size="small" class="btn-switch">
          <i-button type="primary" class="current" @click="switchView('q')"> 当月 </i-button>
          <i-button type="primary" @click="switchView('a')"> 累计 </i-button>
        </Button-group>
        <div class="bg_boder_inner_box"></div>
        <div id="left_bottom_chart" class="chart_container"></div>
      </div>
    </div>
    <div class="right">
      <div class="top chart bg_boder_box">
        <Title>产品出账时序分析-集团电话</Title>
        <div class="bg_boder_inner_box"></div>
        <div id="right_top_chart" class="chart_container"></div>
      </div>
      <div class="bottom chart bg_boder_box">
        <Title>产品折扣时序分析-互联网专线</Title>
        <div class="bg_boder_inner_box"></div>
        <div id="right_bottom_chart" class="chart_container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '@/components/title'
export default {
  components: { Title },
  data() {
    return {
      a: 0,
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    switchView(p) {
      console.log(p)
    },
  },
}
</script>
<style lang="scss" scoped>
.zqsc {
  width: 100%;
  display: flex;
  & > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    .chart {
      flex: 1;
      margin-bottom: 15px;
    }
  }
  .left {
    margin: 0 8px 0 20px;
  }
  .right {
    margin: 0 20px 0 8px;
  }
  .chart_container {
    position: absolute;
    top: 32px;
    width: 100%;
    height: calc(100% - 32px);
  }
}
</style>
<style lang="scss">
.ivu-btn-primary {
  background-color: rgba(4, 4, 112, 0);
  span {
    font-weight: bold;
  }
}
.ivu-btn-group-small > .ivu-btn {
  padding: 1px 12px;
  font-size: 12px;
  border-radius: 1px;
}
.btn-switch {
  position: absolute;
  left: 50%;
  top: 42px;
  transform: translateX(-50%);
  z-index: 1;

  .ivu-btn-primary {
    border-color: #29bee398;
    color: #2795da;
    span {
      font-weight: bold;
    }
  }
  .current.ivu-btn-primary {
    color: #fff;
    //   background-color: #f90;
    //   border-color: #f90;
    background-color: rgba(16, 100, 204, 0.78);
    border-color: #29bde3;
  }
}
</style>
