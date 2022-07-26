<template>
  <div class="tab-bar">
    <!--  通过 Vant中的 Tabbar组件实现 -->
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData" :key="item.text">
        <!-- to:路由切换路径 -->
        <van-tabbar-item :to="item.path">
          <!-- 通过插槽自定义图标和文字 -->
          <template #default>
            <span class="text">{{ item.text }}</span>
          </template>
          <template #icon>
            <img class="img" v-if="currentIndex === index" :src="getAssetURL(item.imageActive)" alt="">
            <img class="img" v-else :src="getAssetURL(item.image)" alt="">
          </template>

        </van-tabbar-item>
      </template>
    </van-tabbar>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tabbarData from '../../assets/data/tab-bar'
import { getAssetURL } from '../../utils/load_assets.js'

// 记录 active 状态 
let currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {
  // 修改 Vant 组件样式的方式
  // 局部定义一个变量: 只针对.tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类, 对类中的CSS属性重写
  // 当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素，父组件的样式将不会渗透到子组件。
  // :deep(.class)深度选择器会找到子组件的类, 让子组件的类也可以生效
  // vant-tabbar中图标存在 class  van-tabbar-item__icon
  // :deep(.van-tabbar-item__icon) {
  //   font-size: 36px;
  // }
  .img {
    height: 28px;
  }
  .text {
    font-size: 12px;
    margin-top: 2px;
  }
}

</style>