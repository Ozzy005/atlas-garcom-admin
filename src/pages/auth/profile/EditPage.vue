<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault crud="Editar Perfil"
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
import { ref, onMounted } from 'vue'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'
import { api } from 'src/boot/axios'

const router = useRouter()

const form = ref({
  name: null,
  email: null
})

const handleGetItem = async () => {
  try {
    const { data } = await api({ url: '/api/profile' })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => handleGetItem())

const handleSubmit = async () => {
  try {
    const { data } = await api({
      method: 'put',
      url: '/api/profile',
      data: form.value
    })
    router.push({ name: 'dashboard' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
