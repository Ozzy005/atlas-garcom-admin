<template>
  <div class="row q-gap-sm">

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <q-input
        v-model="nif"
        class="col-md-grow col-xs-12"
        label="CPF/CNPJ"
        outlined
        clearable
        :mask="nifMask"
        unmasked-value
        reverse-fill-mask
        maxlength="18"
        lazy-rules="ondemand"
        :rules="[
          val => !!val || 'CPF/CNPJ é obrigatório!',
          val => helpers.cpfCnpj(val) || 'CPF/CNPJ é inválido!'
        ]"
      />

      <q-input
        v-model="form.full_name"
        class="col-md-grow col-xs-12"
        label="Nome Completo/Razão Social"
        outlined
        clearable
        maxlength="100"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Nome Completo/Razão Social é obrigatório!']"
      />

      <q-input
        v-model="form.name"
        class="col-md-grow col-xs-12"
        label="Nome Social/Nome Fantasia"
        outlined
        clearable
        maxlength="50"
        :rules="[val => true]"
      />
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <q-input
        v-model="form.state_registration"
        class="col-md-grow col-xs-12"
        label="Inscrição Estadual"
        outlined
        clearable
        maxlength="15"
        :rules="[val => !!val || 'Inscrição Estadual é obrigatório!']"
      />

      <q-input
        v-model="form.city_registration"
        class="col-md-grow col-xs-12"
        label="Inscrição Municipal"
        outlined
        clearable
        maxlength="12"
        :rules="[val => true]"
      />

      <q-input
        v-model="form.birthdate"
        type="date"
        class="col-md-grow col-xs-12"
        label="Dt. Nasc./Abertura"
        outlined
        clearable
        stack-label
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Dt. Nasc./Abertura é obrigatório!']"
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
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <q-input
        v-model="form.email"
        type="email"
        class="col-md-grow col-xs-12"
        label="Email"
        outlined
        clearable
        maxlength="100"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Email é obrigatório!']"
      />

      <q-input
        v-model="form.phone"
        class="col-md-grow col-xs-12"
        label="Telefone"
        outlined
        clearable
        mask="(##) # ####-####"
        unmasked-value
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Telefone é obrigatório!']"
      />

      <SelectCity
        v-model="form.city_id"
        :options-default="[{ id: form.city_id, info: form.city }]"
      />
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <q-input
        v-model="form.zip_code"
        class="col-md-grow col-xs-12"
        label="CEP"
        outlined
        clearable
        mask="#####-###"
        unmasked-value
        lazy-rules="ondemand"
        :rules="[val => !!val || 'CEP é obrigatório!']"
      />

      <q-input
        v-model="form.address"
        class="col-md-grow col-xs-12"
        label="Endereço"
        outlined
        clearable
        maxlength="60"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Endereço é obrigatório!']"
      />

      <q-input
        v-model="form.district"
        class="col-md-grow col-xs-12"
        label="Bairro"
        outlined
        clearable
        maxlength="30"
        :rules="[val => true]"
      />

      <q-input
        v-model="form.number"
        class="col-md-grow col-xs-12"
        label="N°"
        outlined
        clearable
        maxlength="10"
        :rules="[val => true]"
      />

      <q-input
        v-model="form.complement"
        class="col-md-grow col-xs-12"
        label="Complemento"
        outlined
        clearable
        maxlength="30"
        :rules="[val => true]"
      />
    </div>

    <div
      class="col-12 row q-gap-x-md q-gap-y-sm"
      v-if="$route.name === 'users-create'"
    >
      <q-input
        :type="isPwd ? 'password' : 'text'"
        class="col-md-grow col-xs-12"
        label="Senha"
        outlined
        clearable
        maxlength="100"
        lazy-rules="ondemand"
        v-model="form.password"
        :rules="[
          val => !!val || 'Senha é obrigatória!',
          val => val.length >= 8 || 'Minímo 8 caracteres!'
        ]"
      >
        <template #append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        :type="isPwdConfirm ? 'password' : 'text'"
        class="col-md-grow col-xs-12"
        label="Confirmação da senha"
        outlined
        clearable
        maxlength="100"
        lazy-rules="ondemand"
        v-model="form.password_confirmation"
        :rules="[
          val => !!val || 'Confirmação da senha é obrigatória!',
          val => val.length >= 8 || 'Minímo 8 caracteres!',
          val => val === form.password || 'A senha não corresponde!'
        ]"
      >
        <template #append>
          <q-icon
            :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdConfirm = !isPwdConfirm"
          />
        </template>
      </q-input>
    </div>

    <q-select
      class="col-12"
      v-model="form.roles"
      :options="roles"
      label="Atribuições"
      outlined
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
      :rules="[val => val.length > 0 || 'Ao menos uma atribuição é obrigatória!']"
    />

    <div class="col-12">
      <XSbtBtn class="float-right" />
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import helpers from 'src/utils/helpers'
import SelectCity from 'src/components/common/SelectCity.vue'
import { useEnumsStore } from 'src/stores/enums'
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
const isPwd = ref(true)
const isPwdConfirm = ref(true)
const roles = ref([])

const nif = computed({
  get () {
    return helpers.nifMask(form.value.nif)
  },
  set (value) {
    form.value.nif = value
  }
})

const nifMask = computed(() => {
  if (form.value.nif) {
    return form.value.nif.length > 11 ? '##.###.###/####-##' : '###.###.###-##'
  }
  return '##.###.###/####-##'
})

const getRoles = async () => {
  try {
    const { data } = await api({ url: '/api/roles' })
    roles.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getRoles()
})

</script>
