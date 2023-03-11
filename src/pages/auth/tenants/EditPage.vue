<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault
        crud="Contratantes"
        model="tenants"
      />
      <div class="q-mt-lg">
        <q-form
          @submit="submit"
          ref="formRef"
        >
          <FormPage
            v-model="form"
            :form-ref="formRef"
          />
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import FormPage from './FormPage.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'

const router = useRouter()
const route = useRoute()
const formRef = ref(null)
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
  signature_id: null,
  due_day_id: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/tenants/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const submit = async () => {
  try {
    const { data } = await api({
      method: 'put',
      url: `/api/tenants/${route.params.id}`,
      data: form.value
    })
    router.push({ name: 'tenants' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => getItem())

</script>
