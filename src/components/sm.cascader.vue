<template>
  <div class="box sm-casca-select-box">
    <span class="text" @click="view = true">
      <img class="sm-casca-select-img" src="../static/btn.png" alt="" />
      <i class="city-mu-label">{{ muLabel }}</i>
    </span>
    <ul v-show="view" class="options option1">
      <li v-for="item in level1" :key="item.orgName" :data-value="item.orgCode" :cityname="item.orgName" @click="handleL1(item)" @mouseenter="enterL1(item)">
        {{ item.orgName }}
      </li>
    </ul>
    <ul v-show="view2" class="options option2">
      <li v-for="item in level2.children" :key="item.orgName" :data-value="item.orgCode" :cityname="item.orgName" @click="handleL2(item)" @mouseenter="enterL2(item)">
        {{ item.orgName }}
      </li>
    </ul>
    <ul v-show="view3" class="options option3">
      <li v-for="item in level3.children" :key="item.label" :data-value="item.orgCode" :cityname="item.orgName" :class="item.classname" @click="handleL3(item)">
        {{ item.orgName }}
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    value: {
      type: Object,
      required: false,
    },
    defaultPrentval: {
      type: String,
      required: false,
      default: '',
    },
    dataArr: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      view: false,
      view2: false,
      view3: false,
      //   level1: this.dataArr,
      level2: {},
      level3: {},
      prentLabel: '',
    }
  },
  computed: {
    ...mapGetters(['orgCode', 'muLabel']),
    defaultVal() {
      return this.value && this.value.orgCode ? this.value : this.dataArr.length > 0 ? this.dataArr[0] : { orgName: '无数据', orgCode: 'null' }
    },
    level1() {
      return this.dataArr
    },
  },
  watch: {
    defaultPrentval(val) {
      this.prentLabel = ''
    },
  },
  created() {},
  mounted() {
    document.addEventListener('click', (e) => {
      if (e.target.className == 'sm-casca-select-img') {
        const lis = document.querySelectorAll('.sm-casca-select-box li')
        for (let index = 0; index < lis.length; index++) {
          lis[index].className = ''
        }
        const targetNames = this.muLabel.split('/')
        for (let index = 0; index < targetNames.length; index++) {
          const element = targetNames[index]
          const curr = document.querySelector('li[cityname=' + element + ']')
          curr.className = 'current'
        }
        this.view = true
        if (this.orgCode.orgLevel > 1) {
          this.view2 = true
          this.view3 = this.orgCode.orgLevel > 2
        }
      } else {
        this.view = false
        this.view2 = false
        this.view3 = false
      }
    })
  },
  methods: {
    // ...mapMutations(['setMuLabel']),
    handleL1(t) {
      this.$emit('input', t)
      this.view = false
      this.prentLabel = ''
    },
    enterL1(t) {
      this.view2 = true
      const target = this.level1.find((ele) => {
        return ele.orgCode == t.orgCode
      })
      this.level2 = target
    },
    handleL2(t) {
      this.$emit('input', t)
      this.view2 = false
      this.view3 = false
      this.prentLabel = this.level2.orgName + '/'
    },
    enterL2(t) {
      this.view3 = true
      const target = this.level2.children.find((ele) => {
        return ele.orgCode == t.orgCode
      })
      target.children.map((ele) => {
        if (ele.orgCode == this.orgCode.orgCode) {
          ele.classname = 'current'
        } else {
          ele.classname = ''
        }
        return ele
      })
      this.level3 = target
    },
    handleL3(t) {
      this.$emit('input', t)
      this.view2 = false
      this.view3 = false
      this.prentLabel = this.level2.orgName + '/' + this.level3.orgName + '/'
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
    width: 100%;
    padding: 5px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    min-width: 120px;
    text-align: center;
  }
  .options {
    position: absolute;
    top: 32px;
    width: 60px;
    z-index: 99999998;
    background-color: $selectbg;
    border-radius: 5px;
    color: #fff;
    // min-height: 200px;
    max-height: 500px;
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
    .current {
      color: gold;
      background-color: #2d8cf0;
    }
  }
  .option2 {
    left: 60px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
  .option3 {
    left: 120px;
    border-left: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>
