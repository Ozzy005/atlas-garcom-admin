<template>
  <XFormGroup>

    <XPwdInput
      v-model="form.current_password"
      label="Senha atual"
    />

    <XPwdInput
      v-model="form.password"
      label="Nova senha"
    />

    <XPwdInput
      v-model="form.password_confirmation"
      :rules="[val => val === form.password || 'A senha não corresponde!']"
      label="Confirmação da nova senha"
    />

    <XBtnGroup>
      <q-space />
      <XSaveBtn />
    </XBtnGroup>

  </XFormGroup>
</template>

<script setup>
import { computed } from 'vue'
import XSaveBtn from 'src/components/buttons/XSbtBtn.vue'
import XPwdInput from 'src/components/inputs/XPwdInput.vue'
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
