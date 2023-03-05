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
import { ref } from 'vue'
import FormPage from './FormPage.vue'
import { useRouter } from 'vue-router'
import HeaderDefault from 'src/components/crud/HeaderDefault.vue'
import { api } from 'src/boot/axios'

const router = useRouter()

const form = ref({
  name: null,
  initials: null,
  status: null
})

const handleSubmit = async () => {
  try {
    const { data } = await api({ method: 'post', url: '/api/measurement-units', data: form.value })
    router.push({ name: 'measurement-units' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
