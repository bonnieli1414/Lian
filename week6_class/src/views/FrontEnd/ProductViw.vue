<template>
    <h2>單一產品</h2>
    <!-- {{ products }} -->
    <!-- bootstrap起手式，在排版時通常會定義1個容器，叫做container -->
    <div class="container">
      {{ product }}
      <img :src="product.imageUrl" alt="">
    </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      // $router =>方法
      // $route =>物件 =>取值
      // 使用路由的$route物件屬性取得id的方式
      console.log(this.$route)
      const { id } = this.$route.params
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`).then(
        (res) => {
          console.log(this.product)
          this.product = res.data.product
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
