<template>
  <XInput
    v-model="value"
    :rules="[
      val => (!!val || !required) || 'CPF/CNPJ é obrigatório!',
      val => (!required || helpers.cpfCnpj(val)) || 'CPF/CNPJ é inválido!'
    ]"
    label="CPF/CNPJ"
    data-maska="['###.###.###-##', '##.###.###/####-##']"
    v-maska
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
import XInput from 'src/components/inputs/XInput.vue'
import helpers from 'src/utils/helpers'
import { vMaska } from 'maska'

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
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

</script>
