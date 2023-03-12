<template>
  <XEditPage
    v-model="form"
    crud="Assinaturas"
    model="signatures"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEditPage from 'src/components/crud/XEditPage.vue'

const form = ref({
  name: null,
  description: null,
  recurrence: null,
  price: null,
  hasDiscount: false,
  discount: null,
  discounted_price: null,
  total_price: null,
  due_days_ids: [],
  modules_ids: [],
  status: null
})

</script>
