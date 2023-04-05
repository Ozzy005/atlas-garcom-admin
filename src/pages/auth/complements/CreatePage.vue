<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'complements-list' }"
    path-form="complements"
    title="Complementos"
    api-post="/api/complements"
    redirect-to="complements-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  name: null,
  description: null,
  measurement_unit_id: null,
  quantity: null,
  cost_price: null,
  price: null,
  status: null
})

</script>
