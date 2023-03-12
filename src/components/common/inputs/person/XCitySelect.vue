<template>
  <XSelect
    v-model="cityId"
    @filter="filterCity"
    :rules="[val => !!val || !required || 'Cidade é obrigatório!']"
    :loading="loading"
    :options="options"
    label="Cidade"
    hint="Digite três ou mais caracteres..."
    option-label="info"
    input-debounce="300"
    use-input
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import notify from 'src/composables/notify'
import { api } from 'src/boot/axios'
import XSelect from '../XSelect.vue'

const props = defineProps({
  modelValue: Number,
  cities: {
    type: Array,
    default: () => []
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
const options = ref([])

setTimeout(() => { options.value = props.cities }, 300)

const filterCity = (val, update, abort) => {
  if (val.length < 3) {
    abort()
    return
  }

  update(async () => {
    try {
      loading.value = true
      const { data } = await api({ url: '/api/cities', params: { search: val } })
      options.value = data.data
      loading.value = false
    } catch (error) {
      notify.error(error)
      abort()
    }
  })
}
</script>
