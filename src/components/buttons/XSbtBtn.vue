<template>
  <XBtn
    type="submit"
    label="Salvar"
    icon="mdi-check"
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
