<template>
  <XEdit
    v-model="form"
    :api-get="`/api/users/${route.params.id}`"
    :api-get-params="{ with: ['roles'] }"
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
  roles_ids: []
})

</script>
