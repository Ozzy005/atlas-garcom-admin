<template>
  <XFormGroup>

    <XNameInput
      v-model="form.name"
      :required="true"
    />

    <XEmailInput v-model="form.email" />

    <XBtnGroup>
      <q-space />
      <XSbtBtn />
    </XBtnGroup>

  </XFormGroup>
</template>

<script setup>
import { computed } from 'vue'
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XEmailInput from 'src/components/common/inputs/person/XEmailInput.vue'
import XNameInput from 'src/components/common/inputs/person/XNameInput.vue'
import XFormGroup from 'src/components/crud/XFormGroup.vue'
import XBtnGroup from 'src/components/crud/XBtnGroup.vue'

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
