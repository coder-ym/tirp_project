export const getAssetURL = (image) => {
  // 对资源的路径进行处理
  // 参数一: 资源的相对路径
  // 参数二: import.meta.url 当前路径的URL 
  return new URL(`../assets/img/${image}`, import.meta.url).href
}


