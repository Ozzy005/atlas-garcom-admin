<template>
  <XSelect
    v-model="value"
    multiple
    use-chips
    stack-label
    filled
  >
    <template
      v-for="(_, slot) in $slots"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
        :key="slot"
      />
    </template>
  </XSelect>
</template>

<script setup>
import { computed } from 'vue'
import XSelect from './XSelect.vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

</script>
