<template>
  <q-page padding>
    <ViewDefault crud="Usuários"
      model="users">
      <FieldView class="col-md-6 col-xs-12"
        field="Nome:"
        :value="form.name" />

      <FieldView class="col-md-grow col-xs-12"
        field="Email:"
        :value="form.email" />

      <FieldView class="col-md-6 col-xs-12"
        field="Dt. Criação:"
        :value="helpers.brDateTime(form.created_at)" />

      <FieldView class="col-md-grow col-xs-12"
        field="Dt. Edição"
        :value="helpers.brDateTime(form.updated_at)" />
    </ViewDefault>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import helpers from 'src/utils/helpers'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldView from 'src/components/crud/FieldView.vue'

const route = useRoute()

const form = ref({
  name: null,
  email: null,
  created_at: null,
  updated_at: null
})

const handleGetItem = async () => {
  try {
    const { data } = await api({ url: `/api/users/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

handleGetItem()

</script>
