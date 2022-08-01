<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="Object.keys(houseDetailInfo).length" v-memo="[houseDetailInfo]">
      <!-- 轮播图 -->
      <detail-swiper :swiper-data="houseDetailInfo.topModule.housePicture.housePics" />
      <!-- 标题 -->
      <detail-infos name="描述" :ref="getSectionRef" :topInfos="houseDetailInfo.topModule" />
      <!-- 房屋设施 -->
      <detail-facility name="设施" :ref="getSectionRef" :facilityData="houseDetailInfo.dynamicModule.facilityModule.houseFacility" />
      <!-- 房东介绍 -->
      <detail-landlord name="房东" :ref="getSectionRef" :landlord-data="houseDetailInfo.dynamicModule.landlordModule" />
      <!-- 热门评论 -->
      <detail-comment name="评论" :ref="getSectionRef" :comment-data="houseDetailInfo.dynamicModule.commentModule" />
      <!-- 预订须知 -->
      <detail-notice name="须知" :notice-data="houseDetailInfo.dynamicModule.rulesModule.orderRules"/>
      <!-- 位置周边 -->
      <detail-map name="周边" :ref="getSectionRef" :map-data="houseDetailInfo.dynamicModule.positionModule" />
      <!-- 价格说明 -->
      <detail-intro :price-intro="houseDetailInfo.introductionModule" />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import useDetailStore from "@/stores/modules/detail"

import tabControl from '@/components/tab-control/tab-control.vue'

import detailSwiper from './cpns/detail_01-swiper.vue';
import detailInfos from './cpns/detail_02-infos.vue';
import detailFacility from './cpns/detail_03-facility.vue'
import detailLandlord from './cpns/detail_04-landlord.vue'
import detailComment from './cpns/detail_05-comment.vue'
import detailNotice from './cpns/detail_06-notice.vue'
import detailMap from './cpns/detail_07-map.vue'
import detailIntro from './cpns/detail_08-intro.vue'

import useScroll from '@/hooks/useScroll'


const route = useRoute()
const router = useRouter()
const detailStore = useDetailStore()

detailStore.fetchHouseDetailData(route.params.houseId)
const { houseDetailInfo } = storeToRefs(detailStore)

// 监听返回按钮的点击
function onClickLeft() {
  router.back()
}

// tab-control操作
const detailRef = ref(null)
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})

// 将tabControl的标签作为key 组件的根元素作为value 建立映射关系存储到sectionEls中
const sectionEls = ref({})

const names = computed(() => {
  return Object.keys(sectionEls.value)
})


// ref attribute 还可以绑定为一个函数，会在每次组件更新时都被调用。函数接受该元素引用作为第一个参数, 当元素卸载时，这个 el 参数会是 null
function getSectionRef(value) {
  // 组件上面的属性 会绑定到根元素上面 获取根元素上面的name属性值
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

function tabClick(index) {
  console.log("-----", index)
  const key = Object.keys(sectionEls.value)[index]
  const sectionEl = sectionEls.value[key]

  let instance = sectionEl.offsetTop
  if (index !==0) {
    instance = instance - 44
  }

  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth"
  })
}

</script>

<style lang="less" scoped>
.detail {
  .tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
}
</style>