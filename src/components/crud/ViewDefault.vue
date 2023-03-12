<template>
  <q-card class="q-pa-md">
    <HeaderDefault
      :crud="crud"
      :model="model"
    />
    <div class="q-mt-lg row q-gap-md">
      <slot />
    </div>
  </q-card>
</template>

<script setup>
import HeaderDefault from './XHeader.vue'

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
