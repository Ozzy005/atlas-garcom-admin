<template>
  <XInput
    v-model="value"
    :rules="[val => (!!val || !required) || 'Inscrição Municipal é obrigatório!']"
    label="Inscrição Municipal"
    maxlength="12"
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
  </XInput>
</template>

<script setup>
import { computed } from 'vue'
import XInput from '../XInput.vue'

const props = defineProps({
  modelValue: String,
  required: {
    type: Boolean,
    default: false
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
