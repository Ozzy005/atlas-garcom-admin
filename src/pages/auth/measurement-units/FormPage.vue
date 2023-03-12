<template>
  <div class="row q-gap-x-md q-gap-y-sm">

    <XInput
      v-model="form.name"
      :rules="[val => !!val || 'Nome é obrigatório!']"
      class="col-md-grow"
      label="Nome"
      maxlength="30"
    />

    <XInput
      v-model="form.initials"
      :rules="[val => !!val || 'Iniciais é obrigatória!']"
      class="col-md-grow"
      label="Iniciais"
      maxlength="10"
    />

    <XEnumSelect
      v-model="form.status"
      :rules="[val => !!val || 'Status é obrigatório!']"
      class="col-md-grow"
      label="Status"
      enum-name="status"
    />

    <div class="col-12">
      <XSbtBtn class="float-right" />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XInput from 'src/components/common/inputs/XInput.vue'
import XEnumSelect from 'src/components/common/inputs/XEnumSelect.vue'

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

</script>
