<template>
  <XCreatePage
    v-model="form"
    crud="Dias de Vencimento"
    model="due-days"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreatePage from 'src/components/crud/XCreatePage.vue'

const form = ref({
  day: null,
  description: null,
  status: null
})

</script>
