<template>
  <div class="tab-bar">
    <!--  通过 Vant中的 Tabbar组件实现 -->
    <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
      <template v-for="(item, index) in tabbarData" :key="item.text">
        <van-tabbar-item :to="item.path" icon="home-o">{{ item.text }}</van-tabbar-item>
      </template>
    </van-tabbar>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import tabbarData from '../../assets/data/tab-bar'

// 记录 active 状态 
let currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {
  // 修改 Vant 组件样式的方式
  // 局部定义一个变量: 只针对.tab-bar子元素才生效
  // --van-tabbar-item-icon-size: 30px !important;

  // 找到类, 对类中的CSS属性重写
  // :deep(.class)找到子组件的类, 让子组件的类也可以生效
  // vant-tabbar中图标存在 class  van-tabbar-item__icon
  :deep(.van-tabbar-item__icon) {
    font-size: 36px;
  }
}

</style>