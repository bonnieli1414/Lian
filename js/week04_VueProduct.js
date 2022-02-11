// esm匯入
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
// esm匯入，自訂名稱
import pagination from '../js/week04_pagination.js'; 

// 初始化
let productModal={};
let delProductModal={};

// Vue的起手式
const app = createApp({
  // 區域註冊
  components : {
    pagination
  },
  data(){
    return{
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'bonnieli1414',
      products: [],
      isNew: !1,
      tempProduct: {
        // 資料只有imagesUrl到第二層，以及html會使用到第二層的方法，所以要先定義，避免報錯is not defined
        imagesUrl: [],
      },
      // 分頁
      pagination: {},
    }
  },
  methods: {
    // 登入產品頁面
    checkAdmin(){
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
      .then(()=>{
        this.getData();        
      })
      .catch((err)=>{
        alert(err.data.message);
        // 登入若失敗，則轉回Login頁面
        window.location = 'week04_VueLogin.html';
      })
    },
    // 取得產品資料
    // 參數預設值
    getData(page = 1){
      // ?符號後面稱為query
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;      
      axios.get(url)
      .then((res)=>{
        // console.log(res.data); 
        // this.products = res.data.products;
        // this.pagination = res.data.pagination;
        const { products, pagination } = res.data;
        this.products = products;
        this.pagination = pagination; 
      })
      .catch((err)=>{
        alert(err.data.message);
      })
    }, 
    // 打開元件
    openModal(isNew,item) {
      if (isNew==='new'){
        // 初始化，先清除物件，讓畫面上的欄位都清空
        this.tempProduct = {          
          imagesUrl: []
        };
        this.isNew = 1;
        // 展開productModal元件
        productModal.show();
      }else if (isNew==='edit'){
        // 使用淺拷貝
        this.tempProduct = { ...item };
        this.isNew = !1;
        // 展開productModal元件
        productModal.show();
      }else if (isNew==='delete'){
        this.tempProduct = { ...item };
        // 展開delProductModal元件
        delProductModal.show();
      } 
    },

    // updateProduct改元件化
    // 更新產品資訊
    // 使用if判斷使用post或put
    // updateProduct(){
    //   let url;
    //   let request;
    //   if (!isNew){
    //     // 編輯
    //     url = url + "/this.tempProduct.id";
    //     request = "put";
    //   }else{
    //     // 新增
    //     url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
    //     request = "post"; 
    //   }
    //   // axios套件，put或post架構一樣，所以使用中括號帶入變數
    //   // 第2項參數是依照API文件的格式:物件包物件，要加上花括號
    //   axios[request](url,{ data: this.tempProduct })
    //   .then((res)=>{
    //     alert(res.data.message);
    //     // 如果更新成功，則隱藏productModal
    //     productModal.hide();
    //     this.getData();
    //   })
    //   .catch((err)=>{
    //     alert(err.data.message);
    //   })   
    // },
    // 使用if判斷isNew狀態
    // 傳參考特性，使用淺拷貝，讓外層的主畫面物件不跟著變動

    // delProduct改元件化
    // 刪除產品
    // delProduct(){
    //   const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
    //   axios.delete(url)
    //   .then((res)=>{
    //     alert(res.data.message);
    //     delProductModal.hide();
    //     this.getData();      
    //   })
    //   .catch((err)=>{
    //     alert(err.data.message);
    //   })
    // }    
    // 新增圖片    
    // createImages(){
    //   this.tempProduct.imagesUrl = [];
    //   this.tempProduct.imagesUrl.push('');
    // }, 
    
  },
  // 生命週期
  // mounted是畫面已經掛載完成
  mounted() {
    // 取出token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 預先設定token，供認證後後續checkAdmin異動資料
    axios.defaults.headers.common.Authorization = token;    
    this.checkAdmin();
  },
});

// 週三→週四作業改寫:
// 1.新增分頁元件
// 2.updateProduct(新增/編輯)用元件改寫
// 3.delProduct(刪除)用元件改寫


// 1.新增分頁元件
app.component('pagination',{
  template: '#pagination',
  props: ['pages'],
  methods:{
    emitPages(item){
      this.$emit('emit-pages', item);
    }
  }
});

// 2.updateProduct(新增/編輯)用元件改寫
app.component('productModal', {
  template: '#productModal',
  // 以第2個參數判定post或put
  props: ['product', 'isNew'],
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'bonnieli1414',
      modal: "",
    };
  },
  // 生命週期
  // mounted是畫面已經掛載完成  
  mounted() {
    // 使用bootstrap的Modal
    // 這一句是bootstrap在js使用的方法
    // 參考資料https://getbootstrap.com/docs/5.0/components/modal/#via-javascript
    // 語法:用new建立實體物件    
    // 第2個參數是指可以透過esc按鈕關閉    
    // 第3個參數是點背景可以關閉
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: true,
      backdrop: 'static'
    });
  },
  methods: {
    // 新增和編輯的元件共用，並於html透過參數的 isNew 來判斷是新增還是編輯狀態
    updateProduct() {
      // 新增商品
      let api;
      let request; 
      if (!this.isNew) {
        // 編輯
        api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.product.id}`;
        request = 'put';
      }else{
        // 新增
        api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
        request = 'post';

      }
      axios[request](api, { data: this.product }).then((res) => {
        alert(res.data.message);
        this.hideModal();
        this.$emit('update');
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    createImages() {
      this.product.imagesUrl = [];
      this.product.imagesUrl.push('');
    },
    openModal() {
      productModal.show();
    },
    hideModal() {
      productModal.hide();
    },
  },
})

// 3.delProduct用元件改寫
app.component('delProductModal', {
  template: '#delProductModal',
  props: ['item'],
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'bonnieli1414',
      modal: "",
    };
  },
  // 生命週期
  // mounted是畫面已經掛載完成  
  mounted() {
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: true,
      backdrop: 'static',
    });
  },
  methods: {
    delProduct() {
      axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.item.id}`).then(() => {
        this.hideModal();
        this.$emit('update');
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    openModal() {
      delProductModal.show();
    },
    hideModal() {
      delProductModal.hide();
    },
  },
});
app.mount('#app');