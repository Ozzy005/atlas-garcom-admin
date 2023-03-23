<template>
  <XEdit
    v-model="form"
    :api-get="`/api/tenants/${route.params.id}`"
    :api-put="`/api/tenants/${route.params.id}`"
    :return-to="{ name: 'tenants-list' }"
    path-form="tenants"
    title="Contratantes"
    redirect-to="tenants-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
