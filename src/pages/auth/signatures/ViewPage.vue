<template>
  <XView
    v-model="form"
    :return-to="{ name: 'signatures-list' }"
    title="Assinaturas"
    api-get="signatures"
  >

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Nome:"
        :value="form.name"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Descrição:"
        :value="form.description"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Status:"
        :value="enums.getName('status', form.status)"
      />
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Recorrência:"
        :value="enums.getName('recurrences', form.recurrence)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Preço (R$):"
        :value="helpers.floatToMoney(form.price)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Desconto (%):"
        :value="helpers.floatToMoney(form.discount)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Preço C/ Desconto (R$):"
        :value="helpers.floatToMoney(form.discounted_price)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Preço Total (R$):"
        :value="helpers.floatToMoney(form.total_price)"
      />
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Dias de Vencimento:"
      >
        <q-chip
          v-for="(item, index) in dueDays"
          :key="index"
        >
          {{ item }}
        </q-chip>
      </XField>

      <XField
        class="col-md-grow col-xs-12"
        field="Módulos:"
      >
        <q-chip
          v-for="(item, index) in modules"
          :key="index"
        >
          {{ item }}
        </q-chip>
      </XField>
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Dt. Criação:"
        :value="helpers.brDateTime(form.created_at)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Dt. Edição"
        :value="helpers.brDateTime(form.updated_at)"
      />
    </XFieldGroup>
  </XView>
</template>

<script setup>
import helpers from 'src/utils/helpers'
import { ref, computed } from 'vue'
import XView from 'src/components/crud/view/XView.vue'
import XField from 'src/components/crud/view/XField.vue'
import { useEnumsStore } from 'src/stores/enums'
import XFieldGroup from 'src/components/crud/view/XFieldGroup.vue'

const enums = useEnumsStore()

const form = ref({
  name: null,
  description: null,
  recurrence: null,
  price: null,
  has_discount: false,
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

</script>
