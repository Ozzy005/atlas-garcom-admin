<template>
  <XEditPage
    v-model="form"
    crud="Unidades de Medida"
    model="measurement-units"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEditPage from 'src/components/crud/XEditPage.vue'

const form = ref({
  name: null,
  initials: null,
  status: null
})

</script>
