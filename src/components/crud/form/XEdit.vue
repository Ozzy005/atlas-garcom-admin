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
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import XBackBtn from 'src/components/buttons/XBackBtn.vue'
import { useRouter } from 'vue-router'

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
  apiGet: {
    type: String,
    required: false
  },
  apiGetParams: {
    type: Object,
    required: false
  },
  apiPut: {
    type: String,
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
  },
  getItemFunction: {
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

const getItem = async () => {
  try {
    const { data } = await api({ url: props.apiGet, params: props.apiGetParams })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const submit = async () => {
  try {
    const { data } = await api({
      method: 'put',
      url: props.apiPut,
      data: form.value
    })
    if (props.redirectTo) {
      router.push({ name: props.redirectTo })
    }
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  if (props.apiGet) {
    props.getItemFunction ? props.getItemFunction() : getItem()
  }
})

</script>
