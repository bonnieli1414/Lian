const app = {
    data() {
      return {
        name: '測試輸入'
      }
    },
    methods: {
      callName() {
        alert(this.name);
      }
    }
  }
  Vue.createApp(app).mount('#app')