<template>
  <div class="home-search-box">
    <!-- 城市/位置 -->
    <div class="location bottom_gray_line">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom_gray_line" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
        <div class="stay">共{{ stayCount }}晚</div>
      </div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <!-- 日历组件 -->
    <van-calendar 
      v-model:show="showCalendar" 
      type="range"
      color="#ff9854"
      :round="false"
      @confirm="onConfirm" 
    />

    <!-- 价格/人数选择 -->
    <div class="section price-counter bottom_gray_line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom_gray_line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
      <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color}">
        {{ item.tagText.text }}
      </div>
      </template>
    </div>

    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatMonthDay, getDiffDays } from '@/utils/date_tool'
import useCityStore from '@/stores/modules/city'
import useHomeStore from '@/stores/modules/home'
import useMainStore from '@/stores/modules/main'
import { storeToRefs } from 'pinia'

// 城市/位置
const router = useRouter()
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

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

// 日期范围
// 默认日期范围 开始日期和结束日期保存在 mainStore 中
const mainStore = useMainStore()

const startDateStr = computed(() => formatMonthDay(mainStore.startDate))
const endDateStr = computed(() => formatMonthDay(mainStore.endDate))
const stayCount = computed(() => getDiffDays(mainStore.startDate, mainStore.endDate))

// 是否显示日历
const showCalendar = ref(false)

// 日期选择完成
function onConfirm(value) {
  // 根据选择的日期设置
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  // startDate.value = DateTool.formatMonthDay(selectStartDate)
  // endDate.value = DateTool.formatMonthDay(selectEndDate)
  // stayCount.value = DateTool.getDiffDays(selectStartDate, selectEndDate)
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
  // 隐藏日历
  showCalendar.value = false
}

// 热门建议
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 搜索
function searchBtnClick() {
  router.push("/search")
}

</script>

<style lang="less" scoped>
.home-search-box {
  // 日历弹窗高度
    --van-calendar-popup-height: 100%;

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

  .section {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 20px;
    color: #999;

    .start {
      flex: 1;
      display: flex;
      height: 44px;
      align-items: center;
    }

    .end {
      min-width: 30%;
      padding-left: 20px;
    }

    .date {
      display: flex;
      flex-direction: column;

      .tip {
        font-size: 12px;
        color: #999;
      }

      .time {
        margin-top: 3px;
        color: #333;
        font-size: 15px;
        font-weight: 500;
      }
  }
}

  .date-range {
    height: 44px;
    .stay {
      flex: 1;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }

  .price-counter {
    .start {
      border-right: 1px solid  var(--line-color);
    }
  }

  .keyword {
    height: 44px;
  }
  
  .hot-suggests {
    margin: 10px 0;

    .item {
      padding: 4px 8px;
      margin: 4px;
      border-radius: 14px;
      font-size: 12px;
      line-height: 1;
    }
  }

  .search-btn {
    .btn {
      flex: 1;
      height: 38px;
      max-height: 50px;
      padding: 0 20px;
      font-weight: 500;
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      border-radius: 20px;
      color: #fff;
      background-image: var(--theme-linear-gradient);
    }
}


}
</style>