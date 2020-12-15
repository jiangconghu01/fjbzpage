<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {
    this.getBaseData()
  },
  mounted() {
    let resizeTimer = ''
    window.addEventListener('resize', () => {
      let charts = this.$store.getters.chartArr
      if (resizeTimer) clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        for (let item in charts) {
          charts[item] && charts[item].resize()
        }
      }, 300)
    })
  },
  methods: {
    getBaseData() {
      //本地启动调试时候调用登录接口获取接口调用权限，只在开发环境中使用
      if (process.env.NODE_ENV == 'development') {
        this.$Modal.confirm({
          title: '开发环境下接口代理前提',
          content:
            '<p>开发环境下跨域代理请求，需要先过用户验证</p>' +
            'code: <input type="text" id="code" placeholder="输入用户名" /><br>' +
            'pass: <input type="password" id="pass" placeholder="输入密码" />',
          onOk: () => {
            const CryptoJS = require('crypto-js')
            const key = CryptoJS.enc.Utf8.parse('medcaesKey201806')
            const code = document.getElementById('code').value
            const pass = document.getElementById('pass').value
            const encryptedData = CryptoJS.AES.encrypt(pass, key, {
              mode: CryptoJS.mode.ECB,
              padding: CryptoJS.pad.Pkcs7,
            })
            const pas = encryptedData.toString()
            this.login(code, pas)
          },
          onCancel: () => {},
        })
      }
    },
    async login(code, pas) {
      try {
        const login = await this.$http.post(
          '/login',
          {
            account: code,
            password: pas,
            yzm: '',
          },
          'test'
        )
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
<style lang="scss">
@import url('./css/reset.scss');
.app {
  height: 100%;
  width: 100%;
  background-color: #000d61;
  color: #fff;
}
</style>
