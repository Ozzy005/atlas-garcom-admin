<template>
  <q-btn
    :label="label"
    :class="{ 'full-width': label && $q.screen.xs }"
    :style="{ minWidth: label ? '150px' : null }"
    color="primary"
    no-caps
  >
    <XTooltip
      v-if="!label && tooltipLabel"
      :label="tooltipLabel"
      :position="tooltipPosition"
    >
      <template
        v-for="(_, slot) in $slots"
        :key="slot"
        v-slot:[slot]="scope"
      >
        <slot
          v-bind="scope"
          :name="slot"
          :key="slot"
        >
        </slot>
      </template>
    </XTooltip>
  </q-btn>
</template>

<script setup>
import XTooltip from '../XTooltip.vue'

defineProps({
  label: {
    type: String
  },
  tooltipLabel: {
    type: String
  },
  tooltipPosition: {
    type: String
  }
})
</script>
