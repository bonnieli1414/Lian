// 匯入esm模組
import {createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

// Vue的起手式
createApp({
    data(){
        return{
            user:{
                username : '',
                password : '',
            }
        }
    },
    // 方法
    methods: {
        login(){
            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            // 透過axios取得token和expired
            axios.post(api,this.user).then(
                (res)=>{
                    const {token,expired}=res.data;
                    alert(res.data.message);
                    document.cookie = `
                    hexToken=${token};
                    expires=${new Date(expired)};
                    path=/
                    `;
                    
                    window.location = 'week03_VueProduct.html';
                })
                .catch((err)=>{
                alert(err.data.message);
            })
        }
        
    },
    // 生命週期    
    mounted() {
        // console.log(this);
    },

})
.mount("#app");