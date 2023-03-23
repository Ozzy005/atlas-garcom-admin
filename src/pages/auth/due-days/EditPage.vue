<template>
  <XEdit
    v-model="form"
    :api-get="`/api/due-days/${route.params.id}`"
    :api-put="`/api/due-days/${route.params.id}`"
    :return-to="{ name: 'due-days-list' }"
    path-form="due-days"
    title="Dias de Vencimento"
    redirect-to="due-days-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref({
  day: null,
  description: null,
  status: null
})

</script>
