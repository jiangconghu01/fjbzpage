<template>
  <div class="box">
    <span class="text" :title="defaultVal.label" @click="view = true">
      <img class="sm-select-img" src="../static/btn.png" alt="" />
      {{ defaultVal.label }}
    </span>
    <ul v-show="view" class="options">
      <li v-for="item in data" :key="item.label" :data-value="item.value" class="option" @click="handle(item)">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      required: false,
    },
    data: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      view: false,
    }
  },
  computed: {
    defaultVal() {
      return this.value && this.value.value ? this.value : this.data.length > 0 ? this.data[0] : { label: '无数据', value: 'null' }
    },
  },
  created() {},
  mounted() {
    document.addEventListener('click', (e) => {
      this.view = e.target.className == 'sm-select-img'
    })
  },
  methods: {
    handle(t) {
      this.$emit('input', t)
      this.view = false
    },
  },
}
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  cursor: pointer;
  max-width: 120px;
  display: inline-block;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .text {
    position: relative;
    display: inline-block;
    padding: 5px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 110px;
    text-align: center;
    height: 28px;
  }
  .options {
    position: absolute;
    transition: all 0.5;
    // left: 50%;
    top: 32px;
    width: 110px;
    // transform: translateX(-50%);
    z-index: 100;
    background-color: $selectbg;
    border-radius: 5px;
    color: #fff;
    min-height: 200px;
    max-height: 700px;
    overflow-y: auto;
    li {
      width: 100%;
      line-height: 30px;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover {
        background-color: #2d8cf0;
      }
    }
  }
}
</style>
