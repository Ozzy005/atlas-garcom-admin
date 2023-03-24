<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'measurement-units-list' }"
    path-form="measurement-units"
    title="Unidades de Medida"
    api-post="/api/measurement-units"
    redirect-to="measurement-units-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  name: '',
  initials: '',
  status: null
})

</script>
