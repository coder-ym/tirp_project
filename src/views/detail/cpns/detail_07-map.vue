<template>
  <div class="detail-map">
    <detail-section title="位置周边" more-text="查看更多周边信息">
      <div class="txMap" ref="mapRef"></div>
    </detail-section>
</div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import detailSection from '@/components/detail-section/detail-section.vue';
import { getAssetURL } from "@/utils/load_assets"

const mapRef = ref()
const props = defineProps({
  mapData: {
    type: Object,
    default: () => ({})
  }
})

onMounted(() => {

  //定义地图中心点坐标
  console.log(props.mapData.latitude, props.mapData.longitude)
  var center = new qq.maps.LatLng(props.mapData.latitude, props.mapData.longitude)
  //定义map变量，调用 TMap.Map() 构造函数创建地图
  var map = new qq.maps.Map(mapRef.value)
  map.zoomTo(17)
  map.panTo(center)

  var anchor = new qq.maps.Point(6, 6),
        size = new qq.maps.Size(24, 24),
        origin = new qq.maps.Point(0, 0),
        icon = new qq.maps.MarkerImage('https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/center.gif', size, origin, anchor);
  var marker = new qq.maps.Marker({
        icon: icon,
        map: map,
        position: center
        });

  // const anchor = new qq.maps.Point(0, 0)
  // const size = new qq.maps.Size(75, 75)
  // const origin = new qq.maps.Point(25, 35)
  // const icon = new qq.maps.MarkerImage(getAssetURL("home/full-screen-loading.gif"), size, origin, anchor);
  // var marker = new qq.maps.Marker({
  //     icon: icon,
  //     map: map,
  //     position: center,
  // });


})

</script>

<style lang="less" scoped>
.detail-map {
  .txMap {
    height: 300px;
  }
}
</style>