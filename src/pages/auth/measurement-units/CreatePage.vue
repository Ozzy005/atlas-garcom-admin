<template>
  <XCreatePage
    v-model="form"
    crud="Unidades de Medida"
    model="measurement-units"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreatePage from 'src/components/crud/XCreatePage.vue'

const form = ref({
  name: null,
  initials: null,
  status: null
})

</script>
