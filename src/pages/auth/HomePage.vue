<template>
  <q-page padding>
    <div class="text-h6"
      v-if="!!store.user">
      Seja bem vindo {{ store.user.name }} !
    </div>
  </q-page>
</template>

<script setup>
import { useStorageStore } from 'src/stores/storage'
const store = useStorageStore()
</script>
