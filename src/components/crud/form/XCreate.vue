<template>
  <q-page padding>
    <q-card class="column q-gap-lg q-pa-md">
      <div class="row justify-between items-center q-gap-md">
        <div class="text-h6">{{ title }}</div>
        <XBackBtn
          v-if="returnTo"
          :to="returnTo"
        />
      </div>
      <q-form
        @submit="!!submitFunction ? submitFunction() : submit()"
        ref="formRef"
      >
        <FormPage
          v-model="form"
          :form-ref="formRef"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, isProxy, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import XBackBtn from 'src/components/buttons/XBackBtn.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  pathForm: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  apiPost: {
    tpye: String,
    required: true
  },
  returnTo: {
    type: Object,
    required: false
  },
  redirectTo: {
    type: String,
    required: false
  },
  submitFunction: {
    type: Function,
    required: false
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

const FormPage = defineAsyncComponent(() => import(`../../../pages/auth/${props.pathForm}/FormPage.vue`))
const router = useRouter()
const formRef = ref()

const submit = async () => {
  try {
    const formData = new FormData()
    for (const [key, value] of Object.entries(form.value)) {
      if (isProxy(value)) {
        toRaw(value).forEach((v, i) => formData.append(`${key}[${i}]`, v))
      } else if (Array.isArray(form.value)) {
        value.forEach((v, i) => formData.append(`${key}[${i}]`, v))
      } else {
        formData.append(key, value ?? '')
      }
    }
    const { data } = await api({
      method: 'post',
      url: props.apiPost,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    if (props.redirectTo) {
      router.push({ name: props.redirectTo })
    }
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
