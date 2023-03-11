<template>
  <q-page padding>
    <ViewDefault
      crud="Atribuições/Módulos"
      model="roles"
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
          field="Tipo:"
          :value="enums.getName('role-types', form.type)"
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
  name: null,
  description: null,
  type: null,
  created_at: null,
  updated_at: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/roles/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getItem()
})

</script>
