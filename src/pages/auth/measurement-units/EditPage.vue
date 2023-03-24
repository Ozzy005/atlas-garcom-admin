<template>
  <XEdit
    v-model="form"
    :api-get="`/api/measurement-units/${route.params.id}`"
    :api-put="`/api/measurement-units/${route.params.id}`"
    :return-to="{ name: 'measurement-units-list' }"
    path-form="measurement-units"
    title="Unidades de Medidas"
    redirect-to="measurement-units-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref({
  name: '',
  initials: '',
  status: null
})

</script>
