<template>
  <q-page padding>
    <ViewDefault
      crud="Assinaturas"
      model="signatures"
    >

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Nome:"
          :value="form.name"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Descrição:"
          :value="form.description"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Status:"
          :value="formatStatus(form.status)"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Recorrência:"
          :value="formatRecurrence(form.recurrence)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Preço (R$):"
          :value="helpers.floatToMoney(form.price)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Desconto (%):"
          :value="helpers.floatToMoney(form.discount)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Preço C/ Desconto (R$):"
          :value="helpers.floatToMoney(form.discounted_price)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Preço Total (R$):"
          :value="helpers.floatToMoney(form.total_price)"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Dias de Vencimento:"
        >
          <q-chip
            v-for="(item, index) in dueDays"
            :key="index"
          >
            {{ item }}
          </q-chip>
        </FieldView>

        <FieldView
          class="col-md-grow col-xs-12"
          field="Módulos:"
        >
          <q-chip
            v-for="(item, index) in modules"
            :key="index"
          >
            {{ item }}
          </q-chip>
        </FieldView>
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Dt. Criação:"
          :value="helpers.brDateTime(form.created_at)"
        />

        <FieldView
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
import { ref, onMounted, computed } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldView from 'src/components/crud/FieldDefault.vue'

const route = useRoute()

const form = ref({
  name: null,
  description: null,
  recurrence: null,
  price: null,
  hasDiscount: false,
  discount: null,
  discounted_price: null,
  total_price: null,
  due_days: [],
  modules: [],
  status: null,
  created_at: null,
  updated_at: null
})
const statusOptions = ref([])
const recurrenceOptions = ref([])

const dueDays = computed(() => {
  return form.value.due_days.map(item => item.day)
})

const modules = computed(() => {
  return form.value.modules.map(item => item.description)
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/signatures/${route.params.id}` })
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

const getRecurrences = async () => {
  try {
    const { data } = await api({ url: '/api/recurrences' })
    recurrenceOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const formatRecurrence = (val) => {
  const recurrence = recurrenceOptions.value.find(item => item.id === val)
  if (recurrence) {
    return recurrence.name
  }
  return 'Não informado'
}

onMounted(() => {
  getItem()
  getStatus()
  getRecurrences()
})

</script>
