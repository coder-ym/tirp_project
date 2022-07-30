<template>
  <div class="home">
    <home-nav-bar />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box />
    <home-categories />
    <home-content />
    <div class="search-bar-box" v-if="isShowSearchBar">
      <search-bar />
    </div>
  </div>
</template>

<script setup>
import { watch, computed } from 'vue'
import homeNavBar from './cpns/home-nav-bar.vue'
import homeSearchBox from './cpns/home-search-box.vue'
import homeCategories from './cpns/home-categories.vue'
import homeContent from './cpns/home-content.vue'
import searchBar from '@/components/search-bar/search-bar.vue'
import useHomeStore from '@/stores/modules/home'
import useScroll from '@/hooks/useScroll'

const homeStore = useHomeStore()
// 请求数据
homeStore.fetchHomeSuggestsData()
homeStore.fetchHomeCategoriesData()
homeStore.fetchHomeHouseListData()


// useScroll(() => {
//   homeStore.fetchHouselistData()
// })

const { isReachBottom, scrollTop } = useScroll()

// 监听是否滚动到底部
watch(isReachBottom, (newValue) => {
  if (newValue) {
    // 滚动到底部 请求数据 并设置isReachBottom为false
    homeStore.fetchHomeHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 是否显示搜索框
const isShowSearchBar = computed(() => {
  return scrollTop.value > 350
})


</script>

<style lang="less" scoped>
.home {
  padding-bottom: 60px;
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar-box {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
}

</style>