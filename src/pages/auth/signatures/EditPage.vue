<template>
  <XEdit
    v-model="form"
    :api-get="`/api/signatures/${route.params.id}`"
    :api-put="`/api/signatures/${route.params.id}`"
    :return-to="{ name: 'signatures-list' }"
    path-form="signatures"
    title="Assinaturas"
    redirect-to="signatures-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

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
