<template>
  <XFormGroup>

    <XFormGroup>
      <XInput
        v-model="form.name"
        :rules="[val => !!val || 'Nome é obrigatório!']"
        class="col-md-grow"
        label="Nome"
        maxlength="30"
      />

      <XInput
        v-model="form.description"
        class="col-md-grow"
        label="Descrição"
        maxlength="100"
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
      <XSelect
        v-model="form.measurement_unit_id"
        :rules="[val => !!val || 'Unidade de Medida é obrigatório!']"
        :options="measurementUnits"
        class="col-md-grow"
        label="Unidade de Medida"
      />

      <XQntInput
        v-model="form.quantity"
        :rules="[val => !!val || 'Quantidade é obrigatório!']"
        class="col-md-grow"
        label="Quantidade"
      />

      <XMoneyInput
        v-model="form.cost_price"
        :rules="[val => !!val || 'Preço de Custo é obrigatório!']"
        class="col-md-grow"
        label="Preço de Custo"
      />

      <XMoneyInput
        v-model="form.price"
        :rules="[val => !!val || 'Preço é obrigatório!']"
        class="col-md-grow"
        label="Preço"
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
import XSbtBtn from 'src/components/buttons/XSbtBtn.vue'
import XInput from 'src/components/inputs/XInput.vue'
import XEnumSelect from 'src/components/inputs/XEnumSelect.vue'
import XMoneyInput from 'src/components/inputs/XMoneyInput.vue'
import XFormGroup from 'src/components/crud/form/XFormGroup.vue'
import XBtnGroup from 'src/components/crud/form/XBtnGroup.vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import XSelect from 'src/components/inputs/XSelect.vue'
import XQntInput from 'src/components/inputs/XQntInput.vue'

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

const measurementUnits = ref([])

const getMeasurementUnits = async () => {
  try {
    const { data } = await api({ url: '/api/public/measurement-units', params: { status: 1 } })
    measurementUnits.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getMeasurementUnits()
})

</script>
