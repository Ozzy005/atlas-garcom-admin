<template>
  <XFormGroup>

    <XInput
      v-model="form.day"
      :rules="[
        val => !!val || 'Dia é obrigatório!',
        val => val >= 1 && val <= 31 || 'Dia deve ser entre 1 a 31!'
      ]"
      class="col-md-grow"
      label="Dia"
      mask="##"
      min="1"
      max="31"
    />

    <XInput
      v-model="form.description"
      :rules="[val => !!val || 'Descrição é obrigatório!']"
      class="col-md-grow"
      label="Descrição"
      maxlength="50"
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
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XInput from 'src/components/common/inputs/XInput.vue'
import XEnumSelect from 'src/components/common/inputs/XEnumSelect.vue'
import XFormGroup from 'src/components/crud/XFormGroup.vue'
import XBtnGroup from 'src/components/crud/XBtnGroup.vue'

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
