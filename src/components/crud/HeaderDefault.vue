<template>
  <div class="row justify-between items-center">
    <div class="text-h6">{{ crud }}</div>
    <XBackBtn
      v-if="showBackBtn"
      :model="model"
    />
  </div>
</template>

<script setup>
import XBackBtn from '../common/buttons/XBackBtn.vue'

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
