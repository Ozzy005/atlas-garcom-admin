<template>
  <q-page padding>
    <ViewDefault
      crud="Usuários"
      model="users"
    >

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="CPF/CNPJ"
          :value="helpers.nifMask(form.nif)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Nome Completo/Razão Social:"
          :value="form.full_name"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Nome Social/Nome Fantasia:"
          :value="form.name"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Inscrição Estadual:"
          :value="form.state_registration"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Inscrição Municipal:"
          :value="form.city_registration"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Dt Nasc./Abertura:"
          :value="helpers.brDate(form.birthdate)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Status:"
          :value="formatStatus(form.status)"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Email:"
          :value="form.email"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Telefone:"
          :value="helpers.phoneMask(form.phone)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Cidade:"
          :value="form.city"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="CEP:"
          :value="helpers.zipCodeMask(form.zip_code)"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Endereço:"
          :value="form.address"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Bairro:"
          :value="form.district"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="N°:"
          :value="form.number"
        />

        <FieldView
          class="col-md-grow col-xs-12"
          field="Complemento:"
          :value="form.complement"
        />
      </div>

      <FieldView
        class="col-12"
        field="Atribuições:"
      >
        <q-chip
          v-for="(item, index) in roles"
          :key="index"
        >
          {{ item }}
        </q-chip>
      </FieldView>

      <div class="col-12 row q-gap-md">
        <FieldView
          class="col-md-grow col-xs-12"
          field="Dt. Criação:"
          :value="helpers.brDateTime(form.created_at)"
        />

        <FieldView
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
import { ref, onMounted, computed } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldView from 'src/components/crud/FieldView.vue'

const route = useRoute()
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
const statusOptions = ref([])

const roles = computed(() => {
  return form.value.roles.map(item => item.description)
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/users/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const getStatus = async () => {
  try {
    const { data } = await api({ url: '/api/status' })
    statusOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const formatStatus = (val) => {
  const status = statusOptions.value.find(item => item.id === val)
  if (status) {
    return status.name
  }
  return 'Não informado'
}

onMounted(() => {
  getItem()
  getStatus()
})

</script>
