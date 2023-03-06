<template>
  <q-page padding>
    <q-card class="q-pa-lg">
      <HeaderDefault crud="Atribuições"
        model="roles" />
      <div class="q-mt-md">
        <q-form @submit="submit">
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
  description: null,
  permission_ids: []
})

const submit = async () => {
  try {
    const { data } = await api({ method: 'post', url: '/api/roles', data: form.value })
    router.push({ name: 'roles' })
    notify.success(data.message)
  } catch (error) {
    notify.error(error)
  }
}

</script>
