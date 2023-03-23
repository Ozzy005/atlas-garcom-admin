<template>
  <XFormGroup>

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

    <XBtnGroup>
      <q-space />
      <XSbtBtn />
    </XBtnGroup>

  </XFormGroup>
</template>

<script setup>
import { computed } from 'vue'
import XSbtBtn from 'src/components/buttons/XSbtBtn.vue'
import XInput from 'src/components/inputs/XInput.vue'
import XEnumSelect from 'src/components/inputs/XEnumSelect.vue'
import XFormGroup from 'src/components/crud/form/XFormGroup.vue'
import XBtnGroup from 'src/components/crud/form/XBtnGroup.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formRef: {
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
