<template>
  <XCreatePage
    v-model="form"
    crud="Assinaturas"
    model="signatures"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreatePage from 'src/components/crud/XCreatePage.vue'

const form = ref({
  name: null,
  description: null,
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
