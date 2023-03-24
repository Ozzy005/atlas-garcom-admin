<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <div class="row justify-between items-center q-gap-md">
        <div class="text-h6">{{ title }}</div>
        <XBackBtn :to="returnTo" />
      </div>
      <div class="row q-gap-md q-mt-lg">
        <slot />
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import XBackBtn from 'src/components/buttons/XBackBtn.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  apiGet: {
    type: String,
    required: true
  },
  apiGetParams: {
    type: String,
    required: false
  },
  returnTo: {
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

const route = useRoute()

const getItem = async () => {
  try {
    const { data } = await api({ url: `/api/${props.apiGet}/${route.params.id}`, params: props.apiGetParams })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getItem()
})

</script>
