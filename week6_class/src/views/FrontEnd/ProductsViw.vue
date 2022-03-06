<template>
    <!-- {{ products }} -->
    <!-- bootstrap起手式，在排版時通常會定義1個容器，叫做container -->
    <div class="container">
      <h2>產品列表</h2>
      <!-- 格線系統起手式 外層會使用row-->
      <!-- row決定內層數量 -->
      <!-- row-cols-1行動版顯示1欄，row-cols-lg-4電腦版顯示4欄 -->
      <!-- g是Gutters間隙，最大值 5，最小值 1 -->
      <!-- 參考網頁https://bootstrap5.hexschool.com/docs/5.1/layout/gutters/  -->
      <div class="row row-cols-1 row-cols-lg-4 g-3">
        <!-- 格線型式可以參考bootstrap =>排版 =>欄 -->
        <!-- 內層不定義寬度 -->
        <!-- 在這裡使用v-for無法控制一排可以放幾個數量，所以可以在上層指定數量 -->
        <div class="col" v-for="product in products" :key="product.id">
          <!-- 以下是引用bootstrap的卡片https://bootstrap5.hexschool.com/docs/5.1/components/card/ -->
          <!-- 指定高度為100 ，避免卡片高低差-->
          <div class="card  h-100">
            <!-- :src使用v-bind -->
            <img :src="product.imageUrl" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <!-- 原本的 a 連結 改成 router-link -->
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
              <!-- :to使用v-bind，並使用樣板字面值帶入變數 -->
              <router-link :to="`/product/${product.id}`" class="btn btn-primary">Go somewhere</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`).then(
        (res) => {
          console.log(this.products)
          this.products = res.data.products
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
