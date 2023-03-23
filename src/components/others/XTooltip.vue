<template>
  <q-tooltip
    v-bind="computedPosition"
    class="fs-14"
  >
    {{ label }}
  </q-tooltip>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'bottom'
  }
})

const positions = {
  top: {
    anchor: 'top middle',
    self: 'bottom middle'
  },
  right: {
    anchor: 'center right',
    self: 'center left'
  },
  bottom: {
    anchor: 'bottom middle',
    self: 'top middle'
  },
  left: {
    anchor: 'center left',
    self: 'center right'
  }
}

const computedPosition = computed(() => {
  return positions[props.position]
})

</script>
