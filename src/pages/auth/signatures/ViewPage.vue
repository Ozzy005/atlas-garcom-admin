<template>
  <q-page padding>
    <ViewDefault
      crud="Assinaturas"
      model="signatures"
    >

      <div class="col-12 row q-gap-md">
        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Nome:"
          :value="form.name"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Descrição:"
          :value="form.description"
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
          field="Recorrência:"
          :value="enums.getName('recurrences', form.recurrence)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Preço (R$):"
          :value="helpers.floatToMoney(form.price)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Desconto (%):"
          :value="helpers.floatToMoney(form.discount)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Preço C/ Desconto (R$):"
          :value="helpers.floatToMoney(form.discounted_price)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Preço Total (R$):"
          :value="helpers.floatToMoney(form.total_price)"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Dias de Vencimento:"
        >
          <q-chip
            v-for="(item, index) in dueDays"
            :key="index"
          >
            {{ item }}
          </q-chip>
        </FieldDefault>

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Módulos:"
        >
          <q-chip
            v-for="(item, index) in modules"
            :key="index"
          >
            {{ item }}
          </q-chip>
        </FieldDefault>
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
import { ref, onMounted, computed } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldDefault from 'src/components/crud/FieldDefault.vue'
import { useEnumsStore } from 'src/stores/enums'

const enums = useEnumsStore()

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

onMounted(() => {
  getItem()
})

</script>
