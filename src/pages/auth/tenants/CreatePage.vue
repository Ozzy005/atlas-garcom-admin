<template>
  <XCreatePage
    v-model="form"
    crud="Contratantes"
    model="tenants"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreatePage from 'src/components/crud/XCreatePage.vue'

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
  signature_id: null,
  due_day_id: null
})

</script>
