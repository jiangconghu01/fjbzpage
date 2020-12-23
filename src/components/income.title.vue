<template>
  <div class="title-box-layout">
    <span v-if="!title" class="title-box">
      <slot>TITLE</slot>
    </span>
    <span v-else class="title-box">
      {{ title }}
    </span>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.title-box-layout {
  text-align: center;
  position: absolute;
  width: 100%;
  left: 0;
  top: 1px;
  z-index: 1;
}
.title-box {
  position: relative;
  display: inline-block;
  min-width: 120px;
  height: 32px;
  //   line-height: 32px;
  font-size: 16px;
  text-align: center;
  //   font-weight: bold;
  padding: 0 20px 2px 20px;
  color: #fff;
  text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.15), 3px 4px 3px rgba(0, 0, 0, 0.305);
  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background: url('../static/income/bt.png') no-repeat;
    z-index: -1;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 0;
    width: 50%;
    height: 100%;
    background: url('../static/income/bt.png') no-repeat;
    background-position-x: right;
    z-index: -1;
  }
  &::before,
  &::after {
    background-size: cover;
  }
}
</style>
