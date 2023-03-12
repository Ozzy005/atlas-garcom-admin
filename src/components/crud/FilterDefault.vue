<template>
  <div class="row">
    <XInput
      v-model="filter"
      :placeholder="placeholder"
      class="col-md-4"
      debounce="300"
      dense
    >
      <template #append>
        <q-icon name="search" />
      </template>
    </XInput>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import XInput from '../common/inputs/XInput.vue'

const props = defineProps({
  filterValue: String,
  placeholder: String
})

const emit = defineEmits(['update:filterValue'])

const filter = computed({
  get () {
    return props.filterValue
  },
  set (value) {
    emit('update:filterValue', value)
  }
})
</script>
