<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <HeaderDefault crud="Unidades de Medida"
        model="measurement-units" />
      <div class="q-mt-md">
        <q-form @submit="handleSubmit">
          <FormPage v-model="form" />
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import FormPage from './FormPage.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'

const router = useRouter()
const route = useRoute()

const form = ref({
  name: null,
  initials: null,
  status: null
})

const handleGetItem = async () => {
  try {
    const { data } = await api({ url: `/api/measurement-units/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => handleGetItem())

const handleSubmit = async () => {
  try {
    const { data } = await api({
      method: 'put',
      url: `/api/measurement-units/${route.params.id}`,
      data: form.value
    })
    router.push({ name: 'measurement-units' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
