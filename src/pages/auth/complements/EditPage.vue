<template>
  <XEdit
    v-model="form"
    :api-get="`/api/complements/${route.params.id}`"
    :api-put="`/api/complements/${route.params.id}`"
    :return-to="{ name: 'complements-list' }"
    path-form="complements"
    title="Complementos"
    redirect-to="complements-list"
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
  measurement_unit_id: null,
  quantity: null,
  cost_price: null,
  price: null,
  status: null
})

</script>
