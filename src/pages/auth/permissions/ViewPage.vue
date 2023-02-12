<template>
  <q-page padding>
    <ViewDefault crud="Permissões"
      model="permissions">
      <FieldView class="col-md-6 col-xs-12"
        field="Nome:"
        :value="form.name" />

      <FieldView class="col-md-grow col-xs-12"
        field="Email:"
        :value="form.description" />

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
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldView from 'src/components/crud/FieldView.vue'

const route = useRoute()

const form = ref({
  name: null,
  description: null,
  created_at: null,
  updated_at: null
})

const handleGetItem = async () => {
  try {
    const { data } = await api({ url: `/api/permissions/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => handleGetItem())

</script>
