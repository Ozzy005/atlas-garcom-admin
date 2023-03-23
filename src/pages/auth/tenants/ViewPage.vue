<template>
  <XView
    v-model="form"
    :return-to="{ name: 'tenants-list' }"
    title="Contratantes"
    api-get="tenants"
  >
    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="CPF/CNPJ"
        :value="helpers.nifMask(form.nif)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Nome Completo/Razão Social:"
        :value="form.full_name"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Nome Social/Nome Fantasia:"
        :value="form.name"
      />
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Inscrição Estadual:"
        :value="form.state_registration"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Inscrição Municipal:"
        :value="form.city_registration"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Dt Nasc./Abertura:"
        :value="helpers.brDate(form.birthdate)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Status:"
        :value="enums.getName('tenant-status', form.status)"
      />
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="Email:"
        :value="form.email"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Telefone:"
        :value="helpers.phoneMask(form.phone)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Cidade:"
        :value="form.city"
      />
    </XFieldGroup>

    <XFieldGroup>
      <XField
        class="col-md-grow col-xs-12"
        field="CEP:"
        :value="helpers.zipCodeMask(form.zip_code)"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Endereço:"
        :value="form.address"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Bairro:"
        :value="form.district"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="N°:"
        :value="form.number"
      />

      <XField
        class="col-md-grow col-xs-12"
        field="Complemento:"
        :value="form.complement"
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
import { ref } from 'vue'
import { useEnumsStore } from 'src/stores/enums'
import XView from 'src/components/crud/view/XView.vue'
import helpers from 'src/utils/helpers'
import XField from 'src/components/crud/view/XField.vue'
import XFieldGroup from 'src/components/crud/view/XFieldGroup.vue'

const enums = useEnumsStore()
const form = ref({
  nif: null,
  full_name: null,
  name: null,
  state_registration: null,
  city_registration: null,
  birthdate: null,
  status: null,
  email: null,
  phone: null,
  city_id: null,
  zip_code: null,
  address: null,
  district: null,
  number: null,
  complement: null,
  created_at: null,
  updated_at: null
})

</script>
