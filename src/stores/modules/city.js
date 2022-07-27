import { defineStore } from "pinia"
import { getAllCityData } from "../../services"

const useCityStore = defineStore("cityStore", {
  state: () => ({
    allCities: {},
    currentCity: {
      cityName: "广州"
    }
  }),
  getters: {

  },
  actions: {
    async fetchAllCityData() {
      const res = await getAllCityData()
      this.allCities = res.data
    }
  }
})

export default useCityStore