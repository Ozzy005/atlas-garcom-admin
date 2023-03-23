<template>
  <XBtn
    tooltip-label="Voltar"
    icon="mdi-arrow-left"
    outline
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
  </XBtn>
</template>

<script setup>
import XBtn from './XBtn.vue'
</script>
