// esm module預設匯出
// 使用bootstrap的pagination套件
// 參考資料https://bootstrap5.hexschool.com/docs/5.1/components/pagination/
export default{
    props : ['pages'],
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">

      <li class="page-item" :class="{ disabled: !pages.has_pre }">

        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" 

      :class="{ active:page===pages.current_page }"

      v-for="page in pages.total_pages" :key="page + 'page'">

      <a class="page-link" href="#"
      @click="$emit('get-data',page)"
      >{{ page }}</a></li>

      <li class="page-item" :class="{ disabled: !pages.has_next }">

        <a class="page-link" href="#" aria-label="Next"
        @click="$emit('get-data',page)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
}
