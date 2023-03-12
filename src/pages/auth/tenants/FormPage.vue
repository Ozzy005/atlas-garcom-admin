<template>
  <q-stepper
    v-model="step"
    color="primary"
    vertical
    animated
    flat
    bordered
  >
    <q-step
      :name="1"
      :done="step > 1"
      title="Dados do Contratante"
      icon="mdi-account-tie"
    >

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
            enum-name="tenant-status"
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
      </div>

      <q-stepper-navigation class="flex q-gap-md">
        <XCtnBtn @click="() => formRef.validate().then((success) => validate(success, 2))" />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="2"
      :done="step > 2"
      title="Escolha da Assinatura"
      icon="mdi-file-document"
    >

      <div class="row q-gap-lg">
        <TenantSginatures
          v-model:signature-id-model="form.signature_id"
          v-model:due-days-model="dueDays"
          v-model:due-day-id-model="form.due_day_id"
          class="col-12"
        />

        <XSelect
          v-model="form.due_day_id"
          :rules="[val => !!val || 'Dia de Vencimento é obrigatório!']"
          :options="dueDays"
          class="col-md-auto"
          label="Dia de Vencimento"
          option-label="description"
        />
      </div>

      <q-stepper-navigation class="flex q-gap-md">
        <XCtnBtn @click="() => formRef.validate().then((success) => validate(success, 3))" />
        <XBackBtn @click="step = 1" />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="3"
      title="Confirmar Assinatura"
      icon="mdi-check-bold"
    >

      <q-stepper-navigation class="flex q-gap-md">
        <XSbtBtn />
        <XBackBtn @click="step = 2" />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import notify from 'src/composables/notify'
import TenantSginatures from 'src/components/common/TenantSignatures.vue'
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XBackBtn from 'src/components/common/buttons/XBackBtn.vue'
import XCtnBtn from 'src/components/common/buttons/XCtnBtn.vue'
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
import XSelect from 'src/components/common/inputs/XSelect.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formRef: {
    type: Object
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

const step = ref(1)
const dueDays = ref([])

watch(() => form.value.signature, () => { dueDays.value = form.value.signature.due_days })

const validate = (success, stepVl) => {
  if (stepVl === 3 && !form.value.signature_id) {
    notify.error('Selecione um plano!')
    return
  }
  if (success) {
    step.value = stepVl
  }
}

</script>
