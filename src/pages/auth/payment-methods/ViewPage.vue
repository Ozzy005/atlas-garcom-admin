<template>
  <XView
    v-model="form"
    :return-to="{ name: 'payment-methods-list' }"
    title="Métodos de Pagamento"
    api-get="payment-methods"
  >

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Código:"
        :value="form.code"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Nome:"
        :value="form.name"
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
  code: null,
  name: null,
  status: null,
  created_at: null,
  updated_at: null
})

</script>
