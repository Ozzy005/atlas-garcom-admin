<template>
  <q-stepper
    v-model="step"
    vertical
    color="primary"
    animated
    flat
    bordered
  >
    <q-step
      :name="1"
      title="Dados do Contratante"
      icon="mdi-account-tie"
      :done="step > 1"
    >

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
            :options="enums.getEnum('tenant-status')"
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
      </div>

      <q-stepper-navigation class="flex q-gap-md">
        <q-btn
          style="min-width: 150px;"
          label="Continuar"
          color="primary"
          no-caps
          @click="() => formRef.validate().then((success) => validate(success, 2))"
        />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="2"
      title="Escolha da Assinatura"
      icon="mdi-file-document"
      :done="step > 2"
    >

      <div class="row q-gap-lg">
        <TenantSginatures
          class="col-12"
          v-model:signature-id-model="form.signature_id"
          v-model:due-days-model="dueDays"
          v-model:due-day-id-model="form.due_day_id"
        />

        <q-select
          v-model="form.due_day_id"
          class="col-auto"
          :options="dueDays"
          label="Dia de Vencimento"
          outlined
          option-value="id"
          option-label="description"
          emit-value
          map-options
          clearable
          lazy-rules="ondemand"
          :rules="[val => !!val || 'Dia de Vencimento é obrigatório!']"
        />
      </div>

      <q-stepper-navigation class="flex q-gap-md">
        <q-btn
          style="min-width: 150px;"
          label="Continuar"
          color="primary"
          no-caps
          @click="() => formRef.validate().then((success) => validate(success, 3))"
        />
        <q-btn
          style="min-width: 150px;"
          label="Voltar"
          color="primary"
          outline
          no-caps
          @click="step = 1"
        />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="3"
      title="Confirmar Assinatura"
      icon="mdi-check-bold"
    >

      <q-stepper-navigation class="flex q-gap-md">
        <q-btn
          type="submit"
          style="min-width: 150px;"
          label="Salvar"
          color="primary"
          no-caps
        />
        <q-btn
          style="min-width: 150px;"
          label="Voltar"
          color="primary"
          outline
          no-caps
          @click="step = 2"
        />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import helpers from 'src/utils/helpers'
import SelectCity from 'src/components/common/SelectCity.vue'
import notify from 'src/composables/notify'
import TenantSginatures from 'src/components/common/TenantSignatures.vue'
import { useEnumsStore } from 'src/stores/enums'

const enums = useEnumsStore()

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

</script>
