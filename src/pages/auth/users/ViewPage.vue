<template>
  <XView
    v-model="form"
    :return-to="{ name: 'users-list' }"
    title="Usuários"
    api-get="users"
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
        :value="enums.getName('status', form.status)"
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

    <XField
      class="col-12"
      field="Atribuições:"
    >
      <q-chip
        v-for="(item, index) in roles"
        :key="index"
      >
        {{ item }}
      </q-chip>
    </XField>

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
import { ref, computed } from 'vue'
import XView from 'src/components/crud/view/XView.vue'
import XField from 'src/components/crud/view/XField.vue'
import { useEnumsStore } from 'src/stores/enums'
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
  roles: [],
  created_at: null,
  updated_at: null
})

const roles = computed(() => {
  return form.value.roles.map(item => item.description)
})

</script>
