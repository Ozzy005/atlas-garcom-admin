<template>
  <div class="row q-gap-x-md q-gap-y-sm">

    <q-input
      v-model="form.code"
      class="col-md-grow col-xs-12"
      label="Código"
      outlined
      clearable
      maxlength="10"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Código é obrigatória!']"
    />

    <q-input
      v-model="form.name"
      class="col-md-grow col-xs-12"
      label="Nome"
      outlined
      clearable
      maxlength="30"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Nome é obrigatório!']"
    />

    <q-select
      v-model="form.status"
      class="col-md-grow col-xs-12"
      :options="enums.getEnum('status')"
      label="Status"
      outlined
      option-value="id"
      option-label="name"
      emit-value
      map-options
      clearable
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Status é obrigatório!']"
    />

    <div class="col-12">
      <XSbtBtn class="float-right" />
    </div>

  </div>
</template>

<script setup>
import { useEnumsStore } from 'src/stores/enums'
import { computed } from 'vue'
import XSbtBtn from 'src/components/common/XSbtBtn.vue'

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

const enums = useEnumsStore()

</script>
