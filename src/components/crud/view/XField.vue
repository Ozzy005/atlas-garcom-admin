<template>
  <q-card
    flat
    bordered
  >
    <q-card-section>
      <span v-html="field" />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <span
        v-if="!slots.default"
        v-html="value ?? 'Não informado'"
      />
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useSlots } from 'vue'

defineProps({
  field: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: false
  }
})

const slots = useSlots()
</script>
