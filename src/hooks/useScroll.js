import { throttle } from 'lodash/function'
import { onMounted, onUnmounted, onActivated, onDeactivated, ref } from 'vue'


// 通过传入回调函数 在滚动到底后执行
// export default function useScroll(reachBottomCB) {
//   const clientHeight = ref(0)
//   const scrollTop = ref(0)
//   const scrollHeight = ref(0)
//   const scrollListenerHandler = throttle(() => {
//     clientHeight.value = document.documentElement.clientHeight
//     scrollTop.value = document.documentElement.scrollTop
//     scrollHeight.value = document.documentElement.scrollHeight
//     if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
//       console.log("滚动到底部了")
//       if (reachBottomCB) reachBottomCB()
//     }
//   }, 100)
  
//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler)
//   })
  
//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
//   })

//   return { clientHeight, scrollTop, scrollHeight }
// }

export default function useScroll(elRef) {
  let el = window
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    
    console.log(scrollTop.value)
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      isReachBottom.value = true
      console.log("滚动到底了")
    }
  }, 300)

  //监听窗口的滚动
  onMounted(() => {
    if (elRef) {
      el = elRef.value
      console.log("+++++++++", el)
    }
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onActivated(() => {
    el.addEventListener("scroll", scrollListenerHandler)
  })

  // 组件被销毁时或失去焦点 移除监听
  // 如果别的页面也进行类似的监听, 会编写重复代码
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  onDeactivated(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })


  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}