<template>
  <q-page padding>
    <ViewDefault
      crud="Ncms"
      model="ncms"
    >

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Código:"
          :value="form.code"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Descrição:"
          :value="form.description"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Data de Início:"
          :value="helpers.brDate(form.date_start)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Data Final:"
          :value="helpers.brDate(form.date_end)"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Ato Legal:"
          :value="form.ato_type"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Número:"
          :value="form.ato_number"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Ano:"
          :value="form.ato_year"
        />
      </div>

    </ViewDefault>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldView from 'src/components/crud/FieldDefault.vue'
import helpers from 'src/utils/helpers'

const route = useRoute()

const form = ref({
  code: null,
  description: null,
  date_start: null,
  date_end: null,
  ato_type: null,
  ato_number: null,
  ato_year: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/ncms/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => getItem())

</script>
