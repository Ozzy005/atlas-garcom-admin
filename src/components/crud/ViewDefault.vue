<template>
  <q-card class="q-pa-md">
    <HeaderDefault :crud="crud"
      :model="model" />
    <div class="q-mt-md row q-gap-md">
      <slot />
    </div>
  </q-card>
</template>

<script setup>
import HeaderDefault from './HeaderDefault.vue'

defineProps({
  crud: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  }
})

</script>
