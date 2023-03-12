<template>
  <XEditPage
    v-model="form"
    crud="Dias de Vencimento"
    model="due-days"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEditPage from 'src/components/crud/XEditPage.vue'

const form = ref({
  day: null,
  description: null,
  status: null
})

</script>
