<template>
  <div class="row q-gap-sm">

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <XNifInput
        v-model="form.nif"
        class="col-md-grow"
      />

      <XFullNameInput
        v-model="form.full_name"
        class="col-md-grow"
      />

      <XNameInput
        v-model="form.name"
        class="col-md-grow"
      />
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <XStateRegistrationInput
        v-model="form.state_registration"
        class="col-md-grow"
      />

      <XCityRegistrationInput
        v-model="form.city_registration"
        class="col-md-grow"
      />

      <XBirthdateInput
        v-model="form.birthdate"
        class="col-md-grow"
      />

      <XEnumSelect
        v-model="form.status"
        :rules="[val => !!val || 'Status é obrigatório!']"
        class="col-md-grow"
        label="Status"
        enum-name="status"
      />
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <XEmailInput
        v-model="form.email"
        class="col-md-grow"
      />

      <XPhoneInput
        v-model="form.phone"
        class="col-md-grow"
      />

      <XCitySelect
        v-model="form.city_id"
        :cities="[{ id: form.city_id, info: form.city }]"
        class="col-md-grow"
      />
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <XZipcodeInput
        v-model="form.zip_code"
        class="col-md-grow"
      />

      <XAddressInput
        v-model="form.address"
        class="col-md-grow"
      />

      <XDistrictInput
        v-model="form.district"
        class="col-md-grow"
      />

      <XNumberInput
        v-model="form.number"
        class="col-md-grow"
      />

      <XComplementInput
        v-model="form.complement"
        class="col-md-grow"
      />
    </div>

    <div
      class="col-12 row q-gap-x-md q-gap-y-sm"
      v-if="$route.name === 'users-create'"
    >
      <XPwdInput
        v-model="form.password"
        class="col-md-grow"
        label="Senha"
      />

      <XPwdInput
        v-model="form.password_confirmation"
        :rules="[val => val === form.password || 'A senha não corresponde!']"
        class="col-md-grow"
        label="Confirmação da senha"
      />
    </div>

    <XChipSelect
      v-model="form.roles"
      :rules="[val => val.length > 0 || 'Ao menos uma atribuição é obrigatória!']"
      :options="roles"
      label="Atribuições"
      option-label="description"
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
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XNifInput from 'src/components/common/inputs/person/XNifInput.vue'
import XFullNameInput from 'src/components/common/inputs/person/XFullNameInput.vue'
import XNameInput from 'src/components/common/inputs/person/XNameInput.vue'
import XStateRegistrationInput from 'src/components/common/inputs/person/XStateRegistrationInput.vue'
import XCityRegistrationInput from 'src/components/common/inputs/person/XCityRegistrationInput.vue'
import XBirthdateInput from 'src/components/common/inputs/person/XBirthdateInput.vue'
import XEnumSelect from 'src/components/common/inputs/XEnumSelect.vue'
import XEmailInput from 'src/components/common/inputs/person/XEmailInput.vue'
import XPhoneInput from 'src/components/common/inputs/person/XPhoneInput.vue'
import XCitySelect from 'src/components/common/inputs/person/XCitySelect.vue'
import XZipcodeInput from 'src/components/common/inputs/person/XZipcodeInput.vue'
import XAddressInput from 'src/components/common/inputs/person/XAddressInput.vue'
import XDistrictInput from 'src/components/common/inputs/person/XDistrictInput.vue'
import XNumberInput from 'src/components/common/inputs/person/XNumberInput.vue'
import XComplementInput from 'src/components/common/inputs/person/XComplementInput.vue'
import XPwdInput from 'src/components/common/inputs/XPwdInput.vue'
import XChipSelect from 'src/components/common/inputs/XChipSelect.vue'

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

const roles = ref([])

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
