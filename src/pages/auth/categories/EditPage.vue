<template>
  <XEdit
    v-model="form"
    :api-get="`/api/categories/${route.params.id}`"
    :api-put="`/api/categories/${route.params.id}`"
    :return-to="{ name: 'categories-list' }"
    :get-item-function="getItem"
    path-form="categories"
    title="Categorias"
    redirect-to="categories-list"
  />
</template>

<script setup>
import { ref } from 'vue'
import XEdit from 'src/components/crud/form/XEdit.vue'
import { useRoute } from 'vue-router'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'

const route = useRoute()

const form = ref({
  image: null,
  name: '',
  description: '',
  status: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/categories/${route.params.id}` })
    form.value.name = data.data.name
    form.value.description = data.data.description
    form.value.status = data.data.status
  } catch (error) {
    notify.error(error)
  }
}

</script>
