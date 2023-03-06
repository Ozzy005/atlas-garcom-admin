<template>
  <div class="row justify-between items-center">
    <div class="text-h6">{{ crud }}</div>
    <q-btn v-if="showBackBtn"
      style="min-width: 150px;"
      label="Voltar"
      color="primary"
      no-caps
      :to="{ name: model }" />
  </div>
</template>

<script setup>
defineProps({
  crud: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  showBackBtn: {
    type: Boolean,
    default: true
  }
})
</script>
