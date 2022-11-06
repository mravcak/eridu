<template>
  <div
    class="ui-button tech-button"
    :class="{
      '-unavailable': !tech.isAvailable,
      '-researched': tech.isResearched,
    }"
  >
    <div class="media">
      <div class="icon-wrap">
        <img src="@/assets/techs.png" alt="">
      </div>
    </div>
    <div class="content">
      <h4>{{ tech.readable }}</h4>
      <p class="summary">{{ tech.lore.summary }}</p>
      <FormatCost
        :cost="tech.cost"
      />
      <FormatRequirements
        v-if="tech.req"
        :req="tech.req"
      />
    </div>
  </div>
</template>

<script setup>
import FormatRequirements from '@/components/FormatRequirements.vue';
import FormatCost from '@/components/FormatCost.vue';

defineProps({
  tech: Object,
});

</script>

<style lang="scss" scoped>
@import '@/style/vars.scss';

.tech-button {
  &.-researched {
    opacity: 1;
    background-color: $terrain-river;
  }
}
</style>
