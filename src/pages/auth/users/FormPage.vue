<template>
  <div class="row q-gap-lg">

    <div class="col-12 row q-gap-lg">
      <q-input v-model="form.nif"
        class="col-md-grow col-xs-12"
        label="CPF/CNPJ"
        clearable
        :mask="nifMask"
        unmasked-value
        reverse-fill-mask
        maxlength="18"
        lazy-rules="ondemand"
        :rules="[
          val => !!val || 'CPF/CNPJ é obrigatório!',
          val => helpers.cpfCnpj(val) || 'CPF/CNPJ é inválido!'
        ]" />

      <q-input v-model="form.full_name"
        class="col-md-grow col-xs-12"
        label="Nome Completo/Razão Social"
        clearable
        maxlength="60"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Nome Completo/Razão Social é obrigatório!']" />

      <q-input v-model="form.name"
        class="col-md-grow col-xs-12"
        label="Nome Social/Nome Fantasia"
        clearable
        maxlength="30" />
    </div>

    <div class="col-12 row q-gap-lg">
      <q-input v-model="form.state_registration"
        class="col-md-grow col-xs-12"
        label="Inscrição Estadual"
        clearable
        maxlength="15" />

      <q-input v-model="form.city_registration"
        class="col-md-grow col-xs-12"
        label="Inscrição Municipal"
        clearable
        maxlength="12" />

      <q-input v-model="form.birthdate"
        type="date"
        class="col-md-grow col-xs-12"
        label="Dt. Nasc./Abertura"
        clearable
        stack-label
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Dt. Nasc./Abertura é obrigatório!']" />

      <q-select v-model="form.status"
        class="col-md-grow col-xs-12"
        :options="[{ id: 1, name: 'Ativo' }, { id: 2, name: 'Inativo' }]"
        label="Status"
        option-value="id"
        option-label="name"
        emit-value
        map-options
        clearable
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Status é obrigatório!']" />
    </div>

    <div class="col-12 row q-gap-lg">
      <q-input v-model="form.email"
        type="email"
        class="col-md-grow col-xs-12"
        label="Email"
        clearable
        maxlength="100"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Email é obrigatório!']" />

      <q-input v-model="form.phone"
        class="col-md-grow col-xs-12"
        label="Telefone"
        clearable
        mask="(##) # ####-####"
        unmasked-value
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Telefone é obrigatório!']" />

      <SelectCity v-model="form.city_id"
        :options-default="[{ id: form.city_id, info: form.city }]" />
    </div>

    <div class="col-12 row q-gap-lg">
      <q-input v-model="form.zip_code"
        class="col-md-grow col-xs-12"
        label="CEP"
        clearable
        mask="#####-###"
        unmasked-value
        lazy-rules="ondemand"
        :rules="[val => !!val || 'CEP é obrigatório!']" />

      <q-input v-model="form.address"
        class="col-md-grow col-xs-12"
        label="Endereço"
        clearable
        maxlength="60"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Endereço é obrigatório!']" />

      <q-input v-model="form.district"
        class="col-md-grow col-xs-12"
        label="Bairro"
        clearable
        maxlength="30" />

      <q-input v-model="form.number"
        class="col-md-grow col-xs-12"
        label="N°"
        clearable
        maxlength="10" />

      <q-input v-model="form.complement"
        class="col-md-grow col-xs-12"
        label="Complemento"
        clearable
        maxlength="30" />
    </div>

    <div class="col-12 row q-gap-lg">
      <q-input v-if="$route.name === 'users-create'"
        :type="isPwd ? 'password' : 'text'"
        class="col-md-grow col-xs-12"
        label="Senha"
        clearable
        maxlength="100"
        lazy-rules="ondemand"
        v-model="form.password"
        :rules="[
          val => !!val || 'Senha é obrigatória!',
          val => val.length >= 8 || 'Minímo 8 caracteres!'
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
          val => !!val || 'Confirmação da senha é obrigatória!',
          val => val.length >= 8 || 'Minímo 8 caracteres!',
          val => val === form.password || 'A senha não corresponde!'
        ]">
        <template #append>
          <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdConfirm = !isPwdConfirm" />
        </template>
      </q-input>
    </div>

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
      :rules="[val => val.length > 0 || 'Ao menos uma atribuição é obrigatória!']" />

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
import helpers from 'src/utils/helpers'
import SelectCity from 'src/components/SelectCity.vue'

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

const nifMask = computed(() => {
  if (form.value.nif) {
    return form.value.nif.length > 11 ? '##.###.###/####-##' : '###.###.###-##'
  }
  return '###.###.###-##'
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
