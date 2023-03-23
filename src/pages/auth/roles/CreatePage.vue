<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'roles-list' }"
    path-form="../../../pages/auth/roles/FormPage.vue"
    title="Atribuições/Módulos"
    api-post="/api/roles"
    redirect-to="roles-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  name: null,
  description: null,
  type: null,
  permissions_ids: []
})

</script>
