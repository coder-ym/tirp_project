<template>
  <div class="detail-swiper">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swiperData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>

      <!-- 自定义指示器 -->
      <template #indicator="{ active, total }">
        <div class="custom-indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
          <div class="item" :class="{ active: swiperData[active]?.enumPictureCategory == key}">
            <span class="text">{{ getName(value[0].title) }}</span>
            <!-- 需要当前展示的图片的enumPictureCategory跟key相同才行  数字和字符串比较 -->
            <!-- 第一次请求时 swiperData可能没有值需要判断 -->
            <span class="count" v-if="swiperData[active]?.enumPictureCategory == key">{{ getCategoryIndex(swiperData[active]) }}/{{ value.length }}</span>
          </div>

          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
import { groupBy } from 'lodash/collection'

const props = defineProps({
  swiperData: {
    type: Array,
    default: () => []
  }
})

// 自定义指示器展示图片信息
// 需要对图片数组进行分组处理 根据图片的enumPictureCategory
// lodash 方法 groupBy
const swipeGroup = groupBy(props.swiperData, function(value) {
  return value.enumPictureCategory
})

// 使用图片的 enumPictureCategory 作为key 相同的图片存放到数组中
// 思路一: 好理解, 两次循环 先根据 enumPictureCategory 作为key 创建数组 在将所有的图片放入对应的数组中 
// for (const item of props.swipeData) {
//   swipeGroup[item.enumPictureCategory] = []
// }
// for (const item of props.swipeData) {
//   const valueArray = swipeGroup[item.enumPictureCategory]
//   valueArray.push(item)
// }
// console.log(swipeGroup)

// 一次循环
// for (const item of props.swiperData) {
//   let valueArray = swipeGroup[item.enumPictureCategory]
//   if(!valueArray) {
//     valueArray = []
//     swipeGroup[item.enumPictureCategory] = valueArray
//   }
//   valueArray.push(item)
// }

console.log(swipeGroup)


// 对标题中的符号进行处理
const nameReg = /【(.*?)】/i
function getName(name) {
  // return name.replace("：", "").replace("】", "").replace("【", "")
  const results = nameReg.exec(name)
  return results[1]
}


function getCategoryIndex(item) {
  const valueArray = swipeGroup[item.enumPictureCategory]
  console.log("------", valueArray)
  return valueArray.findIndex(data => data === item) + 1
}


</script>

<style lang="less" scoped>
.detail-swiper {
  .swipe-list {
    img {
      width: 100%;
    }

    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: flex;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);

      .item {
        margin: 0 3px;

        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>