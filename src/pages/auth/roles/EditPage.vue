<template>
  <XEditPage
    v-model="form"
    crud="Atribuições/Módulos"
    model="roles"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEditPage from 'src/components/crud/XEditPage.vue'

const form = ref({
  name: null,
  description: null,
  type: null,
  permissions_ids: []
})

</script>
