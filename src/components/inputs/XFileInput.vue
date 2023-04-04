<template>
  <q-file
    v-model="file"
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
import helpers from 'src/utils/helpers'

const props = defineProps({
  fileValue: {
    type: [File, FileList],
    required: false
  },
  imageValue: {
    type: String,
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

const emit = defineEmits(['update:fileValue', 'update:imageValue'])

const file = computed({
  get () {
    return props.fileValue
  },
  set (value) {
    helpers.toBase64(value).then(base64 => {
      image.value = base64
    })
    emit('update:fileValue', value)
  }
})

const image = computed({
  get () {
    return props.imageValue
  },
  set (value) {
    emit('update:imageValue', value)
  }
})

const onRejected = () => {
  notify.error(`Formatos: ${props.accept} e Tamanho Máximo: ${props.maxFileSize / props.maxFileSize}MB permitidos!`)
}
</script>
