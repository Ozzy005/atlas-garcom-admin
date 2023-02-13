<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault crud="Editar senha"
        model="dashboard" />
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
import FormPage from './FormPage.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { api } from 'src/boot/axios'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'

const router = useRouter()

const form = ref({
  current_password: null,
  password: null,
  password_confirmation: null
})

const handleSubmit = async () => {
  try {
    const { data } = await api({
      method: 'put',
      url: '/api/change-password',
      data: form.value
    })
    router.push({ name: 'dashboard' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
