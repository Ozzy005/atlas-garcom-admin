<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault crud="Métodos de Pagamento"
        model="payment-methods" />
      <div class="q-mt-md">
        <q-form @submit="handleSubmit">
          <FormPage v-model="form" />
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import { ref } from 'vue'
import FormPage from './FormPage.vue'
import { useRouter } from 'vue-router'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'
import { api } from 'src/boot/axios'

const router = useRouter()

const form = ref({
  code: null,
  name: null,
  status: null
})

const handleSubmit = async () => {
  try {
    const { data } = await api({ method: 'post', url: '/api/payment-methods', data: form.value })
    router.push({ name: 'payment-methods' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
