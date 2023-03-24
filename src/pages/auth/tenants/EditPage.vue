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
