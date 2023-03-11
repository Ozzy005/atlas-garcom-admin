<template>
  <div class="row">
    <q-input
      class="col-md-4 col-xs-12"
      v-model="filter"
      outlined
      dense
      debounce="300"
      :placeholder="placeholder"
    >
      <template #append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
