<template>
  <div class="row q-gap-y-sm">

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

    <div class="col-12">
      <XSaveBtn class="float-right" />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import XSaveBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XPwdInput from 'src/components/common/inputs/XPwdInput.vue'

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
