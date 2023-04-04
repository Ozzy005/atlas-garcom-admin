<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'payment-methods-list' }"
    path-form="payment-methods"
    title="Métodos de Pagamento"
    api-post="/api/payment-methods"
    redirect-to="payment-methods-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  code: null,
  name: null,
  status: null
})
</script>
