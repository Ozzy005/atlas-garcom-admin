<template>
  <XEditPage
    v-model="form"
    crud="Permissões"
    model="permissions"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEditPage from 'src/components/crud/XEditPage.vue'

const form = ref({
  name: null,
  description: null
})

</script>
