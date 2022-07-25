<template>
  <div class="tab-bar">
    <!-- 手动 基本实现tab-bar -->
    <div class="tab-bar-item active">
      <img src="../../assets/img/tabbar/tab_home.png" alt="">
      <span class="text">首页</span>
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/tab_favor.png" alt="">
      <span class="text">收藏</span>
    </div>
    <div class="tab-bar-item">
      <img src="../../assets/img/tabbar/tab_order.png" alt="">
      <span class="text">订单</span>
    </div><div class="tab-bar-item">
      <img src="../../assets/img/tabbar/tab_message.png" alt="">
      <span class="text">消息</span>
    </div>
  </div>
</template>

<script setup>

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