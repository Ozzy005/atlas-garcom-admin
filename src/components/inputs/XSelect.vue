<template>
  <q-select
    v-model="value"
    :rules="[val => true]"
    lazy-rules="ondemand"
    class="col-xs-12"
    option-value="id"
    option-label="name"
    emit-value
    map-options
    outlined
    clearable
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
  </q-select>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [Number, Array],
    required: false
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
