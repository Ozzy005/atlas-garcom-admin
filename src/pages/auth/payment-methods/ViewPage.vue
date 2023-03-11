<template>
  <q-page padding>
    <ViewDefault
      crud="Métodos de Pagamento"
      model="payment-methods"
    >

      <div class="col-12 row q-gap-md">
        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Código:"
          :value="form.code"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Nome:"
          :value="form.name"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Status:"
          :value="enums.getName('status', form.status)"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Dt. Criação:"
          :value="helpers.brDateTime(form.created_at)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Dt. Edição"
          :value="helpers.brDateTime(form.updated_at)"
        />
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
import FieldDefault from 'src/components/crud/FieldDefault.vue'
import { useEnumsStore } from 'src/stores/enums'

const enums = useEnumsStore()
const route = useRoute()

const form = ref({
  code: null,
  name: null,
  status: null,
  created_at: null,
  updated_at: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/payment-methods/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getItem()
})

</script>
