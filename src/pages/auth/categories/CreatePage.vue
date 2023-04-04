<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'categories-list' }"
    path-form="categories"
    title="Categorias"
    api-post="/api/categories"
    redirect-to="categories-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  file: null,
  image: null,
  name: null,
  description: null,
  status: null
})

</script>
