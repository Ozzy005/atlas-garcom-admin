<template>
  <q-badge
    class="q-py-xs q-px-md"
    :style="{ 'background-color': color }"
  >
    <span class="fs-13">{{ name }}</span>
    <XTooltip
      v-if="tooltipLabel"
      :label="tooltipLabel"
      :position="tooltipPosition"
    />
  </q-badge>
</template>

<script setup>
import XTooltip from 'src/components/others/XTooltip.vue'

defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  tooltipLabel: {
    type: String,
    required: false
  },
  tooltipPosition: {
    type: String,
    required: false
  }
})
</script>
