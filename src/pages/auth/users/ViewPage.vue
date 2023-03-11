<template>
  <q-page padding>
    <ViewDefault
      crud="Usuários"
      model="users"
    >

      <div class="col-12 row q-gap-md">
        <FieldDefault
          class="col-md-grow col-xs-12"
          field="CPF/CNPJ"
          :value="helpers.nifMask(form.nif)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Nome Completo/Razão Social:"
          :value="form.full_name"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Nome Social/Nome Fantasia:"
          :value="form.name"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Inscrição Estadual:"
          :value="form.state_registration"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Inscrição Municipal:"
          :value="form.city_registration"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Dt Nasc./Abertura:"
          :value="helpers.brDate(form.birthdate)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Status:"
          :value="enums.getName('status', form.status)"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Email:"
          :value="form.email"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Telefone:"
          :value="helpers.phoneMask(form.phone)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Cidade:"
          :value="form.city"
        />
      </div>

      <div class="col-12 row q-gap-md">
        <FieldDefault
          class="col-md-grow col-xs-12"
          field="CEP:"
          :value="helpers.zipCodeMask(form.zip_code)"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Endereço:"
          :value="form.address"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Bairro:"
          :value="form.district"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="N°:"
          :value="form.number"
        />

        <FieldDefault
          class="col-md-grow col-xs-12"
          field="Complemento:"
          :value="form.complement"
        />
      </div>

      <FieldDefault
        class="col-12"
        field="Atribuições:"
      >
        <q-chip
          v-for="(item, index) in roles"
          :key="index"
        >
          {{ item }}
        </q-chip>
      </FieldDefault>

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
import { ref, onMounted, computed } from 'vue'
import { api } from 'src/boot/axios'
import ViewDefault from 'src/components/crud/ViewDefault.vue'
import FieldDefault from 'src/components/crud/FieldDefault.vue'
import { useEnumsStore } from 'src/stores/enums'

const enums = useEnumsStore()
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

onMounted(() => {
  getItem()
})

</script>
