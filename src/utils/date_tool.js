import dayjs from "dayjs"

export function getCurrentDate() {
  return dayjs()
}

export function getNewDate() {
  return dayjs().add(1, "day")
}

export function formatMonthDay(date, format="MM月DD日") {
  return dayjs(date).format(format)
}

export function getDiffDays(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day")
}