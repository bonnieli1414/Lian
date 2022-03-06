<template>
    <div class="container">
      <h2>後台優惠券</h2>
      <div class="text-end mt-4">
        <!-- v-on:click 綁定"建立新的產品"標籤-->
        <button class="btn btn-primary" type="button"
        @click="openModal('new')"
        >
          建立新的優惠券
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th width="120">
              名稱
            </th>
            <th>折扣百分比</th>
            <th width="120">
              到期日
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
</script>
