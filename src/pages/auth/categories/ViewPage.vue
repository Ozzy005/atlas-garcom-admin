<template>
  <XView
    v-model="form"
    :return-to="{ name: 'categories-list' }"
    title="Categorias"
    api-get="categories"
  >

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Imagem da Categoria:"
      >
        <q-img
          :src="form.image_url"
          class="shadow-up-1"
          style="max-height: 200px; max-width: 200px"
        />
      </XField>
    </XFieldGroup>

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
  image: null,
  name: null,
  description: null,
  status: null,
  created_at: null,
  updated_at: null
})

</script>
