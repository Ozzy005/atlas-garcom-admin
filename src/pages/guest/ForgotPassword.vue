<template>
  <q-page padding
    class="flex flex-center">

    <q-card style="width: 500px;">
      <q-card-section>
        <div class="text-h6 text-center">Enviar link de redefinição de senha</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="handleSubmit">

          <q-input type="email"
            label="Email"
            clearable
            maxlength="100"
            lazy-rules="ondemand"
            v-model="form.email"
            :rules="[val => !!val || 'Email é obrigatório !']" />

          <q-card-actions align="right">
            <q-btn style="min-width: 120px;"
              label="Voltar"
              color="secondary"
              no-caps
              :to="{ name: 'login' }" />
            <q-btn :loading="loading"
              type="submit"
              style="min-width: 120px;"
              label="Confirmar"
              color="primary"
              no-caps />
          </q-card-actions>

        </q-form>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import notify from 'src/composables/notify'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const loading = ref(false)
const form = ref({ email: null })

const handleSubmit = async () => {
  try {
    loading.value = true
    const { data } = await auth.forgotPassword(form.value)
    loading.value = false
    router.push({ name: 'login' })
    notify.success(data.status)
  } catch (error) {
    notify.error(error)
  }
}
</script>
