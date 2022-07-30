<template>
  <div class="city top-page">
    <!-- 
      隐藏底部tabbar方案: 
      1.设置CSS样式:高度 100vh z-index > tabbar的z-index bgc等,可以抽取样式到全局中 top-page,需要隐藏tabbar的组件中 添加对应的class 
      2.在路由中meta中配置是否需要隐藏 hideTabBar: true,在APP组件中获取当前路由中的meta信息, 设置tabbar v-if/v-show
    -->
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        input-align="center"
        sharp="round"
        show-action
        @cancel="cancelClick"
      />
      <!-- Tab 标签页 -->
      <!-- van-tab指定name属性的情况下，active的值为当前标签的name tabActive默认索引:name -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <!-- 根据请求的数据创建tab allCities是对象-->
        <template v-for="(value, key, index) in allCities" :key="key">
           <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <!-- city 列表数据 -->
    <div class="content">
      <!-- 根据请求的数据创建 city-group 组件 -->
      <!-- 根据当前 tabActive 显示对应组件-->
      <template v-for="(value, key, index) in allCities" :key="key">
        <city-group v-show="tabActive === key" :group-data="value"></city-group>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router"
import useCityStore from "@/stores/modules/city"
import CityGroup from "./cpns/city-group.vue"

//import YMRequest from "@/services/request"

const searchValue = ref("")
const router = useRouter()

// 取消搜索
function cancelClick() {
  router.back()
  //router.go(-1)
}

/* 
在当前组件中发送网络请求获取数据的缺点:
1.如果网络请求太多, 那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
2.如果页面封装了很多的子组件, 子组件需要这些数据,需要通过prop或者provide/inject 传递数据
每个组件中请求进一步封装: service/modules 在组件中使用不需要关心请求url等配置信息 只需要调用对应模块中的方法
city.js: 维护city组件中的所有网络请求
cityStore 对组件中的数据进行管理
*/
// YMRequest.get({
//   url: "/city/all"
// }).then(res => {
//   console.log(res)
// })

// 通过 cityStore 发送请求获取数据
const cityStore = useCityStore()
cityStore.fetchAllCityData()
const { allCities } = storeToRefs(cityStore)

// 记录active tab
const tabActive = ref("cityGroup")

</script>

<style lang="less" scoped>
.city {
  .top {
    position: relative;
    z-index: 9;
  }

  // 设置内容区域的高度
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>