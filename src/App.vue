<template>
  <div class="app">
    <router-view/>
    <!-- 根据路由中配置的信息判断是否隐藏tabbar -->
    <!-- <tab-bar v-if="!route.meta.hideTabBar"/> -->
    <tab-bar/>
  </div>
</template>

<script setup>
import tabBar from './components/tab-bar/tab-bar.vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
// 获取当前路由信息
const route = useRoute()


</script>

<style lang="less" scoped>

</style>