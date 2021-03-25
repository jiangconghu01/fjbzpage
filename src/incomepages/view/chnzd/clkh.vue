<template>
  <Routercompont pageName="clkh" class="clkh">
    <template #title1> 升档客户数 </template>
    <template #title2> 升档客户收入 </template>
    <template #title3> 降档客户数 </template>
    <template #title4> 降档客户收入 </template>
    <template #titlebottom> 升档客户数畅享98套餐（2020个人版）变动分析 </template>
  </Routercompont>
</template>
<script>
import Routercompont from './routercompont'
export default {
  components: { Routercompont },
}
</script>
<style lang="scss" scoped>
.clkh {
  width: calc(100% - 40px);
}
</style>
