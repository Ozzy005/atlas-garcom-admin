<template>
  <div class="row q-gap-y-sm">

    <q-input :type="isCurrentPwd ? 'password' : 'text'"
      class="col-12"
      label="Senha atual"
      outlined
      clearable
      maxlength="100"
      lazy-rules="ondemand"
      v-model="form.current_password"
      :rules="[
        val => !!val || 'Senha atual é obrigatória!',
        val => val.length >= 8 || 'Minímo 8 caracteres!'
      ]">
      <template #append>
        <q-icon :name="isCurrentPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isCurrentPwd = !isCurrentPwd" />
      </template>
    </q-input>

    <q-input :type="isPwd ? 'password' : 'text'"
      class="col-12"
      label="Nova senha"
      outlined
      clearable
      maxlength="100"
      lazy-rules="ondemand"
      v-model="form.password"
      :rules="[
        val => !!val || 'Nova senha é obrigatória!',
        val => val.length >= 8 || 'Minímo 8 caracteres!'
      ]">
      <template #append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <q-input :type="isPwdConfirm ? 'password' : 'text'"
      class="col-12"
      label="Confirmação da nova senha"
      outlined
      clearable
      maxlength="100"
      lazy-rules="ondemand"
      v-model="form.password_confirmation"
      :rules="[
        val => !!val || 'Confirmação da nova senha é obrigatório!',
        val => val.length >= 8 || 'Minímo 8 caracteres!',
        val => val === form.password || 'A senha não corresponde!'
      ]">
      <template #append>
        <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwdConfirm = !isPwdConfirm" />
      </template>
    </q-input>

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
import { computed, ref } from 'vue'

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

const isCurrentPwd = ref(true)
const isPwd = ref(true)
const isPwdConfirm = ref(true)

</script>
