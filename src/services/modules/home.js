import YMRequest from "@/services/request"

export function getHomeHotSuggestsData() {
  return YMRequest.get({
    url: "/home/hotSuggests"
  })
}

export function getHomeCategoriesData() {
  return YMRequest.get({
    url: "home/categories"
  })
}

export function getHomeHouseListData(currentPage) {
  return YMRequest.get({
    url: "/home/houselist",
    params: {
      page: currentPage
    }
  })
}