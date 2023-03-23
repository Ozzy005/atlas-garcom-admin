<template>
  <XSelect
    v-model="value"
    :options="enums.getEnum(enumName)"
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
import { useEnumsStore } from 'src/stores/enums'
import XSelect from './XSelect.vue'

const props = defineProps({
  modelValue: Number,
  enumName: {
    type: String,
    required: true
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

const enums = useEnumsStore()

</script>
