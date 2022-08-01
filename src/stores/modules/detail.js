import { defineStore } from 'pinia'
import { getHouseDetailData } from "@/services"
import { groupBy } from 'lodash/collection'


const useDetailStore = defineStore("detailStore", {
  state: () => ({
    houseDetailInfo: {},
  }),
  getters: {
 
  },
  actions: {
    async fetchHouseDetailData(houseId) {
      // 每次请求前 清空上一次请求的数据 不然 swiper里面 swipeGroup 数据是上一次装换的数据
      this.houseDetailInfo = {}
      const res = await getHouseDetailData(houseId)
      console.log(res)
      this.houseDetailInfo = res.data.mainPart
    }
  }
})

export default useDetailStore