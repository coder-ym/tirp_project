<template>
  <div class="city-group">
    <!-- 城市列表数据 -->
    <van-index-bar highlight-color="#ff9854" :indexList="indexList" @select="indexBarClick(index)">
      <!-- 热门 -->
      <van-index-anchor index="#">热门</van-index-anchor>
      <div class="hot-city-list">
        <template v-for="hotCity in groupData.hotCities">
          <div class="hot-city-item" @click="cityClick(hotCity)">{{ hotCity.cityName }}</div>
        </template>
      </div>

      <!-- 城市列表 -->
      <template v-for="group in groupData.cities" :key="group.title">
        <van-index-anchor :index="group.group">{{ group.group }}</van-index-anchor>
          <template v-for="city in group.cities" :key="city.cityId">
            <van-cell :title="city.cityName" @click="cityClick(city)" />
          </template>
      </template>
  </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'

const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

// 根据数据动态创建索引
const indexList = computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift("#")
  return list
})

// 监听 hotCity 和 cell 的点击 返回home 存储当前city
const router = useRouter()
const cityStore = useCityStore()

function cityClick(city) {
  router.back()
  cityStore.currentCity = city
  console.log(cityStore.currentCity)
}

</script>

<style lang="less" scoped>
.city-group {

  .hot-city-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .hot-city-item {
      width: 70px;
      height: 28px;
      border-radius: 14px;
      font-size: 12px;
      color: #000;
      text-align: center;
      line-height: 28px;
      background-color: #fff4ec;
      margin: 6px 0;
    }
  }
}
</style>