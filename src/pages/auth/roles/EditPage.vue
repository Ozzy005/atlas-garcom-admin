<template>
  <XEdit
    v-model="form"
    :api-get="`/api/roles/${route.params.id}`"
    :api-get-params="{ with: ['permissions'] }"
    :api-put="`/api/roles/${route.params.id}`"
    :return-to="{ name: 'roles-list' }"
    path-form="roles"
    title="Atribuições/Módulos"
    redirect-to="roles-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref({
  name: '',
  description: '',
  type: null,
  permissions_ids: []
})

</script>
