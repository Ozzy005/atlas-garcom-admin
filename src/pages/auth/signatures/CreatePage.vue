<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'signatures-list' }"
    path-form="../../../pages/auth/signatures/FormPage.vue"
    title="Assinaturas"
    api-post="/api/signatures"
    redirect-to="signatures-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  name: null,
  description: null,
  color: null,
  recurrence: null,
  price: null,
  has_discount: false,
  discount: null,
  discounted_price: null,
  total_price: null,
  due_days_ids: [],
  modules_ids: [],
  status: null
})

</script>
