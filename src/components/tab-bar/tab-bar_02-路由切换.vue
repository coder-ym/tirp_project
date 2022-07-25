<template>
  <div class="tab-bar">
    <!-- 将tabbar数据抽离出去 使用 v-for 实现 -->
    <template v-for="(item, index) in tabbarData" :key="item.text">
      <div
        class="tab-bar-item"
        :class="{ active: index === currentIndex}"
        @click="tabbarItemClick(item, index)"
        >
        <!-- vite中 动态路径时需要对资源路径进行处理 不然无法识别 -->
        <!-- 图片显示思路: 1.动态切换src 2.2个img v-if判断 -->
        <img v-if="index === currentIndex" :src="getAssetURL(item.imageActive)" alt="">

        <img v-else :src="getAssetURL(item.image)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import tabbarData from '../../assets/data/tab-bar'
import { getAssetURL } from '../../utils/load_assets.js'

// 记录 active 状态 
let currentIndex = ref(0)

// 获取router
const router = useRouter()

// tabbar 点击
function tabbarItemClick(item, index) {
  // 改变 active index
  // ref 在setup中需要通过value 访问
  currentIndex.value = index

  // 切换路由
  router.push(item.path)
}

</script>

<style lang="less" scoped>
.tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55px;
  display: flex;
  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // less中 & 表示父选择器 相当于.tab-bar-item
    &.active {
      color: var(--primary-color);
    }

    img {
      width: 36px;
    }

    .text {
      font-size: 12px;
      margin-top: 2px;
    }
  }

}
</style>