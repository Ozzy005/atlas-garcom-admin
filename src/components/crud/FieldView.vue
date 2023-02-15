<template>
  <q-card flat
    bordered>
    <q-card-section>
      <span>{{ field }}</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <span>{{ value ?? 'Não informado' }}</span>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  field: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: false
  }
})
</script>
