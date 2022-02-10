// 資料來源為bootstrap網頁的分頁功能
// https://bootstrap5.hexschool.com/docs/5.1/components/pagination/

export default {
  props:['pages'],
  // 搭配bootstrap的disabled功能
    template:`<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled:!pages.has_pre}">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"    
      v-for="page in pages.total_pages" :key="page + 'page'"
      :class="{active:page === pages.current_page}">
      <a class="page-link" href="#"
      @click="$emit('get-product',page)">{{ page }}</a></li>
      <li class="page-item" :class="{disabled:!pages.has_next}">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
};
