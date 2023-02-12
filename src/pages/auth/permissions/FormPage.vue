<template>
  <div class="row q-gap-lg">

    <q-input v-model="form.name"
      class="col-md-6 col-xs-12"
      label="Nome"
      clearable
      disable
      maxlength="125"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Nome é obrigatório !']" />

    <q-input v-model="form.description"
      class="col-md-grow col-xs-12"
      label="Descrição"
      clearable
      maxlength="125"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Descrição é obrigatório !']" />

    <div class="col-12">
      <q-btn type="submit"
        class="float-right"
        style="min-width: 120px;"
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
