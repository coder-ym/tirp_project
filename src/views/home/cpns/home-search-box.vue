<template>
  <div class="home-search-box">
    <div class="location">
      <div class="city" @click="cityClick">{{ cityStore.currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useCityStore from '@/stores/modules/city'


// 城市/位置
const router = useRouter()
const cityStore = useCityStore()
function cityClick() {
  router.push("/city")
}

function positionClick() {
  navigator.geolocation.getCurrentPosition(res => {
    console.log("获取位置成功", res)
  }, err => {
    console.log("获取位置失败", err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

</script>

<style lang="less" scoped>
.home-search-box {
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
      flex: 1;
      color: #333;
    }

    .position {
      display: flex;
      align-items: center;
      width: 75px;

      .text {
        position: relative;
        top: 2px;
        color: #666;
        font-size: 12px;
      }

      img {
        margin-left: 5px;
        height: 18px;
        width: 18px;
      }
    }
  }
}
</style>