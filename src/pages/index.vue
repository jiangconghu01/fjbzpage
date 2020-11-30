<template>
  <div
    class="index"
    :style="{
      backgroundImage: 'url(' + require('../static/index/bg.png') + ')',
    }"
    @click="toView"
  >
    <img class="top-img" src="../static/index/top.png" alt="" />
    <div class="top">
      <img class="logo-img" src="../static/index/logo.png" alt="" />
      <p class="big-title center">项目菜单总览</p>
      <p class="sub-text right">
        <span class="introducer">项目负责人:陈民强</span>
        <span class="introduce-date">提出时间:2019-12-11</span>
      </p>
    </div>
    <div class="content">
      <img class="nav-img" src="../static/index/nav.jpg" alt="" />
      <p class="title">渠道竞争</p>
    </div>
    <div class="nav_1 nav">
      <p class="nav-title">酬金效能评估应用</p>
      <p class="link link1" route-link="xndb">多维酬金评估应用</p>
      <p class="link link2" route-link="zczc">辅助酬金决策支持</p>
    </div>
    <div class="nav_2 nav">
      <p class="nav-title">渠道效能评估应用</p>
      <p class="link link1" route-link="">星级评定辅助</p>
      <p class="link link2" route-link="">渠道关停并转辅助</p>
      <p class="link link3" route-link="">网络经营能力</p>
    </div>
    <div class="nav_3 nav">
      <p class="nav-title">智能布局分析应用</p>
      <p class="link link1" route-link="">开店评估及模拟地址</p>
      <p class="link link2" route-link="">网点效益跟踪报表</p>
    </div>
    <div class="nav_4 nav">
      <p class="nav-title" route-link="">产品效能评估应用</p>
      <p class="link link1" route-link="">产品效益对标分析</p>
    </div>
    <div class="nav_5 nav">
      <p class="nav-title" route-link="">产品定价辅助应用</p>
      <p class="link link1" route-link="">友商产品对标</p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    // this.$Loading.start()
  },
  methods: {
    toView(e) {
      const view = e.target.getAttribute('route-link')
      this.$router.push({ name: view })
      if (view === '') {
        this.$Message.warning('功能尚未开发！')
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  .top-img {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .top {
    position: absolute;
    width: 100%;
    height: 8%;
    color: #00e0ff;
    .logo-img {
      position: absolute;
      width: 220px;
      left: 1%;
      bottom: 15%;
    }
    .center {
      position: absolute;
      font-size: 24px;
      font-weight: bold;
      left: 50%;
      bottom: 25%;
      transform: translateX(-50%);
    }
    .right {
      position: absolute;

      right: 3%;
      bottom: 15%;
      span {
        font-weight: 700;
      }
      .introduce-date {
        margin-left: 15px;
      }
    }
  }
  .content {
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 60%;
    .nav-img {
      width: 100%;
      height: 100%;
    }
    .title {
      font-size: 22px;
      font-weight: bold;
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      top: 0.5%;
    }
  }
  .nav {
    position: absolute;
    top: 34.9%;
    width: 19%;
    height: 40.1%;
    .nav-title {
      font-size: 17px;
      font-weight: bold;
      text-align: center;
    }
    .link {
      position: absolute;
      cursor: pointer;
      left: 46.5%;
      padding: 8px 0;
      font-size: 13px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.3);
    }
  }
  .nav_1 {
    left: 2.5%;
    .link {
      color: rgba(255, 255, 255, 1);
    }
  }
  .nav_2 {
    left: 21.5%;
  }
  .nav_3 {
    left: 40.5%;
  }
  .nav_4 {
    left: 59.5%;
  }
  .nav_5 {
    left: 78.5%;
  }
  .link1 {
    top: 33.5%;
  }
  .link2 {
    top: 61.5%;
  }
  .link3 {
    top: 88.5%;
  }
}
</style>
