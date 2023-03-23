<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'due-days-list' }"
    path-form="due-days"
    title="Contratantes"
    api-post="/api/due-days"
    redirect-to="due-days-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  day: null,
  description: null,
  status: null
})

</script>
