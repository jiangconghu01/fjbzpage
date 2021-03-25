<template>
  <Routercompont pageName="xzlw" class="xzlw">
    <template #title1> 新增客户数 </template>
    <template #title2> 新增客户收入 </template>
    <template #title3> 离网客户数 </template>
    <template #title4> 离网客户收入 </template>
    <template #titlebottom> 新增客户数新飞享20元套餐（2020版）变动分析 </template>
  </Routercompont>
</template>
<script>
import Routercompont from './routercompont'
export default {
  components: { Routercompont },
}
</script>
<style lang="scss" scoped>
.xzlw {
  width: calc(100% - 40px);
}
</style>
