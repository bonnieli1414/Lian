import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
// const apiPath = 'bonnieli1414';
// const token = "AZy3W3AYToMIMJeMiFr9TzPxwgF3";

createApp({
    //資料
    data() {
        return {
            user:{
                username : '',
                password : '',
            }            
        }
    },
    // 生命週期(函式)
    created() {
      console.log(this);
    },
    // 方法(物件)
    methods: {
        login(){
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';            
            // console.log(api);
            axios.post(api,this.user).then((res)=>{
                //取出token和唯一值                
                const {token,expired}=res.data;
                alert(res.data.message);
                //寫入cookie token
                //expires 設置有效時間
                // 將token和expires存至cookie，而Cookie參數之間用『；』隔開
                document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
                // 登入後，跳轉至'week02_VueProduct.html'
                window.location = 'week02_VueProduct.html';
            }).catch((error)=>{
                alert(error.data.message);
                // console.dir(error.data.message);               
            })
        }
    },
}).mount('#app');