<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <!-- 建議在router環境下都不要出現a連結比較不容易出錯 -->
          <!-- <a class="navbar-brand" href="#">前台</a> -->
          <router-link class="navbar-brand" to="/">首頁</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <!-- active代表啟用中的連結 顏色較淺-->
                <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
                <!-- <router-link class="nav-link" to="/">前台</router-link> -->
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/products">產品列表</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/cart">購物車</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/admin">後台</router-link>
              </li>
              <!-- <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li> -->
              <!-- <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><hr class="dropdown-divider"></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> -->
              <!-- <li class="nav-item">
                <a class="nav-link disabled">Disabled</a>
              </li> -->
            </ul>
            <!-- <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form> -->
          </div>
          <button type="button" class="btn btn-primary">
            結帳
            <span class="badge rounded-pill bg-danger"> {{ cartData.carts.length }} </span>
          </button>
        </div>
    </nav>
</template>

<script>
// 引入 emitter 外部套件
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cartData: {
        carts: []
      }
    }
  },
  methods: {
    // 先做購物車可以先確認
    getCart () {
      // `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`
      this.$http(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          console.log('cart', res)
          this.cartData = res.data.data
        })
    }
  },
  mounted () {
    this.getCart()
    // 引入 emitter 外部套件
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
