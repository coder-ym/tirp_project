import { defineStore } from 'pinia'
import * as DateTool from '@/utils/date_tool'

const startDate = DateTool.getCurrentDate()
const endDate = DateTool.getNewDate()

const useMainStore = defineStore("mainStore", {
  state: () => ({
    startDate,
    endDate
  }),
  getters: {

  },
  actions: {

  }
})

export default useMainStore