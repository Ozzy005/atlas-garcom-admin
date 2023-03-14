<template>
  <q-page padding>
    <q-card class="column q-gap-lg q-pa-md">
      <XHeader
        :crud="crud"
        :model="model"
      />
      <q-form
        @submit="submit"
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
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import XHeader from 'src/components/crud/XHeader.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  crud: {
    type: String,
    required: true
  },
  model: {
    type: String,
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

const FormPage = defineAsyncComponent(() => import(`../../pages/auth/${props.model}/FormPage.vue`))
const router = useRouter()
const formRef = ref()

const submit = async () => {
  try {
    const { data } = await api({ method: 'post', url: `/api/${props.model}`, data: form.value })
    router.push({ name: props.afterSavingGoTo ?? `${props.model}-list` })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
