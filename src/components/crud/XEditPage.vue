<template>
  <q-page padding>
    <q-card class="column q-gap-lg q-pa-md">
      <XHeader
        :crud="crud"
        :model="model"
        :return-to="returnTo"
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
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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
  },
  routeHasParameter: {
    type: Boolean,
    default: true
  },
  returnTo: String,
  afterSavingGoTo: String,
  fetchItem: {
    type: Boolean,
    default: true
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
const route = useRoute()
const formRef = ref()

const getItem = async () => {
  try {
    const url = props.routeHasParameter ? `/api/${props.model}/${route.params.id}` : `/api/${props.model}`
    const { data } = await api({ url })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

const submit = async () => {
  try {
    const url = props.routeHasParameter ? `/api/${props.model}/${route.params.id}` : `/api/${props.model}`
    const { data } = await api({ method: 'put', url, data: form.value })
    router.push({ name: props.afterSavingGoTo ?? `${props.model}-list` })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  if (props.fetchItem) {
    getItem()
  }
})

</script>
