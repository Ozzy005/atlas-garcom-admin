<template>
  <XView
    v-model="form"
    :return-to="{ name: 'roles-list' }"
    title="Atribuições/Módulos"
    api-get="roles"
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
        field="Tipo:"
        :value="enums.getName('role-types', form.type)"
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
  type: null,
  created_at: null,
  updated_at: null
})

</script>
