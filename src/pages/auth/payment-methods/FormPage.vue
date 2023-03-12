<template>
  <div class="row q-gap-x-md q-gap-y-sm">

    <XInput
      v-model="form.code"
      :rules="[val => !!val || 'Código é obrigatória!']"
      class="col-md-grow"
      label="Código"
      maxlength="10"
    />

    <XInput
      v-model="form.name"
      class="col-md-grow"
      :rules="[val => !!val || 'Nome é obrigatório!']"
      label="Nome"
      maxlength="30"
    />

    <XEnumSelect
      v-model="form.status"
      :rules="[val => !!val || 'Status é obrigatório!']"
      class="col-md-grow"
      label="Status"
      enum-name="status"
    />

    <div class="col-12">
      <XSbtBtn class="float-right" />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XInput from 'src/components/common/inputs/XInput.vue'
import XEnumSelect from 'src/components/common/inputs/XEnumSelect.vue'

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
