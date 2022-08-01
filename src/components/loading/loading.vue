<template>
  <div class="loading" v-if="mainStore.isShowLoading" @click="loadingClick">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="">
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

function loadingClick() {
  mainStore.isShowLoading = false
}

</script>

<style lang="less" scoped>
.loading {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);

  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px;
    }
  }
}
</style>