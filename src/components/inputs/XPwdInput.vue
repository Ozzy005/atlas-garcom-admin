<template>
  <XInput
    v-model="value"
    :type="isPwd ? 'password' : 'text'"
    :rules="[val => !!val && val.length >= 8 || 'Minímo 8 caracteres!', ...rules]"
    label="Senha"
    maxlength="100"
  >
    <template #append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </XInput>
</template>

<script setup>
import { computed, ref } from 'vue'
import XInput from 'src/components/inputs/XInput.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
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

const isPwd = ref(true)
</script>
