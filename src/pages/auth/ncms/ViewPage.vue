<template>
  <XView
    v-model="form"
    :return-to="{ name: 'ncms-list' }"
    title="Ncms"
    api-get="ncms"
  >

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Código:"
        :value="form.code"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Descrição:"
        :value="form.description"
      />
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Data de Início:"
        :value="helpers.brDate(form.date_start)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Data Final:"
        :value="helpers.brDate(form.date_end)"
      />
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Ato Legal:"
        :value="form.ato_type"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Número:"
        :value="form.ato_number"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Ano:"
        :value="form.ato_year"
      />
    </XFieldGroup>

  </XView>
</template>

<script setup>
import { ref } from 'vue'
import XView from 'src/components/crud/view/XView.vue'
import XField from 'src/components/crud/view/XField.vue'
import helpers from 'src/utils/helpers'
import XFieldGroup from 'src/components/crud/view/XFieldGroup.vue'

const form = ref({
  code: null,
  description: null,
  date_start: null,
  date_end: null,
  ato_type: null,
  ato_number: null,
  ato_year: null
})

</script>
