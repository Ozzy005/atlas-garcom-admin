<template>
  <div class="row q-gap-y-sm">

    <q-input v-model="form.name"
      class="col-12"
      label="Nome"
      outlined
      clearable
      maxlength="60"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Nome é obrigatório!']" />

    <q-input v-model="form.email"
      type="email"
      class="col-12"
      label="Email"
      outlined
      clearable
      maxlength="100"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Email é obrigatório!']" />

    <div class="col-12">
      <q-btn type="submit"
        class="float-right"
        style="min-width: 150px;"
        label="Salvar"
        color="secondary"
        no-caps />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const form = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

</script>
