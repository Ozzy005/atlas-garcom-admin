<template>
  <XEdit
    v-model="form"
    :return-to="{ name: 'dashboard' }"
    path-form="../../../pages/auth/profile/FormPage.vue"
    title="Editar Perfil"
    api-get="/api/profile"
    api-put="/api/profile"
    redirect-to="dashboard"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
const form = ref({
  name: null,
  email: null
})

</script>
