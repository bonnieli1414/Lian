<template>
    <!-- 將navbar封裝拆成元件存至components =>BackNavbar.vue檔案，並用匯入的型式會進來 -->
    <BackNavbar></BackNavbar>
    <router-view></router-view>
</template>

<script>
import BackNavbar from '@/components/BackNavbar.vue'

// 匯入元件 =>BackNavbar.vue檔案
export default {
  name: 'DashboardView',
  data () {
    return {
      // checkSuccess 預設為 false
      checkSuccess: false
    }
  },
  methods: {
    checkLogin () {
      // 取出token確認是否登入
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      if (token) {
        this.$http.defaults.headers.common.Authorization = `${token}`
        const api = `${process.env.VUE_APP_API}api/user/check`
        this.$http
          .post(api, { api_token: this.token })
          .then(() => {
            this.checkSuccess = true
          })
          .catch((err) => {
            console.log(err.response.data.message)
            alert(err.response.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入')
        this.$router.push('/login')
      }
    }
  },
  components: {
    BackNavbar
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
