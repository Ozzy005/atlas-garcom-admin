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
import FormPage from './FormPage.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useStorageStore } from 'src/stores/storage'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'

const store = useStorageStore()
const router = useRouter()
const route = useRoute()

const form = ref({
  name: null,
  email: null
})

const handleGetItem = async () => {
  try {
    const { data } = await store.axios({ url: `/api/users/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

handleGetItem()

const handleSubmit = async () => {
  try {
    const { data } = await store.axios({
      method: 'put',
      url: `/api/users/${route.params.id}`,
      data: form.value
    })
    router.push({ name: 'users' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
