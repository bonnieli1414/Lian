<template>
    <h2>產品列表</h2>
    <!-- {{ products }} -->
    <!-- bootstrap起手式，在排版時通常會定義1個容器，叫做container -->
    <div class="container">
      <!-- 格線系統 外層會使用row-->
      <div class="row">
        <!-- 格現形式可以參考bootstrap =>排版 =>欄 -->
        <div class="col">
          <div class="card" style="width: 18rem;">
            <img src="" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
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
