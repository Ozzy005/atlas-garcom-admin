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
      title="Dados básicos do produto"
      icon="mdi-cart"
    >

      <XFormGroup>
        <XFormGroup>

          <XFileInput
            v-model:file-value="form.file"
            v-model:image-value="form.image"
            :rules="[val => !!val || 'Imagem do produto é obrigatória!']"
            accept=".jpeg, .jpg, .png"
            max-file-size="1048576"
            class="col-md-grow"
            label="Imagem do produto"
          />

          <XInput
            v-model="form.name"
            :rules="[val => !!val || 'Nome é obrigatório!']"
            class="col-md-grow"
            label="Nome"
            maxlength="30"
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
            v-model="form.category_id"
            :rules="[val => !!val || 'Categoria é obrigatório!']"
            :options="categories"
            class="col-md-grow"
            label="Categoria"
          />

          <XInput
            v-model="form.description"
            class="col-md-grow"
            label="Descrição"
            maxlength="100"
          />

        </XFormGroup>
      </XFormGroup>

      <q-stepper-navigation>
        <XBtnGroup>
          <XCtnBtn @click="() => formRef.validate().then((success) => validate(success, 2))" />
        </XBtnGroup>
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="2"
      :done="step > 2"
      title="Preços do produto"
      icon="mdi-cash-multiple"
    >
      <XFormGroup>

        <XFormGroup
          class="rounded-borders shadow-1 q-pa-sm q-gap-y-md"
          :class="$q.screen.gt.sm ? 'no-wrap' : ''"
          v-for="(item, key) in form.product_prices"
          :key="key"
        >
          <XInput
            v-model="item.name"
            :rules="[val => !!val || 'Nome é obrigatório!']"
            class="col-md"
            label="Nome"
            maxlength="30"
          />
          <XSelect
            v-model="item.measurement_unit_id"
            :rules="[val => !!val || 'Unidade de Medida é obrigatório!']"
            :options="measurementUnits"
            class="col-md"
            label="Un. Medida"
            option-label="initials"
          />
          <XQntInput
            v-model="item.quantity"
            :rules="[val => !!val || 'Quantidade é obrigatório!']"
            class="col-md"
            label="Qntd."
          />
          <XMoneyInput
            v-model="item.cost_price"
            :rules="[val => !!val || 'Preço de Custo é obrigatório!']"
            class="col-md"
            label="Preço de Custo"
          />
          <XMoneyInput
            v-model="item.price"
            :rules="[val => !!val || 'Preço é obrigatório!']"
            class="col-md"
            label="Preço"
          />
          <XEnumSelect
            v-model="item.status"
            :rules="[val => !!val || 'Status é obrigatório!']"
            class="col-md"
            label="Status"
            enum-name="status"
          />
          <XBtn
            @click="deletePrice(key)"
            icon="delete"
            color="red"
            tooltip-label="Deletar"
            style="margin-bottom: 20px;"
          />
        </XFormGroup>
        <XBtnGroup>
          <XBtn
            @click="addPrice"
            label="Adicionar novo preço"
          />
        </XBtnGroup>
      </XFormGroup>
      <q-stepper-navigation>
        <XBtnGroup>
          <XBackBtn @click="step = 1" />
          <XCtnBtn @click="() => formRef.validate().then((success) => validate(success, 3))" />
        </XBtnGroup>
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="3"
      title="Complementos do produto"
      icon="mdi-cart-plus"
    >
      <XFormGroup>
        <XChipSelect
          v-model="form.complements_ids"
          :options="complements"
          class="col-md-grow"
          label="Complementos"
        />
      </XFormGroup>
      <q-stepper-navigation>
        <XBtnGroup>
          <XBackBtn @click="step = 2" />
          <XSbtBtn />
        </XBtnGroup>
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import XSbtBtn from 'src/components/buttons/XSbtBtn.vue'
import XCtnBtn from 'src/components/buttons/XCtnBtn.vue'
import XBackBtn from 'src/components/buttons/XBackBtn.vue'
import XInput from 'src/components/inputs/XInput.vue'
import XEnumSelect from 'src/components/inputs/XEnumSelect.vue'
import XFormGroup from 'src/components/crud/form/XFormGroup.vue'
import XBtnGroup from 'src/components/crud/form/XBtnGroup.vue'
import XFileInput from 'src/components/inputs/XFileInput.vue'
import XSelect from 'src/components/inputs/XSelect.vue'
import XChipSelect from 'src/components/inputs/XChipSelect.vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import XQntInput from 'src/components/inputs/XQntInput.vue'
import XMoneyInput from 'src/components/inputs/XMoneyInput.vue'
import XBtn from 'src/components/buttons/XBtn.vue'

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

const step = ref(1)
const categories = ref([])
const complements = ref([])
const measurementUnits = ref([])

const validate = (success, stepVl) => {
  if (success) {
    step.value = stepVl
  }
}

const addPrice = () => {
  props.formRef.validate().then((success) => {
    if (success) {
      const price = {}
      for (const key in form.value.product_prices[0]) {
        price[key] = null
      }
      form.value.product_prices.push(price)
    }
  })
}

const deletePrice = (key) => {
  if (form.value.product_prices.length === 1) {
    notify.warning('Ao menos um preço é obrigatório!')
    return
  }
  form.value.product_prices = form.value.product_prices.filter((vl, index) => index !== key)
}

const getCategories = async () => {
  try {
    const { data } = await api({ url: '/api/public/categories', params: { status: 1 } })
    categories.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const getComplements = async () => {
  try {
    const { data } = await api({ url: '/api/public/complements', params: { status: 1 } })
    complements.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const getMeasurementUnits = async () => {
  try {
    const { data } = await api({ url: '/api/public/measurement-units', params: { status: 1 } })
    measurementUnits.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getCategories()
  getComplements()
  getMeasurementUnits()
})

</script>
