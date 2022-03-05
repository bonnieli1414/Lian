<template>
  <!-- 取自bootstrap網格 https://bootstrap5.hexschool.com/docs/5.0/layout/grid/ -->
  <div class="container mt-5">
  <h2>請先登入</h2>
  <div class="row">
    <div class="col">
      <!-- 取自取自bootstrap表單 https://bootstrap5.hexschool.com/docs/5.0/forms/overview/ -->
    <form class="form-signin" @submit.prevent="login">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <!-- 使用v-model綁定 -->
        <!-- placeholder屬性是 提交表單之前必須填寫輸入字段。 -->
        <!-- required屬性是 必需在提交表單之前填寫輸入字段-->
        <input type="email" class="form-control" id="exampleInputEmail1"
        v-model="user.username"
        placeholder="name@example.com"
        required>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1"
        v-model="user.password"
        placeholder="Password"
        required>
      </div>
      <button type="submit" class="btn btn-primary btn-lg">登入</button>
    </form>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      // 登入請求
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http
        .post(api, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token};expires=${new Date(expired)}`
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          console.log(err.response.data.message)
          alert(err.response.data.message + '\n' + err.response.data.error.message)
        })
    }
  }
}
</script>
