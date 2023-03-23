<template>
  <q-badge
    class="q-pa-none"
    style="height: 20px; width: 20px; border-radius: 10px;"
    :style="{ 'background-color': color }"
  >
    <q-tooltip
      class="fs-16"
      :offset="[10, 10]"
      :hide-delay="1000"
    >
      {{ name }}
    </q-tooltip>
  </q-badge>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})
</script>
