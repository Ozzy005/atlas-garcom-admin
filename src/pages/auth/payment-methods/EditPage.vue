<template>
  <XEditPage
    v-model="form"
    crud="Métodos de Pagamento"
    model="payment-methods"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEditPage from 'src/components/crud/XEditPage.vue'

const form = ref({
  code: null,
  name: null,
  status: null
})

</script>
