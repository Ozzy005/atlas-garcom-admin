<template>
  <XInput
    v-model="value"
    :rules="[...rules, val => !val || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val) || 'Insira uma cor hexadecimal válida!']"
    label="Cor"
    maxlength="7"
  >
    <template v-slot:prepend>
      <q-icon
        name="colorize"
        class="cursor-pointer"
      >
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-color v-model="value" />
        </q-popup-proxy>
      </q-icon>
    </template>
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
import XInput from './XInput.vue'

const props = defineProps({
  modelValue: String,
  rules: {
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
