<template>
  <XEditPage
    v-model="form"
    :fetch-item="false"
    :route-has-parameter="false"
    return-to="dashboard"
    after-saving-go-to="dashboard"
    crud="Editar senha"
    model="change-password"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEditPage from 'src/components/crud/XEditPage.vue'

const form = ref({
  current_password: null,
  password: null,
  password_confirmation: null
})

</script>
