<template>
  <q-page padding>
    <div class="text-h6"
      v-if="!!auth.user">
      Seja bem vindo {{ auth.user.name }} !
    </div>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'

const auth = useAuthStore()
</script>
