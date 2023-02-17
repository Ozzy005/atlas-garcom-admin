<template>
  <q-page padding>
    <ViewDefault crud="Contratantes"
      model="tenants">

      <div class="col-12 row q-gap-md">
        <FieldView class="col-md-grow col-xs-12"
          field="CPF/CNPJ"
          :value="form.nif" />

        <FieldView class="col-md-grow col-xs-12"
          field="Nome Completo/Razão Social:"
          :value="form.full_name" />

        <FieldView class="col-md-grow col-xs-12"
          field="Nome Social/Nome Fantasia:"
          :value="form.name" />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView class="col-md-grow col-xs-12"
          field="Inscrição Estadual:"
          :value="form.state_registration" />

        <FieldView class="col-md-grow col-xs-12"
          field="Inscrição Municipal:"
          :value="form.city_registration" />

        <FieldView class="col-md-grow col-xs-12"
          field="Dt Nasc./Abertura:"
          :value="helpers.brDate(form.birthdate)" />

        <FieldView class="col-md-grow col-xs-12"
          field="Status:"
          :value="form.status_name" />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView class="col-md-grow col-xs-12"
          field="Email:"
          :value="form.email" />

        <FieldView class="col-md-grow col-xs-12"
          field="Telefone:"
          :value="form.phone" />

        <FieldView class="col-md-grow col-xs-12"
          field="Cidade:"
          :value="form.city" />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView class="col-md-grow col-xs-12"
          field="CEP:"
          :value="form.zip_code" />

        <FieldView class="col-md-grow col-xs-12"
          field="Endereço:"
          :value="form.address" />

        <FieldView class="col-md-grow col-xs-12"
          field="Bairro:"
          :value="form.district" />

        <FieldView class="col-md-grow col-xs-12"
          field="N°:"
          :value="form.number" />

        <FieldView class="col-md-grow col-xs-12"
          field="Complemento:"
          :value="form.complement" />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView class="col-md-grow col-xs-12"
          field="Dt. Criação:"
          :value="helpers.brDateTime(form.created_at)" />

        <FieldView class="col-md-grow col-xs-12"
          field="Dt. Edição"
          :value="helpers.brDateTime(form.updated_at)" />
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
import FieldView from 'src/components/crud/FieldView.vue'

const route = useRoute()

const form = ref({})

const handleGetItem = async () => {
  try {
    const { data } = await api({ url: `/api/tenants/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => handleGetItem())

</script>
