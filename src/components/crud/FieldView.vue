<template>
  <q-card flat
    bordered>
    <q-card-section>
      <span v-html="field" />
    </q-card-section>
    <q-separator />
    <q-card-section>
      <span v-html="value ?? 'Não informado'" />
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
