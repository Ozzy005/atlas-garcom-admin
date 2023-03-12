<template>
  <XCreatePage
    v-model="form"
    crud="Atribuições/Módulos"
    model="roles"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreatePage from 'src/components/crud/XCreatePage.vue'

const form = ref({
  name: null,
  description: null,
  type: null,
  permissions_ids: []
})

</script>
