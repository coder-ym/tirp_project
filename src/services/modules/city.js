// index.js可以省略
import YMRequest from "../request"

// 维护city组件中所有的网络请求
export function getAllCityData() {
  return YMRequest.get({
    url: "/city/all"
  })
}