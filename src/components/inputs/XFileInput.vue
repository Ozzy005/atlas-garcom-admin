<template>
  <q-file
    v-model="value"
    @rejected="onRejected"
    :rules="[val => true]"
    :accept="accept"
    :max-file-size="maxFileSize"
    :hint="`Formatos: ${accept} e Tamanho Máximo: ${maxFileSize / maxFileSize}MB permitido!`"
    lazy-rules="ondemand"
    class="col-xs-12"
    outlined
    clearable
    counter
  >
    <template v-slot:prepend>
      <q-icon name="attach_file" />
    </template>
    <template
      v-for="(_, slot) in $slots"
      :key="slot"
      v-slot:[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
        :key="slot"
      />
    </template>
  </q-file>
</template>

<script setup>
import { computed } from 'vue'
import notify from 'src/composables/notify'

const props = defineProps({
  modelValue: {
    type: [File, FileList],
    required: false
  },
  accept: {
    type: String,
    required: true
  },
  maxFileSize: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const onRejected = () => {
  notify.error(`Formatos: ${props.accept} e Tamanho Máximo: ${props.maxFileSize / props.maxFileSize}MB permitidos!`)
}
</script>
