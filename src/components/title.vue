<template>
  <!-- <span
    class="sub-title"
    :style="{ background: 'url(' + require('../static/title.png') + ')' }"
  > -->
  <span v-if="!title" class="sub-title">
    <slot>TITLE</slot>
  </span>
  <span v-else class="sub-title">
    {{ title }}
  </span>
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
.sub-title {
  color: #fff;
  font-size: 15px;
  display: inline-block;
  padding: 2px 10px;
  background-repeat: no-repeat;
  background-size: cover;
  background: linear-gradient(
    to right,
    rgba(82, 157, 228, 0.445) 40%,
    rgba(124, 90, 218, 0.466),
    rgba(255, 255, 255, 0.02)
  );
}
</style>
