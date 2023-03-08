<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault crud="Dias de Vencimento"
        model="due-days" />
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
import { ref } from 'vue'
import FormPage from './FormPage.vue'
import { useRouter } from 'vue-router'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'
import { api } from 'src/boot/axios'

const router = useRouter()

const form = ref({
  day: null,
  description: null,
  status: null
})

const submit = async () => {
  try {
    const { data } = await api({ method: 'post', url: '/api/due-days', data: form.value })
    router.push({ name: 'due-days' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
