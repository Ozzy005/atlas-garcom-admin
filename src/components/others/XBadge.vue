<template>
  <q-badge
    class="q-py-xs q-px-md"
    :style="{ 'background-color': color }"
  >
    <span class="fs-13">{{ name }}</span>
    <q-tooltip
      class="fs-14"
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
