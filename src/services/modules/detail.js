import YMRequest from '../request/index'

export function getHouseDetailData(houseId) {
  return YMRequest.get({
    url: "/detail/infos",
    params: {
      houseId: houseId
    }
  })
}