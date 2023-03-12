<template>
  <XCreatePage
    v-model="form"
    crud="Métodos de Pagamento"
    model="payment-methods"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreatePage from 'src/components/crud/XCreatePage.vue'

const form = ref({
  code: null,
  name: null,
  status: null
})
</script>
