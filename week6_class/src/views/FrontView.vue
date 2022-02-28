<template>
<!-- 將navbar封裝拆成元件存至components =>FrontNavbar.vue檔案，並用匯入的型式會進來 -->
    <FrontNavbar></FrontNavbar>
    <router-view></router-view>
</template>
<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

// 匯入元件 =>FrontNavbar.vue檔案
export default {
  components: {
    FrontNavbar
  }
}
</script>
