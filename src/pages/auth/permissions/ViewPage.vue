<template>
  <XView
    v-model="form"
    :return-to="{ name: 'permissions-list' }"
    title="Permissões"
    api-get="permissions"
  >

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Nome:"
        :value="form.name"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Email:"
        :value="form.description"
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
import XFieldGroup from 'src/components/crud/view/XFieldGroup.vue'

const form = ref({
  name: null,
  description: null,
  created_at: null,
  updated_at: null
})

</script>
