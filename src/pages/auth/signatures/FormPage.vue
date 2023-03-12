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
      <XInput
        v-model="form.name"
        :rules="[val => !!val || 'Nome é obrigatório!']"
        class="col-md-3"
        label="Nome"
        maxlength="30"
      />

      <XInput
        :rules="[val => !!val || 'Descrição é obrigatório!']"
        v-model="form.description"
        class="col-md-grow"
        label="Descrição"
        maxlength="100"
      />

      <XEnumSelect
        v-model="form.status"
        :rules="[val => !!val || 'Status é obrigatório!']"
        class="col-md-2"
        label="Status"
        enum-name="status"
      />
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <XEnumSelect
        v-model="form.recurrence"
        :rules="[val => !!val || 'Recorrência é obrigatório!']"
        class="col-md-3"
        label="Recorrência"
        enum-name="recurrences"
      />

      <XMoneyInput
        v-model="form.price"
        :rules="[val => !!val || 'Preço é obrigatório!']"
        class="col-md-grow"
        label="Preço"
      />

      <XPctInput
        v-if="form.hasDiscount"
        v-model="form.discount"
        :rules="[val => !!val || 'Desconto é obrigatório!']"
        class="col-md-grow"
        label="Desconto"
      />

      <XMoneyInput
        v-if="form.hasDiscount"
        v-model="form.discounted_price"
        :rules="[val => !!val || 'Preço C/ Desconto é obrigatório!']"
        class="col-md-grow"
        label="Preço C/ Desconto"
        readonly
      >
        <q-tooltip class="fs-14">
          Preço C/Desconto é calculado automaticamente com base no preço e desconto.
        </q-tooltip>
      </XMoneyInput>

      <XMoneyInput
        v-model="form.total_price"
        :rules="[val => !!val || 'Preço Total é obrigatório!']"
        class="col-md-grow"
        label="Preço Total"
        readonly
      >
        <q-tooltip class="fs-14">
          Preço total é calculado automaticamente com base na recorrência, preço ou preço c/ desconto.
        </q-tooltip>
      </XMoneyInput>
    </div>

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <XChipSelect
        v-model="form.due_days"
        :options="dueDays"
        :rules="[val => val.length > 0 || 'Ao menos um dia de vencimento é obrigatório!']"
        class="col-md-grow"
        label="Dias de Vencimento"
        option-label="day"
      />

      <XChipSelect
        v-model="form.modules"
        :options="modules"
        :rules="[val => val.length > 0 || 'Ao menos um módulo é obrigatório!']"
        class="col-md-grow"
        label="Módulos"
        option-label="description"
      />
    </div>

    <div class="col-12">
      <XSbtBtn class="float-right" />
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import helpers from 'src/utils/helpers'
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XInput from 'src/components/common/inputs/XInput.vue'
import XEnumSelect from 'src/components/common/inputs/XEnumSelect.vue'
import XMoneyInput from 'src/components/common/inputs/XMoneyInput.vue'
import XPctInput from 'src/components/common/inputs/XPctInput.vue'
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

const dueDays = ref([])
const modules = ref([])

watch(
  () => [form.value.hasDiscount, form.value.recurrence, form.value.price, form.value.discount],
  () => {
    const price = helpers.moneyToFloat(form.value.price)
    const discount = helpers.moneyToFloat(form.value.discount)
    const vl = (price - ((discount * price) / 100))
    form.value.discounted_price = helpers.floatToMoney(vl)
    form.value.total_price = helpers.floatToMoney(vl * (form.value.recurrence ?? 1))
    if (!form.value.hasDiscount) {
      form.value.discount = '0'
    }
  }
)

const getModules = async () => {
  try {
    const { data } = await api({ url: '/api/roles', params: { type: 2 } })
    modules.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const getDueDays = async () => {
  try {
    const { data } = await api({ url: '/api/due-days', params: { status: 1 } })
    dueDays.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getModules()
  getDueDays()
})

</script>
