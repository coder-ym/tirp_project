import { defineStore } from "pinia"
import { getHomeHotSuggestsData, getHomeCategoriesData, getHomeHouseListData } from "@/services"

const useHomeStore = defineStore("homeStore", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    currentPage: 1,
    houselist: []
  }),
  getters: {

  },
  actions: {
    async fetchHomeSuggestsData() {
      const res = await getHomeHotSuggestsData()
      this.hotSuggests = res.data
    },
    async fetchHomeCategoriesData() {
      const res = await getHomeCategoriesData()
      this.categories = res.data
    },
    async fetchHomeHouseListData() {
      const res = await getHomeHouseListData(this.currentPage)
      console.log(this.currentPage)
      this.houselist.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore