<template>
    <!-- 取自 https://bootstrap5.hexschool.com/docs/5.1/components/navbar/ -->
    <nav class="navbar navbar-expand-lg navbar-light navbar-dark bg-dark">
        <div class="container-fluid">
          <!-- 建議在router環境下都不要出現a連結比較不容易出錯 -->
          <!-- <a class="navbar-brand" href="#">後台</a> -->
          <router-link class="nav-link" to="/">回前台</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <!-- active代表啟用中的連結 顏色較淺-->
                <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
                <router-link class="nav-link" to="/admin/products">產品列表</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/order">訂單</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/coupon">優惠券</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin/article">貼文</router-link>
              </li>
              <div>
                <a href="#" @click.prevent="signout">登出</a>
              </div>
            </ul>
          </div>
          <!-- 透過 checkSuccess 狀態控制 router-vie 要不要呈現，不需要每個頁面都寫 check-->
          <!-- 如果 true 就呈現產品列表和優惠券在畫面上，沒有就不渲染畫面 -->
          <router-view v-if="checkSuccess"></router-view>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'DashboardView',
  data () {
    return {
      // checkSuccess 預設為 false
      checkSuccess: false
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      // 取出token
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
            alert(err.data.message)
            this.$router.push('/login')
          })
      } else {
        alert('您尚未登入')
        this.$router.push('/login')
      }
    }
  }
}
</script>
