/* global axios bootstrap */

import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

// 宣告
// Form, Field, ErrorMessage 元件
// defineRule, configure 函式
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
// 引入多國語系的函式
const { localize, loadLocaleFromURL } = VeeValidateI18n;

// VeeValidate提供的函式，用來定義規則
// 只載入需要使用的
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
// 宣告
loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({ // 用來做一些設定
  //啟用 locale，設定語系
  generateMessage: localize('zh_TW'), 
});

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "bonnieli1414";

// 全域 root
Vue.createApp({
  data() {
    return {
      cartData: {
        // 要先設定 carts 為空陣列，否則會噴錯
        // 亦可設定串連運算子，
        carts:[],
      },
      products: [],
      productId: '',
      // 局部讀取效果
      isLoadingItem:'',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {        
      },
    };
  },
  // VeeValiadation 使用*區域元件*的載入方式
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/api/${apiPath}/products/all`)
      .then((res)=>{
        // console.log(res);
        this.products = res.data.products;
      })
    },
    openProductModal(id){
      this.$refs.productModal.openModal();
      this.productId=id;
    },
    // 先做購物車可以先確認
    getCart(){
      axios.get(`${apiUrl}/api/${apiPath}/cart`)
      .then((res)=>{
        // console.log(res);
        this.cartData = res.data.data;
      })
    },
    // 畫面沒有調整數量的地方，所以這裡設定參數預設值
    addToCart(id,qty=1){
      const data = {
        product_id:id,
        qty,
      };
      this.isLoadingItem = id;
      axios.post(`${apiUrl}/api/${apiPath}/cart`,{data})
      .then((res)=>{
        console.log(res);
        // 加入購物車後，再重新取得購物車資料
        this.getCart();
        this.$refs.productModal.closeModal();
        this.isLoadingItem = '';
      });
    },
    // 清空單項產品
    removeCartItem(id){      
      this.isLoadingItem = 'id';
      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
      .then((res)=>{
        console.log(res);        
        this.getCart(); 
        this.isLoadingItem = '';
      });
    },
    // 刪除全部品項
    deleteAllCarts() {
      const url = `${apiUrl}/api/${apiPath}/carts`;
      axios.delete(url).then((response) => {
        alert(response.data.message);
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
    updateCartItem(item){
      const data = {
        product_id:item.id,
        qty:item.qty,
      };
      this.isLoadingItem = item.id;
      axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`,{data})
      .then((res)=>{
        console.log(res);
        // 更新購物車後，再重新取得購物車資料
        this.getCart(); 
        this.isLoadingItem = '';
      });
    },
    // 客戶填寫訂單
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      const order = this.form;
      axios.post(url, { data: order }).then((response) => {
        alert(response.data.message);
        // 用 vee validate 的方法 resetForm方法清空欄位
        this.$refs.form.resetForm();
        this.getCart();
      }).catch((err) => {
        alert(err.data.message);
      });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
})

// $refs
.component('product-modal',{
  props:['id'],
  template:'#userProductModal',
  data(){
    // 因為 myModal.show() 作用域是在mounted，所以如果要在methods新增，要先在data定義
    return{
      modal:{
      },
      product:{},
      // 加入購物車數量至少要有1個以上
      qty: 1,
    };
  },
  // 監控id
  watch:{
    id(){
      // console.log('this id',this.id);
      this.getProduct();
    }
  },
  methods:{
    // 開啟元件視窗
    openModal(){
      this.modal.show();
    },
    // 關閉元件視窗
    closeModal(){
      this.modal.hide();
    },
    // 取得單一品項
    getProduct(){
      axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
      .then((res)=>{
        // console.log(res);
        this.product = res.data.product;
      })
    },
    addToCart(){
      // console.log(this.qty);
      this.$emit('add-cart',this.product.id, this.qty);
    },
  },
  mounted(){
    // 引用bootstrap互動視窗的透過 JavaScript功能，並改為 $refs
    // const myModal = new bootstrap.Modal(this.$refs.modal);
    // myModal.show();
    // 將 modal.show() 移動至 methods ，並改成 this.modal
    this.modal = new bootstrap.Modal(this.$refs.modal); 
  }
})

//根實體，並掛載於#app
.mount("#app");
