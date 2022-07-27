// axios 的简单封装

import axios from "axios"
import { BASE_URL, TIMEOUT} from "./config"

class YMRequest {
  constructor(baseURL, timeout=5000) {
    this.instance = axios.create({
      baseURL,
      timeout
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