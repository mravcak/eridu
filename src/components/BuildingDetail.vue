<template>
  <div class="building-detail">
    <div class="image-wrap">
      <img class="image" :src="imageDataUrl" alt="">
    </div>
    <h3>{{ building.readable }}</h3>
    <p>{{ building.lore?.summary }}</p>
    <FormatCost
      title="Produkcia"
      :cost="building.production"
    />
  </div>
</template>

<script setup>
import FormatCost from '@/components/FormatCost.vue';

const props = defineProps({
  building: Object,
});

// eslint-disable-next-line import/no-dynamic-require, global-require
const imageDataUrl = require(`@/assets/buildings-icons/${props.building.name}.png`);
</script>

<style lang="scss" scoped>
@import '@/style/vars.scss';

.image-wrap {
  background-color: $terrain-soil;
  display: block;
  width: 8rem;
  padding: 1rem;
  height: auto;
  margin-bottom: 0.5rem;
  border-radius: $border-radius;
}
.image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
