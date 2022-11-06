<template>
  <p>
    {{ format(cost) }}
  </p>
</template>

<script setup>
const props = defineProps({
  cost: Object,
  title: {
    type: String,
    default: 'Cena',
  },
});

const format = (cost) => {
  const costDict = [
    { key: 'food', label: '🍲' },
    { key: 'reed', label: '🌿' },
    { key: 'clay', label: '🧱' },
  ];

  const items = costDict.map(
    (cc) => (cost[cc.key] ? `${cc.label} ${cost[cc.key]}` : null),
  ).filter(Boolean).join(' ');
  return `${props.title}: ${items}`;
};
</script>
