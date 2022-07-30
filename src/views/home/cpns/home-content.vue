<template>
  <div class="home-content">
    <h2 class="title">热门精选</h2>
    <div class="content-list">
      <template v-for="item in houselist" :key="item.data.houseId">
      <house-item-v9 v-if="item.discoveryContentType === 9" :item-data="item.data" />
      <house-item-v3 v-else-if="item.discoveryContentType === 3" :item-data="item.data" />
        
      </template>
    </div>
</div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import useHomeStore from '@/stores/modules/home'
import houseItemV3 from '@/components/house-item/house-item-v3.vue'
import houseItemV9 from '@/components/house-item/house-item-v9.vue';

const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

</script>

<style lang="less" scoped>
.home-content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }

  .content-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>