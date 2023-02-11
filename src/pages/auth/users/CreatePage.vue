<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault crud="Usuários"
        model="users" />
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
import { useStorageStore } from 'src/stores/storage'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'

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
