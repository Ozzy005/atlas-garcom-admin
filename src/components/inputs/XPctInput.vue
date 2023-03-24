<template>
  <XMoneyInput
    v-model="value"
    @change="(vl) => helpers.moneyToFloat(vl) > 99.99 ? value = '100,00' : value = vl"
    prefix="%"
    maxlength="6"
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
  </XMoneyInput>
</template>

<script setup>
import { computed } from 'vue'
import XMoneyInput from 'src/components/inputs/XMoneyInput.vue'
import helpers from 'src/utils/helpers'

const props = defineProps({
  modelValue: {
    type: [String, Number],
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
