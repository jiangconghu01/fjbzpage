<template>
  <div class="chn">
    <div class="top chart bg_boder_box">
      <Title>非账单收入结构分析</Title>
      <Button-group size="small" class="btn-switch">
        <i-button type="primary" class="current" @click="switchView('q')"> 当月 </i-button>
        <i-button type="primary" @click="switchView('a')"> 累计 </i-button>
      </Button-group>
      <div class="bg_boder_inner_box"></div>
      <div id="chn_top_chart" class="chart_container"></div>
    </div>
    <div class="bottom">
      <div class="left chart bg_boder_box">
        <Title>累计非账单收入结构分析</Title>
        <div class="bg_boder_inner_box"></div>
        <div id="chn_bottom_left_chart" class="chart_container"></div>
      </div>
      <div class="right chart bg_boder_box">
        <Title>全省-月度非账单收入时序分析</Title>
        <div class="bg_boder_inner_box"></div>
        <div id="chn_bottom_right_chart" class="chart_container"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from '@/components/title'
export default {
  components: { Title },
  data() {
    return {}
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
.chn {
  width: 100%;
  display: flex;
  flex-direction: column;
  & > div {
    flex: 1;
    margin-left: 20px;
    width: calc(100% - 40px);
    margin-bottom: 15px;
  }
  .chart {
    // background-color: rgba(127, 255, 212, 0.322);
  }
  .bottom {
    display: flex;
    & > div {
      flex: 1;
    }
    .left {
      margin-right: 8px;
    }
    .right {
      margin-left: 8px;
    }
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
