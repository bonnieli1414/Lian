const app = {
    data() {
      return {
        money: 1000,
        debt: 700,
        rawHTML: '<a href="">點我獲得 100 萬</a>'
      }
    }
  }
  Vue.createApp(app).mount('#app')