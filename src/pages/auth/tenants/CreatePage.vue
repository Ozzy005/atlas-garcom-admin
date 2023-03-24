<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'tenants-list' }"
    path-form="tenants"
    title="Contratantes"
    api-post="/api/tenants"
    redirect-to="tenants-list"
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
  signature_id: null,
  due_day_id: null
})

</script>
