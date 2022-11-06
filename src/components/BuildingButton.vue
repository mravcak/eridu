<template>
  <div
    class="ui-button building-button"
    :class="{
      '-unavailable': !building.isAvailable,
    }"
  >
    <div class="media">
      <div class="icon-wrap">
        <img :src="imageDataUrl" alt="">
      </div>
    </div>
    <div class="content">
      <h4>{{ building.readable }}</h4>
      <FormatCost
        :cost="building.cost"
      />
      <FormatRequirements
        v-if="building.req"
        :req="building.req"
      />
    </div>
  </div>
</template>

<script setup>
import FormatRequirements from '@/components/FormatRequirements.vue';
import FormatCost from '@/components/FormatCost.vue';

const props = defineProps({
  building: Object,
});

// eslint-disable-next-line import/no-dynamic-require, global-require
const imageDataUrl = require(`@/assets/buildings-icons/${props.building.name}.png`);
</script>
