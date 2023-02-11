<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <div class="row justify-between items-center">
        <div class="text-h6">Usuários</div>
        <q-btn style="min-width: 120px;"
          label="Voltar"
          color="primary"
          no-caps
          :to="{ name: 'users' }" />
      </div>
      <div class="q-mt-md">
        <q-form @submit="handleSubmit">
          <FormPage :data="form" />
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
import { useStorageStore } from 'src/stores/storage'

const store = useStorageStore()
const router = useRouter()

const form = ref({
  name: null,
  email: null,
  password: null,
  password_confirmation: null
})

const handleSubmit = async () => {
  try {
    const { data } = await store.axios({ method: 'post', url: '/api/users', data: form.value })
    router.push({ name: 'users' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
