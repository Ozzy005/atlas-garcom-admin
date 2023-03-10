<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault
        crud="Métodos de Pagamento"
        model="payment-methods"
      />
      <div class="q-mt-lg">
        <q-form @submit="submit">
          <FormPage v-model="form" />
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

const form = ref({
  code: null,
  name: null,
  status: null
})

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/payment-methods/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => getItem())

const submit = async () => {
  try {
    const { data } = await api({
      method: 'put',
      url: `/api/payment-methods/${route.params.id}`,
      data: form.value
    })
    router.push({ name: 'payment-methods' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
