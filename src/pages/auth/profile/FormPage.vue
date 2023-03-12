<template>
  <div class="row q-gap-y-sm">

    <XNameInput
      v-model="form.name"
      :required="true"
    />

    <XEmailInput v-model="form.email" />

    <div class="col-12">
      <XSbtBtn class="float-right" />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XEmailInput from 'src/components/common/inputs/person/XEmailInput.vue'
import XNameInput from 'src/components/common/inputs/person/XNameInput.vue'

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
