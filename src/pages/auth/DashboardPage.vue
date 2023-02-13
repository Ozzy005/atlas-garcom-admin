<template>
  <q-page padding>
    <div class="text-h6"
      v-if="!!auth.user">
      Seja bem vindo {{ auth.user.name }} !
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import notify from 'src/composables/notify'
import { api } from 'src/boot/axios'

const auth = useAuthStore()

const handleGetItem = async () => {
  try {
    const { data } = await api({ url: '/api/dashboard' })
    auth.user = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => handleGetItem())
</script>
