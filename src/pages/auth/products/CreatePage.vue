<template>
  <XCreate
    v-model="form"
    :return-to="{ name: 'products-list' }"
    path-form="products"
    title="Produtos"
    api-post="/api/products"
    redirect-to="products-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XCreate from 'src/components/crud/form/XCreate.vue'

const form = ref({
  file: null,
  image: null,
  name: null,
  description: null,
  category_id: null,
  product_prices: [
    {
      id: null,
      name: null,
      measurement_unit_id: null,
      quantity: null,
      cost_price: null,
      price: null,
      status: null
    }
  ],
  complements_ids: [],
  status: null
})

</script>
