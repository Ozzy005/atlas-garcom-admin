<template>
  <XEdit
    v-model="form"
    :api-get="`/api/payment-methods/${route.params.id}`"
    :api-put="`/api/payment-methods/${route.params.id}`"
    :return-to="{ name: 'payment-methods-list' }"
    path-form="../../../pages/auth/payment-methods/FormPage.vue"
    title="Contratantes"
    redirect-to="payment-methods-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = ref({
  code: null,
  name: null,
  status: null
})

</script>
