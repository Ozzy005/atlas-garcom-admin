<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'measurement-units-list' }"
    path-form="../../../pages/auth/measurement-units/FormPage.vue"
    title="Unidades de Medida"
    api-post="/api/measurement-units"
    redirect-to="measurement-units-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  name: null,
  initials: null,
  status: null
})

</script>
