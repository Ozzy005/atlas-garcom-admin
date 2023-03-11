<template>
  <XBtn
    :to="{ name: model }"
    label="Voltar"
    icon="mdi-arrow-left"
    outline
  >
    <template
      v-for="(_, slot) in $slots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </XBtn>
</template>

<script setup>
import XBtn from './XBtn.vue'

defineProps({
  model: {
    type: String,
    required: false
  }
})
</script>
