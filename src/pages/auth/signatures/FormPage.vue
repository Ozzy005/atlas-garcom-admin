<template>
  <div class="row q-gap-sm">

    <q-toggle
      v-model="form.hasDiscount"
      left-label
      label="Tem desconto?"
      checked-icon="check"
      color="green"
      unchecked-icon="clear"
    />

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <q-input
        v-model="form.name"
        class="col-md-3 col-xs-12"
        label="Nome"
        outlined
        clearable
        lazy-rules="ondemand"
        maxlength="30"
        :rules="[val => !!val || 'Nome é obrigatória!']"
      />

      <q-input
        v-model="form.description"
        class="col-md-grow col-xs-12"
        label="Descrição"
        outlined
        clearable
        maxlength="100"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Descrição é obrigatório!']"
      />

      <q-select
        v-model="form.status"
        class="col-md-2 col-xs-12"
        :options="statusOptions"
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
      <q-select
        v-model="form.recurrence"
        class="col-md-grow col-xs-12"
        :options="recurrenceOptions"
        label="Recorrência"
        outlined
        option-value="id"
        option-label="name"
        emit-value
        map-options
        clearable
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Recorrência é obrigatória!']"
      />

      <q-input
        v-model="form.price"
        class="col-md-grow col-xs-12"
        label="Preço"
        outlined
        clearable
        maxlength="12"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Preço é obrigatório!']"
        prefix="R$"
        v-maska
        data-maska="9.99#,##"
        data-maska-reversed
        data-maska-tokens="9:[0-9]:repeated"
      />

      <q-input
        v-model="form.discount"
        v-if="form.hasDiscount"
        class="col-md-grow col-xs-12"
        label="Desconto"
        outlined
        clearable
        maxlength="6"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Desconto é obrigatório!']"
        prefix="%"
        v-maska
        data-maska="9.99#,##"
        data-maska-reversed
        data-maska-tokens="9:[0-9]:repeated"
        @change="(vl) => helpers.moneyToFloat(vl) > 99.99 ? form.discount = '100,00' : form.discount = vl"
      />

      <q-input
        v-model="form.discounted_price"
        v-if="form.hasDiscount"
        class="col-md-grow col-xs-12"
        label="Preço C/ Desconto"
        readonly
        outlined
        clearable
        maxlength="12"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Preço C/ Desconto é obrigatório!']"
        prefix="R$"
        v-maska
        data-maska="9.99#,##"
        data-maska-reversed
        data-maska-tokens="9:[0-9]:repeated"
      >
        <q-tooltip class="fs-14">
          Preço C/Desconto é calculado automaticamente com base no preço e desconto.
        </q-tooltip>
      </q-input>

      <q-input
        v-model="form.total_price"
        class="col-md-grow col-xs-12"
        label="Preço Total"
        readonly
        outlined
        clearable
        maxlength="12"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Preço Total é obrigatório!']"
        prefix="R$"
        v-maska
        data-maska="9.99#,##"
        data-maska-reversed
        data-maska-tokens="9:[0-9]:repeated"
      >
        <q-tooltip class="fs-14">
          Preço total é calculado automaticamente com base na recorrência, preço ou preço c/ desconto.
        </q-tooltip>
      </q-input>
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <q-select
        class="col-md-grow col-xs-12"
        v-model="form.due_days"
        :options="dueDaysOptions"
        label="Dias de Vencimento"
        outlined
        option-value="id"
        option-label="day"
        emit-value
        map-options
        filled
        multiple
        use-chips
        stack-label
        clearable
        lazy-rules="ondemand"
        :rules="[val => val.length > 0 || 'Ao menos um dia de vencimento é obrigatório!']"
      />

      <q-select
        class="col-md-grow col-xs-12"
        v-model="form.modules"
        :options="modulesOptions"
        label="Módulos"
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
        :rules="[val => val.length > 0 || 'Ao menos um módulo é obrigatório!']"
      />
    </div>

    <div class="col-12">
      <q-btn
        type="submit"
        class="float-right"
        style="min-width: 150px;"
        label="Salvar"
        color="secondary"
        no-caps
      />
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import { vMaska } from 'maska'
import helpers from 'src/utils/helpers'

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

const statusOptions = ref([])
const recurrenceOptions = ref([])
const dueDaysOptions = ref([])
const modulesOptions = ref([])

watch(
  () => [form.value.price, form.value.discount, form.value.recurrence, form.value.hasDiscount],
  () => {
    const price = helpers.moneyToFloat(form.value.price)
    const discount = helpers.moneyToFloat(form.value.discount)
    const vl = (price - ((discount * price) / 100))
    form.value.discounted_price = helpers.floatToMoney(vl)
    form.value.total_price = helpers.floatToMoney(vl * form.value.recurrence)
    if (!form.value.hasDiscount) {
      form.value.discount = '0'
    }
  }
)

const getStatus = async () => {
  try {
    const { data } = await api({ url: '/api/status' })
    statusOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const getRecurrences = async () => {
  try {
    const { data } = await api({ url: '/api/recurrences' })
    recurrenceOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const getModules = async () => {
  try {
    const { data } = await api({ url: '/api/roles', params: { type: 2 } })
    modulesOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const getDueDays = async () => {
  try {
    const { data } = await api({ url: '/api/due-days', params: { status: 1 } })
    dueDaysOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getStatus()
  getRecurrences()
  getModules()
  getDueDays()
})

</script>
