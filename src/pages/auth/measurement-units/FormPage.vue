<template>
  <div class="row q-gap-x-md q-gap-y-sm">

    <q-input v-model="form.name"
      class="col-md-grow col-xs-12"
      label="Nome"
      outlined
      clearable
      maxlength="30"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Nome é obrigatório!']" />

    <q-input v-model="form.initials"
      class="col-md-grow col-xs-12"
      label="Iniciais"
      outlined
      clearable
      maxlength="10"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Iniciais é obrigatória!']" />

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
        style="min-width: 120px;"
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

const handleGetStatus = async () => {
  try {
    const { data } = await api({ url: '/api/status' })
    statusOptions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => handleGetStatus())

</script>
