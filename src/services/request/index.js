// axios 的简单封装

import axios from "axios"
import { BASE_URL, TIMEOUT} from "./config"
import useMainStore from "@/stores/modules/main"

const mainStore = useMainStore()

class YMRequest {
  constructor(baseURL, timeout=5000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 拦截器 用于控制请求动画的显示
    this.instance.interceptors.request.use(config => {
      mainStore.isShowLoading = true
      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      mainStore.isShowLoading = false
      return res
    }, err => {
      mainStore.isShowLoading = false
      return err
    })
  }

  request(config) {
    console.log(config)
    return new Promise((reslove, reject) => {
      this.instance.request(config).then(res => {
        reslove(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({...config, method: "get"})
  }

  post(config) {
    return this.request({...config, method: "post"})
  }
}

export default new YMRequest(BASE_URL, TIMEOUT)