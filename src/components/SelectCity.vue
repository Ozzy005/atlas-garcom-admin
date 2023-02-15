<template>
  <q-select v-model="cityId"
    :loading="loading"
    :options="options"
    @filter="filterCity"
    class="col-md-grow col-xs-12"
    label="Cidade"
    hint="Digite três ou mais caracteres..."
    input-debounce="300"
    option-value="id"
    option-label="info"
    emit-value
    map-options
    use-input
    clearable
    lazy-rules="ondemand"
    :rules="[val => !!val || !required || 'Cidade é obrigatória!']" />
</template>

<script setup>
import { ref, computed } from 'vue'
import notify from 'src/composables/notify'
import { api } from 'src/boot/axios'

const props = defineProps({
  modelValue: {
    type: Number,
    required: false
  },
  optionsDefault: {
    type: Array,
    required: false
  },
  required: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const cityId = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const loading = ref(false)
const cities = ref(null)
const options = ref(null)

setTimeout(() => { options.value = props.optionsDefault }, 500)

const filterCity = async (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }

  try {
    loading.value = true
    const { data } = await api({ url: '/api/cities', params: { search: val } })
    cities.value = data.data
  } catch (error) {
    notify.error(error)
    abort()
    return
  }

  update(() => {
    options.value = cities.value
    loading.value = false
  })
}
</script>
