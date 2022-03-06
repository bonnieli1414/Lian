<template>
    <!-- 複製第三週作業的html -->
    <div class="container">
      <h2>後台產品列表</h2>
      <div class="text-end mt-4">
        <!-- v-on:click 綁定"建立新的產品"標籤-->
        <button class="btn btn-primary" type="button"
        @click="openModal('new')"
        >
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
              分類
            </th>
            <th>產品名稱</th>
            <th width="120">
              原價
            </th>
            <th width="120">
              售價
            </th>
            <th width="100">
              是否啟用
            </th>
            <th width="120">
              編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <!-- for迴圈搭配唯一值:key -->
          <tr
          v-for="(item) in products" :key="item.id"
          >
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <td>
              <!-- if/else判別是否啟用 -->
              <span class="text-success"
              v-if="item.is_enabled"
              >啟用</span>
              <span
              v-else
              >未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <!-- v-on:click 綁定"編輯"標籤-->
                <button class="btn btn-outline-primary btn-sm" type="button"
                @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <!-- v-on:click 綁定"刪除"標籤-->
                <button class="btn btn-outline-danger btn-sm" type="button"
                @click="openModal('delete', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
// 初始化
let productModal
let delProductModal

export default {
  data () {
    return {
      products: [],
      isNew: !1,
      tempProduct: {
        // 資料只有imagesUrl到第二層，以及html會使用到第二層的方法，所以要先定義，避免報錯is not defined
        imagesUrl: []
      },
      modal: {
        editModal: '',
        delModal: ''
      }
    }
  },
  // inject: ['emitter'],
  methods: {
    getProducts () {
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`)
        .then((res) => {
          this.products = res.data.products
          console.log(this.products)
        })
    },
    // 使用if判斷isNew狀態
    // 傳參考特性，使用淺拷貝，讓外層的主畫面物件不跟著變動
    openModal (isNew, item) {
      if (isNew === 'new') {
        // 初始化，先清除物件，讓畫面上的欄位都清空
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = 1
        // 展開productModal元件
        productModal.show()
      } else if (isNew === 'edit') {
        // 使用淺拷貝
        this.tempProduct = { ...item }
        this.isNew = !1
        // 展開productModal元件
        productModal.show()
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item }
        // 展開delProductModal元件
        delProductModal.show()
      }
    },
    // 更新產品資訊
    // 使用if判斷使用post或put
    updateProduct () {
      let api
      let httpMethod
      let status
      if (!this.isNew) {
        // 編輯
        // https://vue3-course-api.hexschool.io/v2/api/bonnieli1414/admin/products/all
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
        status = '更新產品'
      } else {
        // 新增
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/product`
        httpMethod = 'post'
        status = '新增產品'
      }
      // axios套件，put或post架構一樣，所以使用中括號帶入變數
      // 第2項參數是依照API文件的格式:物件包物件，要加上花括號
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          this.$httpMessageState(res, status)
          alert(res.data.message)
          // 如果更新成功，則隱藏productModal
          productModal.hide()
          this.getProducts()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    // 刪除產品
    delProduct () {
      this.$http
        .delete(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.products = res.data.products
          console.log(this.products)
          delProductModal.hide()
          this.getProducts()
          // alert(res.data.message)
        })
        .catch((err) => {
          console.log(err.response.data.message)
          alert(err.response.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
