<template>
  <XEdit
    v-model="form"
    :return-to="{ name: 'dashboard' }"
    path-form="../../../pages/auth/change-password/FormPage.vue"
    title="Alterar Senha"
    api-put="/api/change-password"
    redirect-to="dashboard"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'

const form = ref({
  current_password: null,
  password: null,
  password_confirmation: null
})

</script>
