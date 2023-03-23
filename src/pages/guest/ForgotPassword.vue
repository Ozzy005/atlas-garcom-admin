<template>
  <q-page
    padding
    class="flex flex-center"
  >

    <q-card style="width: 500px;">
      <q-card-section>
        <div class="text-h6 text-center">Enviar link de redefinição de senha</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submit">

          <XEmailInput
            v-model="form.email"
            :outlined="false"
          />

          <q-card-actions align="right">
            <XBackBtn :to="{ name: 'login' }" />
            <XSbtBtn
              :loading="loading"
              label="Enviar"
              icon="mdi-send"
            />
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
import XBackBtn from 'src/components/buttons/XBackBtn.vue'
import XSbtBtn from 'src/components/buttons/XSbtBtn.vue'
import XEmailInput from 'src/components/inputs/person/XEmailInput.vue'

const auth = useAuthStore()
const router = useRouter()

const loading = ref(false)
const form = ref({ email: null })

const submit = async () => {
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
