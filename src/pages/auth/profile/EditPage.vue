<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault crud="Editar Perfil"
        model="home" />
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
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'
import { api } from 'src/boot/axios'

const router = useRouter()
const route = useRoute()

const form = ref({
  name: null,
  email: null
})

const handleGetItem = async () => {
  try {
    const { data } = await api({ url: `/api/users/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

handleGetItem()

const handleSubmit = async () => {
  try {
    const { data } = await api({
      method: 'put',
      url: `/api/users/${route.params.id}`,
      data: form.value
    })
    router.push({ name: 'home' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
