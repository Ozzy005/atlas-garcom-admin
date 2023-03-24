<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'users-list' }"
    path-form="users"
    title="Usuários"
    api-post="/api/users"
    redirect-to="users-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  nif: '',
  full_name: '',
  name: '',
  state_registration: '',
  city_registration: '',
  birthdate: '',
  status: null,
  email: '',
  phone: '',
  city_id: null,
  zip_code: '',
  address: '',
  district: '',
  number: '',
  complement: '',
  password: '',
  password_confirmation: '',
  roles_ids: []
})

</script>
