<template>
  <XView
    v-model="form"
    :return-to="{ name: 'complements-list' }"
    title="Complementos"
    api-get="complements"
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
        field="Unidade de Medida:"
        :value="form.measurement_unit"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Quantidade:"
        :value="helpers.floatToMoney(form.quantity)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Preço de Custo (R$):"
        :value="helpers.floatToMoney(form.cost_price)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Preço (R$):"
        :value="helpers.floatToMoney(form.price)"
      />
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
import { ref } from 'vue'
import XView from 'src/components/crud/view/XView.vue'
import XField from 'src/components/crud/view/XField.vue'
import { useEnumsStore } from 'src/stores/enums'
import XFieldGroup from 'src/components/crud/view/XFieldGroup.vue'

const enums = useEnumsStore()

const form = ref({
  name: null,
  description: null,
  measurement_unit: null,
  quantity: null,
  cost_price: null,
  price: null,
  status: null,
  created_at: null,
  updated_at: null
})

</script>
