<template>
  <div class="view">
    <img class="bkimg" src="../static/bg.jpg" alt="" />
    <div class="header">
      <div class="left">
        <div class="back" @click="indexPage">
          <img src="../static/bottom_left.png" alt="" />
          <span>返回首页</span>
        </div>
        <div class="information">
          <span>{{ updateTime }}</span>
        </div>
      </div>
      <div class="pre btn center" @click="prePage">上一页</div>
      <div class="big-title center">{{ titleText }}</div>
      <div class="next btn center" @click="nextPage">下一页</div>
      <div class="right">
        <!-- <div class="date">2020年12月22日</div> -->
        <div class="date">
          <!-- <Date-picker
            v-model="dateVal"
            type="month"
            placeholder="选择月"
            format="yyyy年MM月"
            :editable="false"
            size="small"
            :clearable="false"
            style="width: 145px;"
            @on-change="setTime"
          ></Date-picker> -->
          <el-date-picker
            v-model="dateVal"
            format="yyyy年MM月"
            value-format="yyyy-MM"
            type="month"
            placeholder="选择月"
            @change="setTime"
          >
          </el-date-picker>
        </div>
        <div class="city-box">
          <img class="bk" src="../static/selectbk.jpg" alt="" />
          <!-- <Sm-cascader
            v-model="sct"
            :dataArr="cityList"
            :defaultPrentval="sctp"
          ></Sm-cascader> -->
          <el-cascader
            ref="refHandle"
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            @change="handleChange"
          ></el-cascader>
        </div>
        <div class="type-box">
          <img class="bk" src="../static/selectbk.jpg" alt="" />
          <!-- <Sm-select v-model="st" :data="stypeList"></Sm-select> -->
          <el-select v-model="typeValue" placeholder="请选择">
            <el-option
              v-for="item in typeOoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <router-view />
    <Spin v-show="isloading" fix>
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>loading...</div>
    </Spin>
  </div>
</template>
<script>
const routerArr = ['xndb', 'zczc']
import SmSelect from '@/components/sm.select.vue'
import SmCascader from '@/components/sm.cascader.vue'
import {
  beforeMonth,
  findeUpCityObj,
  getOrgLevel,
  getDatesParams,
} from './page.util'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: { SmSelect, SmCascader },
  data() {
    return {
      currentPage: this.$router.history.current.name,
      dateVal: beforeMonth(),
      level: this.$cityLevel.level,
      sctp: '',
      sct: null,
      st: null,
      stypeList: [],
      cityList: [],
      value: [],
      options: [],
      typeValue: '',
      typeOoptions: [],
    }
  },
  computed: {
    ...mapGetters([
      'month',
      'orgCode',
      'type',
      'isloading',
      'muLabel',
      'authCityLevel',
      'updateTime',
    ]),
    titleText() {
      return this.currentPage == 'xndb'
        ? '多维酬金效能对标'
        : '辅助酬金政策支持'
    },
  },
  watch: {
    // sct(newval, oldval) {
    //   this.setOrgCode(newval)
    // },
    typeValue(newval, oldval) {
      this.setType(newval)
    },
    currentPage(newval) {
      this.getCityList()
    },
    orgCode(newval) {
      this.asyncCascaderValue(newval)
    },
    value() {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false //监听值发生变化就关闭它
      }
    },
  },
  created() {
    this.getTypeList()
    this.getCityList()
    this.getOutLinkId()
  },
  mounted() {
    document
      .getElementsByClassName('el-input__inner')[0]
      .setAttribute('readonly', 'readonly')
    setInterval(function () {
      ;[...document.querySelectorAll('.el-cascader-node__label')].forEach(
        (el) => {
          el.onclick = function () {
            if (this.previousElementSibling) this.previousElementSibling.click()
          }
        }
      )
    }, 500)
    // this.value = ['zujian', 'form', 'radio']
  },
  methods: {
    ...mapMutations([
      'setMonth',
      'setOrgCode',
      'setType',
      'setOutLinkId',
      'setIsloading',
      'setMuLabel',
      'setAuthCityLevel',
    ]),
    asyncCascaderValue(newval) {
      const t = findeUpCityObj(this.authCityLevel, newval.orgCode)
      let cityLevelArr = []
      if (t.self.orgLevel == '1') {
        cityLevelArr = [t.self.orgCode]
      }
      if (t.self.orgLevel == '2') {
        cityLevelArr = [t.parent.orgCode, t.self.orgCode]
      }
      if (t.self.orgLevel == '3') {
        cityLevelArr = ['59', t.parent.orgCode, t.self.orgCode]
      }
      this.value = cityLevelArr
    },
    handleChange() {
      const node = this.$refs.refHandle.getCheckedNodes()
      const currentNode = node[0].data
      this.setOrgCode(currentNode)
    },
    indexPage() {
      this.$router.push({ name: 'index' })
    },
    setTime(newval) {
      this.setMonth(newval)
    },
    prePage() {
      this.setIsloading(true)
      const index = routerArr.indexOf(this.currentPage) - 1
      const name =
        index > -1 ? routerArr[index] : routerArr[routerArr.length - 1]
      this.currentPage = name
      this.$router.push({ name })
    },
    nextPage() {
      this.setIsloading(true)
      const index = routerArr.indexOf(this.currentPage) + 1
      const name = index < routerArr.length ? routerArr[index] : routerArr[0]
      this.currentPage = name
      this.$router.push({ name })
    },
    //获取效能对标页面外链跳转ID
    getOutLinkId() {
      this.$http
        .post('/bigScreen/common/getCustomReportId', { viewCode: '9' })
        .then((res) => {
          this.setOutLinkId(res.data.data.customReportId)
        })
    },
    //加载下拉选类型
    getTypeList() {
      this.$http
        .post('/channelBigScreen/common/channelTypeList', {
          channelTypeCode: 1,
        })
        .then((data) => {
          const t = data.data.data.map((ele) => {
            return {
              label: ele.channelTypeName,
              value: ele.channelTypeCode,
            }
          })
          this.typeOoptions = t
          this.typeValue = t[0].value
        })
        .catch((e) => {
          this.$Message.error('类型选择下拉数据加载失败！')
        })
    },

    //同步加载地市级联Level选择框数据--权限控制
    async getCityList() {
      const viewCode = this.currentPage == 'xndb' ? '9' : '10'
      let userDefaultValue = null
      try {
        userDefaultValue = await this.$http.post(
          '/bigScreen/common/getDefaultValue',
          {
            viewCode: viewCode,
          }
        )
      } catch (error) {
        this.$Message.error('用户默认授权信息加载失败，无法获取数据！')
      }
      //   const orgCode = userDefaultValue.data.data.accountCode
      //   const orgName = userDefaultValue.data.data.orgName
      //   const orgList = await this.$http.post(
      //     '/channelBigScreen/common/orgInfoAuthorizedList',
      //     {
      //       orgCode: orgCode,
      //       viewCode: viewCode,
      //     }
      //   )
      let orgLevelObj = []
      //   if (orgCode == '59') {
      //     orgLevelObj = [
      //       {
      //         orgCode: orgCode,
      //         orgName: '福建',
      //         orgLevel: '1',
      //         pid: null,
      //         orgDefName: '福建省',
      //         children: orgList.data.data,
      //       },
      //     ]
      //     orgLevelObj[0].children.forEach((element, index) => {
      //       this.$http
      //         .post('/channelBigScreen/common/orgInfoAuthorizedList', {
      //           orgCode: element.orgCode,
      //           viewCode: viewCode,
      //         })
      //         .then((res) => {
      //           orgLevelObj[0].children[index].children = res.data.data
      //         })
      //     })
      //   } else {
      //     if (this.$cityLevel.cityOrgMap[orgCode]) {
      //       const name = this.$cityLevel.cityOrgMap[orgCode]
      //       orgLevelObj = [
      //         {
      //           orgCode: orgCode,
      //           orgName: orgName,
      //           orgLevel: '2',
      //           pid: null,
      //           orgDefName: name,
      //           children: orgList.data.data,
      //         },
      //       ]
      //     } else {
      //       orgLevelObj = [
      //         {
      //           orgCode: orgCode,
      //           orgName: orgName,
      //           orgLevel: '2',
      //           pid: null,
      //           orgDefName: orgName,
      //           children: [],
      //         },
      //       ]
      //     }
      //   }
      //   this.setAuthCityLevel(orgLevelObj)

      let flag = false
      const allInfor = await this.$http.post(
        '/channelBigScreen/common/orgInfoAuthorizedAll',
        { viewCode: viewCode, orgCode: '59' }
      )
      const allInforList = allInfor.data.data
      const authLevel = getOrgLevel(allInforList)
      orgLevelObj = authLevel.level
      this.options = orgLevelObj
      // this.value = [orgLevelObj[0].orgCode]
      this.setAuthCityLevel(orgLevelObj)
      allInforList.forEach((val) => {
        if (val.orgCode == this.orgCode.orgCode) {
          flag = true
        }
      })
      if (!this.orgCode.orgCode || !flag) {
        this.setOrgCode(orgLevelObj[0])
      } else {
        this.asyncCascaderValue(this.orgCode)
      }

      this.cityList = []
      this.cityList = orgLevelObj
    },
  },
}
</script>
<style lang="scss">
.view {
  width: 100%;
  height: 100%;
  position: relative;
  .bkimg {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .header {
    position: absolute;
    width: 100%;
    height: 7.5%;
    color: rgb(0, 224, 255);
    font-size: 1em;
    & > div {
      position: absolute;
      bottom: 10%;
    }
    .center {
      bottom: 20%;
    }
    .btn-img {
      position: relative;
      padding: 5px 10px;
      cursor: pointer;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
    }
    .btn {
      background: url('../static/btn.png') no-repeat;
      padding: 5px 10px;
      cursor: pointer;
      background-size: cover;
      background-position: center 0;
    }
    .left {
      width: 23.5%;
      left: 2%;
      color: rgba(0, 225, 255, 0.855);
      div {
        display: inline-block;
        // float: left;
      }
      .back {
        cursor: pointer;
        img {
          height: 20px;
          width: 30px;
          float: left;
        }
        span {
          //   float: left;
          left: 30px;
          height: 20px;
          line-height: 20px;
          display: inline-block;
        }
      }
      .information {
        vertical-align: bottom;
        height: 20px;
        width: calc(95% - 90px);
        margin-left: 5px;
        line-height: 20px;
        color: rgba(255, 255, 255, 0.842);
        border: 1px dashed rgba(0, 225, 255, 0.281);
        border-radius: 2px;
        white-space: nowrap;
      }
    }
    .right {
      right: 2%;
      //   width: 24.5%;
      bottom: -10px;
      color: rgba(0, 225, 255, 0.855);
      & > div {
        display: inline-block;
        img.bk {
          display: inline-block;
          width: 130px;
          height: 30px;
          position: absolute;
        }
      }
      .date {
        display: inline-block;
        width: 80px;
      }
      .type-box {
        width: 100px;
        .text {
          display: inline-block;
        }
        img.bk {
          width: 100px;
        }
      }
      .city-box {
        width: 120px;
        .text {
          display: inline-block;
        }
        img.bk {
          top: 5px;
          width: 120px;
        }
      }
    }
    .big-title {
      font-size: 22px;
      font-weight: bold;
      left: 50%;
      bottom: 25%;
      transform: translateX(-50%);
    }
    .pre {
      left: 33%;
    }
    .next {
      right: 33%;
    }
  }
}
</style>
<style lang="scss">
.ivu-select-dropdown {
  z-index: 99999998;
}
.ivu-date-picker-cells.ivu-date-picker-cells-month {
  width: 260px;
}
.ivu-date-picker-cells.ivu-date-picker-cells-year {
  width: 260px;
}
// .ivu-date-picker .ivu-input[disabled] {
//   background-color: rgba(255, 255, 255, 0);
//   opacity: 1;
//   cursor: pointer;
//   color: rgba(255, 255, 255, 0.8);
// }
// .ivu-picker-panel-body {
//   background-color: $selectbg;
//   color: white;
//   border-radius: 10px;
// }
// .ivu-input-wrapper-small .ivu-input-icon {
//   display: none;
// }
// .ivu-date-picker-focused input {
//   background-color: rgba(16, 162, 249, 0);
// }
// .ivu-input-wrapper .ivu-input {
//   background-color: rgba(16, 162, 249, 0);
//   border: none;
//   color: transparent;
//   text-shadow: 0 0 0 white;
//   font-size: 14px;
//   cursor: pointer;
//   padding-left: 10%;
// }
// .ivu-date-picker-focused input.ivu-input {
//   -webkit-box-shadow: none;
//   box-shadow: none;
// }
// .ivu-date-picker .ivu-select-dropdown {
//   background-color: rgba(16, 162, 249, 0);
//   -webkit-box-shadow: none;
//   box-shadow: none;
// }
.ivu-input-suffix {
  display: none;
}
.ivu-date-picker-focused input.ivu-input {
  font-size: 12px;
}
.ivu-input-wrapper .ivu-input {
  font-size: 12px;
  color: rgba(0, 225, 255, 0.855);
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.ivu-spin-fix {
  background-color: rgba(2, 2, 2, 0.6);
  font-size: 16px;
  z-index: 99999999;
  .demo-spin-icon-load {
    width: 20px;
    height: 20px;
    background-color: #2d8cf0;
  }
}
.ivu-picker-panel-icon-btn i {
  position: relative;
  width: 20px;
  height: 14px;
}
.ivu-icon-ios-arrow-back:before {
  position: absolute;
  content: '';
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
}
.ivu-icon-ios-arrow-forward:before {
  position: absolute;
  content: '';
  display: inline-block;
  left: 0;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.8);
}
.ivu-date-picker-prev-btn-arrow-double i:after {
  position: absolute;

  content: '';
  display: inline-block;
  top: 0;
  right: 2px;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent rgba(255, 255, 255, 0.8) transparent transparent;
}
.ivu-date-picker-next-btn-arrow-double i:after {
  position: absolute;
  content: '';
  display: inline-block;
  top: 0;
  right: 2px;
  width: 0;
  height: 0;
  border: 5px solid;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.8);
}
</style>
<style lang="scss">
// 修改联级下拉样式
.el-cascader__dropdown,
.el-picker-panel,
.el-select-dropdown {
  z-index: 9999999 !important;
}
.el-input__inner {
  height: 28px;
  line-height: 28px;
}
.el-input__suffix {
  display: none;
}
.el-input--suffix .el-input__inner {
  padding-right: 0px;
}
.el-input__inner {
  padding: 0 5px;
}

.el-cascader-node__postfix {
  right: 5px;
}

.el-cascader-node {
  height: 32px;
  line-height: 32px;
}
.el-cascader .el-input .el-input__inner {
  text-align: center;
}
.el-radio__inner {
  display: none;
}
.el-cascader-node > .el-radio,
.el-radio:last-child {
  display: none;
}
.el-cascader-menu__wrap {
  height: 320px;
}
.el-cascader .el-input .el-input__inner:focus,
.el-cascader .el-input.is-focus .el-input__inner {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-select .el-input__inner:focus {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-cascader:not(.is-disabled):hover .el-input__inner {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-select:hover .el-input__inner {
  border-color: rgba(36, 114, 240, 0.4);
}
.el-input__inner:hover {
  border-color: rgba(36, 114, 240, 0.4);
}
.city-box .el-input__inner,
.type-box .el-input__inner {
  background-color: transparent;
  color: #00e0ff;
  border: 1px solid rgba(36, 114, 240, 0.4);
  //   box-shadow: 0 0 8px 5px rgba(36, 114, 240, 0.4) inset;
}
.el-cascader-node__label {
  overflow: inherit;
}
.el-cascader-node__postfix {
  display: none;
}
.el-cascader-menu {
  min-width: 80px;
}
.el-cascader-node {
  padding: 0 10px 0 10px;
}
// 修改下拉样式

//修改时间
.el-input__prefix {
  display: none;
}
.el-input--prefix .el-input__inner {
  padding-left: 0px;
}
.el-date-editor.el-input {
  width: 80px;
}
.date .el-input__inner {
  background-color: rgba(240, 248, 255, 0);
  border: none;
  color: #00e0ff;
  cursor: pointer;
}
</style>
