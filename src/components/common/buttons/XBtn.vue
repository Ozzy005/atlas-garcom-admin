<template>
  <q-btn
    :class="{ 'full-width': $q.screen.xs }"
    style="min-width: 150px;"
    color="primary"
    no-caps
  >
    <template
      v-for="(_, slot) in $slots"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
        :key="slot"
      />
    </template>
  </q-btn>
</template>
