<template>
  <q-page padding>
    <div class="text-h6"
      v-if="!!store.user">
      Seja bem vindo {{ store.user.name }} !
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount } from 'vue'
import { useStorageStore } from 'src/stores/storage'
import notify from 'src/composables/notify'

const store = useStorageStore()

onBeforeMount(async () => {
  try {
    await store.getUser()
  } catch (error) {
    notify.error(error)
  }
})
</script>
