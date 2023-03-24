<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'signatures-list' }"
    path-form="signatures"
    title="Assinaturas"
    api-post="/api/signatures"
    redirect-to="signatures-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  name: '',
  description: '',
  color: '',
  recurrence: null,
  price: 0,
  has_discount: false,
  discount: 0,
  discounted_price: 0,
  total_price: 0,
  due_days_ids: [],
  modules_ids: [],
  status: null
})

</script>
