<template>
  <q-page
    padding
    class="flex flex-center"
  >

    <q-card style="width: 500px;">
      <q-card-section>
        <div class="text-h6 text-center">Login</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submit">

          <XEmailInput
            v-model="form.email"
            :outlined="false"
          />

          <XPwdInput
            v-model="form.password"
            :outlined="false"
            label="Senha"
          />

          <q-checkbox
            v-model="auth.rememberMe"
            label="Lembrar-me"
          />

          <q-card-actions align="right">
            <XBtn
              :to="{ name: 'forgot-password' }"
              label="Esqueceu sua senha?"
              flat
            />
            <XSbtBtn
              label="Entrar"
              icon="mdi-login"
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
import XSbtBtn from 'src/components/buttons/XSbtBtn.vue'
import XBtn from 'src/components/buttons/XBtn.vue'
import XPwdInput from 'src/components/inputs/XPwdInput.vue'
import XEmailInput from 'src/components/inputs/person/XEmailInput.vue'

const auth = useAuthStore()
const router = useRouter()

const form = ref(JSON.parse(JSON.stringify(auth.userLogin)))

const submit = async () => {
  try {
    await auth.login(form.value)
    router.push({ name: 'dashboard' })
  } catch (error) {
    notify.error(error)
  }
}
</script>
