<template>
  <div class="favor">
    <p>{{ counter }}</p>
    <button @click="btnClick"> 按钮 </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let counter = ref(0)

function btnClick() {
  counter.value++
}
</script>

<style lang="less" scoped>

</style>