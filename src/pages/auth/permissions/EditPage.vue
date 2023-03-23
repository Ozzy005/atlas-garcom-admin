<template>
  <XEdit
    v-model="form"
    :api-get="`/api/permissions/${route.params.id}`"
    :api-put="`/api/permissions/${route.params.id}`"
    :return-to="{ name: 'permissions-list' }"
    path-form="../../../pages/auth/permissions/FormPage.vue"
    title="Permissões"
    redirect-to="permissions-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref({
  name: null,
  description: null
})

</script>
