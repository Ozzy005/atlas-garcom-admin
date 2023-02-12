<template>
  <q-page padding>
    <div class="text-h6"
      v-if="!!auth.user">
      Seja bem vindo {{ auth.user.name }} !
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import notify from 'src/composables/notify'

const auth = useAuthStore()

onBeforeMount(async () => {
  try {
    await auth.getUser()
  } catch (error) {
    notify.error(error)
  }
})
</script>
