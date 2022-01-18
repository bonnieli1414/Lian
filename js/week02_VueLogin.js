// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// // const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
// const apiPath = 'bonnieli1414';
// const token = "AZy3W3AYToMIMJeMiFr9TzPxwgF3";
// createApp({
//     //資料
//     data() {
//         return {
//             user:{
//                 username : '',
//                 password : '',
//             }            
//         }
//     },
//     // 生命週期(函式)
//     created() {
//         console.log(this);
//     },
//     // 方法(物件)
//     methods: {
//         login(){
//             // const api = `${apiUrl}v2/admin/signin`;
//             const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
//             // const apiPath = 'bonnieli1414';
//             // const token = "AZy3W3AYToMIMJeMiFr9TzPxwgF3";
//             console.log(api);
//             axios.post(api,this.user).then((res)=>{
//                 //取出token和唯一值
//                 const {token,expired}=res.data;
//                 console.log(res.data);
//                 //寫入cookie token
//                 //expires 設置有效時間
//                 document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
//                 window.location = 'week02_VueLogin.html';
//             }).catch((error)=>{
//                 alert(error.data.message);
//             })
//         }
//     },
// }).mount('#app');

import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
      axios.post(api, this.user).then((response) => {
        const { token, expired } = response.data;
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products.html';
      }).catch((error) => {
        alert(error.data.message);
      });
    },
  },
}).mount('#app');

