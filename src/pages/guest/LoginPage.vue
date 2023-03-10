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

          <q-input
            type="email"
            label="Email"
            clearable
            maxlength="100"
            lazy-rules="ondemand"
            v-model="form.email"
            :rules="[val => !!val || 'Email é obrigatório!']"
          />

          <q-input
            :type="isPwd ? 'password' : 'text'"
            label="Senha"
            clearable
            maxlength="100"
            lazy-rules="ondemand"
            v-model="form.password"
            :rules="[
              val => !!val || 'Senha é obrigatória!',
              val => val.length >= 8 || 'Minímo 8 caracteres!',
            ]"
          >
            <template #append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-checkbox
            v-model="auth.rememberMe"
            label="Lembrar-me"
          />

          <q-card-actions align="right">
            <q-btn
              style="min-width: 150px;"
              label="Esqueceu sua senha?"
              no-caps
              flat
              :to="{ name: 'forgot-password' }"
            />
            <q-btn
              type="submit"
              style="min-width: 150px;"
              label="Entrar"
              color="primary"
              no-caps
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

const auth = useAuthStore()
const router = useRouter()

const form = ref(JSON.parse(JSON.stringify(auth.userLogin)))

const isPwd = ref(true)

const submit = async () => {
  try {
    await auth.login(form.value)
    router.push({ name: 'dashboard' })
  } catch (error) {
    notify.error(error)
  }
}
</script>
