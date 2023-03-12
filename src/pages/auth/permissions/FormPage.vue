<template>
  <XFormGroup>

    <XInput
      v-model="form.name"
      :rules="[val => !!val || 'Nome é obrigatório!']"
      class="col-md-grow"
      label="Nome"
      maxlength="125"
      disable
    />

    <XInput
      v-model="form.description"
      :rules="[val => !!val || 'Descrição é obrigatório!']"
      class="col-md-grow"
      label="Descrição"
      maxlength="125"
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
