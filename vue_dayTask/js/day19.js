const app = {
  data() {
    return {
      collegueList: [
        {
          name: 'Jack',
          age: 18,
          jobName: 'Frontend Engineer'
        },
        {
          name: 'Nick',
          age: 27,
          jobName: 'Backend Engineer'
        },
        {
          name: 'Ming',
          age: 19,
          jobName: 'App Engineer'
        },
        {
          name: 'Zekk',
          age: 28,
          jobName: 'Project Manager'
        },
      ]
    }
  }
}
Vue.createApp(app).mount('#app')