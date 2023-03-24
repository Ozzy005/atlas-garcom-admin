<template>
  <XEdit
    v-model="form"
    :api-get="`/api/users/${route.params.id}`"
    :api-put="`/api/users/${route.params.id}`"
    :return-to="{ name: 'users-list' }"
    path-form="users"
    title="Usuários"
    redirect-to="users-list"
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
  roles_ids: []
})

</script>
