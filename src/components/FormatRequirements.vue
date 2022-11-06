<template>
  <div>
    <p v-if="req.buildings">
      Vyžaduje budovy:
      {{ req.buildings.map(b => translations.translateBuilding(b)).join(', ') }}
    </p>
    <p v-if="req.techs">
      Vyžaduje technológie:
      {{ req.techs.map(t => translations.translateTech(t)).join(', ') }}
    </p>
  </div>
</template>

<script setup>
import translations from '@/translations';

defineProps({
  req: Object,
});
</script>
