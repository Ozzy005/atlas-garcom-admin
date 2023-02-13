<template>
  <div class="row q-gap-lg">

    <q-input v-model="form.name"
      class="col-md-6 col-xs-12"
      label="Nome"
      clearable
      maxlength="60"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Nome é obrigatório !']" />

    <q-input v-model="form.email"
      type="email"
      class="col-md-grow col-xs-12"
      label="Email"
      clearable
      maxlength="100"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Email é obrigatório !']" />

    <q-input v-if="$route.name === 'users-create'"
      :type="isPwd ? 'password' : 'text'"
      class="col-md-6 col-xs-12"
      label="Senha"
      clearable
      maxlength="100"
      lazy-rules="ondemand"
      v-model="form.password"
      :rules="[
        val => !!val || 'Senha é obrigatória !',
        val => val.length >= 8 || 'Minímo 8 caracteres !'
      ]">
      <template #append>
        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd" />
      </template>
    </q-input>

    <q-input v-if="$route.name === 'users-create'"
      :type="isPwdConfirm ? 'password' : 'text'"
      class="col-md-grow col-xs-12"
      label="Confirmação da senha"
      clearable
      maxlength="100"
      lazy-rules="ondemand"
      v-model="form.password_confirmation"
      :rules="[
        val => !!val || 'Confirmação da senha é obrigatória !',
        val => val.length >= 8 || 'Minímo 8 caracteres !',
        val => val === form.password || 'A senha não corresponde !'
      ]">
      <template #append>
        <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwdConfirm = !isPwdConfirm" />
      </template>
    </q-input>

    <q-select class="col-12"
      v-model="form.roles"
      :options="roles"
      label="Atribuições"
      option-value="id"
      option-label="description"
      emit-value
      map-options
      filled
      multiple
      use-chips
      stack-label
      clearable
      lazy-rules="ondemand"
      :rules="[val => val.length > 0 || 'Ao menos uma atribuição é obrigatória !']" />

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
import { computed, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'

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

const isPwd = ref(true)
const isPwdConfirm = ref(true)
const roles = ref([])

const handleGetRoles = async () => {
  try {
    const { data } = await api({ url: '/api/roles' })
    roles.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  handleGetRoles()
})

</script>
