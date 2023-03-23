<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'users-list' }"
    path-form="../../../pages/auth/users/FormPage.vue"
    title="Usuários"
    api-post="/api/users"
    redirect-to="users-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  nif: null,
  full_name: null,
  name: null,
  state_registration: null,
  city_registration: null,
  birthdate: null,
  status: null,
  email: null,
  phone: null,
  city_id: null,
  zip_code: null,
  address: null,
  district: null,
  number: null,
  complement: null,
  password: null,
  password_confirmation: null,
  roles_ids: []
})

</script>
