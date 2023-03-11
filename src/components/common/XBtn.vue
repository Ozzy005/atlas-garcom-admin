<template>
  <q-btn
    :label="label"
    :class="{ 'full-width': $q.screen.xs }"
    style="min-width: 150px;"
    color="primary"
    no-caps
  >
    <template
      v-for="(_, slot) in $slots"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </q-btn>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>
