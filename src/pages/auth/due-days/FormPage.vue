<template>
  <div class="row q-gap-x-md q-gap-y-sm">

    <q-input v-model="form.day"
      class="col-md-grow col-xs-12"
      label="Dia"
      outlined
      clearable
      lazy-rules="ondemand"
      mask="##"
      min="1"
      max="31"
      :rules="[
        val => !!val || 'Dia é obrigatória!',
        val => val >= 1 && val <= 31 || 'Dia deve ser entre 1 a 31!'
      ]" />

    <q-input v-model="form.description"
      class="col-md-grow col-xs-12"
      label="Descrição"
      outlined
      clearable
      maxlength="50"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Descrição é obrigatório!']" />

    <q-select v-model="form.status"
      class="col-md-grow col-xs-12"
      :options="statusOptions"
      label="Status"
      outlined
      option-value="id"
      option-label="name"
      emit-value
      map-options
      clearable
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Status é obrigatório!']" />

    <div class="col-12">
      <q-btn type="submit"
        class="float-right"
        style="min-width: 150px;"
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

const getStatus = async () => {
  try {
    const { data } = await api({ url: '/api/status' })
    statusOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => getStatus())

</script>
