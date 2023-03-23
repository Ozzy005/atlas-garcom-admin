<template>
  <XInput
    v-model="value"
    :rules="[
      val => (!!val || !required) || 'CPF/CNPJ é obrigatório!',
      val => (!required || helpers.cpfCnpj(val)) || 'CPF/CNPJ é inválido!'
    ]"
    :mask="nifMask"
    label="CPF/CNPJ"
    maxlength="18"
    unmasked-value
    reverse-fill-mask
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
import helpers from 'src/utils/helpers'

const props = defineProps({
  modelValue: String,
  required: {
    type: Boolean,
    default: true
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

const nifMask = computed(() => {
  if (value.value) {
    return value.value.length > 11 ? '##.###.###/####-##' : '###.###.###-##'
  }
  return '##.###.###/####-##'
})

</script>
