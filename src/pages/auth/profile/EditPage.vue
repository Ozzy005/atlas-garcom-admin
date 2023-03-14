<template>
  <XEditPage
    v-model="form"
    :route-has-parameter="false"
    return-to="dashboard"
    after-saving-go-to="dashboard"
    crud="Editar Perfil"
    model="profile"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEditPage from 'src/components/crud/XEditPage.vue'

const form = ref({
  name: null,
  email: null
})

</script>
