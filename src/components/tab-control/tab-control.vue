<template>
  <div class="tab-control">
    <template v-for="(title, index) in titles" :key="title">
      <div :class="['tab-control-item',{ active: index === currentIndex }]" @click="itemClick(index)">
        <span>{{ title }}</span>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  emits: ["tabItemClick"],
  props: {
    titles: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("tabItemClick", index)
    }
  }
}
</script>


<style scoped>

.tab-control {
  display: flex;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: #fff;
  }

 .tab-control-item {
    flex: 1;
  }


 .tab-control-item.active {
    color: var(--primary-color);
    font-weight: 700;
  }

  
  .tab-control-item.active span {
    border-bottom: 3px solid var(--primary-color);
    padding: 8px;
  }

</style>