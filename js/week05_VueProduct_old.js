/* global axios bootstrap */

import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "bonnieli1414";

const app = createApp({
  data() {
    return {
      cartData: {},
      products: [],
      productId: '',
      // 局部讀取效果
      isLoadingItem:'',
    };
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
    removeCartItem(id){
      this.isLoadingItem = 'id';
      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
      .then((res)=>{
        console.log(res);        
        this.getCart(); 
        this.isLoadingItem = '';
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
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
});

// $refs
app.component('product-modal',{
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
});

app.mount("#app");
