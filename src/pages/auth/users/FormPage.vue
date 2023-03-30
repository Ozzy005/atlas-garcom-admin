<template>
  <XFormGroup>

    <XFormGroup>
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
    </XFormGroup>

    <XFormGroup>
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
    </XFormGroup>

    <XFormGroup>
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
    </XFormGroup>

    <XFormGroup>
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
    </XFormGroup>

    <XFormGroup v-if="$route.name === 'users-create'">
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
    </XFormGroup>

    <XFormGroup>
      <XChipSelect
        v-model="form.roles_ids"
        :rules="[val => val.length > 0 || 'Ao menos uma atribuição é obrigatória!']"
        :options="roles"
        label="Atribuições"
        option-label="description"
      />
    </XFormGroup>

    <XBtnGroup>
      <q-space />
      <XSbtBtn />
    </XBtnGroup>

  </XFormGroup>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import XSbtBtn from 'src/components/buttons/XSbtBtn.vue'
import XNifInput from 'src/components/inputs/person/XNifInput.vue'
import XFullNameInput from 'src/components/inputs/person/XFullNameInput.vue'
import XNameInput from 'src/components/inputs/person/XNameInput.vue'
import XStateRegistrationInput from 'src/components/inputs/person/XStateRegistrationInput.vue'
import XCityRegistrationInput from 'src/components/inputs/person/XCityRegistrationInput.vue'
import XBirthdateInput from 'src/components/inputs/person/XBirthdateInput.vue'
import XEnumSelect from 'src/components/inputs/XEnumSelect.vue'
import XEmailInput from 'src/components/inputs/person/XEmailInput.vue'
import XPhoneInput from 'src/components/inputs/person/XPhoneInput.vue'
import XCitySelect from 'src/components/inputs/person/XCitySelect.vue'
import XZipcodeInput from 'src/components/inputs/person/XZipcodeInput.vue'
import XAddressInput from 'src/components/inputs/person/XAddressInput.vue'
import XDistrictInput from 'src/components/inputs/person/XDistrictInput.vue'
import XNumberInput from 'src/components/inputs/person/XNumberInput.vue'
import XComplementInput from 'src/components/inputs/person/XComplementInput.vue'
import XPwdInput from 'src/components/inputs/XPwdInput.vue'
import XChipSelect from 'src/components/inputs/XChipSelect.vue'
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

const roles = ref([])

const getRoles = async () => {
  try {
    const { data } = await api({ url: '/api/public/roles' })
    roles.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getRoles()
})

</script>
