<template>
  <q-page padding>
    <ViewDefault crud="Dias de Vencimento"
      model="due-days">

      <div class="col-12 row q-gap-md">
        <FieldView class="col-md-grow col-xs-12"
          field="Dia:"
          :value="form.day" />

        <FieldView class="col-md-grow col-xs-12"
          field="Descrição:"
          :value="form.description" />

        <FieldView class="col-md-grow col-xs-12"
          field="Status:"
          :value="formatStatus(form.status)" />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView class="col-md-grow col-xs-12"
          field="Dt. Criação:"
          :value="helpers.brDateTime(form.created_at)" />

        <FieldView class="col-md-grow col-xs-12"
          field="Dt. Edição"
          :value="helpers.brDateTime(form.updated_at)" />
      </div>
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
  day: null,
  description: null,
  status: null,
  created_at: null,
  updated_at: null
})
const statusOptions = ref([])

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/due-days/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const getStatus = async () => {
  try {
    const { data } = await api({ url: '/api/status' })
    statusOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const formatStatus = (val) => {
  const status = statusOptions.value.find(item => item.id === val)
  if (status) {
    return status.name
  }
  return 'Não informado'
}

onMounted(() => {
  getItem()
  getStatus()
})

</script>
