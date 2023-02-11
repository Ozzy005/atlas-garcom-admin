<template>
  <q-page padding
    class="flex flex-center">

    <q-card style="width: 500px;">
      <q-card-section>
        <div class="text-h6 text-center">Login</div>
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

          <q-input :type="isPwd ? 'password' : 'text'"
            label="Senha"
            clearable
            maxlength="100"
            lazy-rules="ondemand"
            v-model="form.password"
            :rules="[
              val => !!val || 'Senha é obrigatória !',
              val => val.length >= 8 || 'Minímo 8 caracteres !',
            ]">
            <template #append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>

          <q-card-actions align="center">
            <q-btn type="submit"
              style="min-width: 120px;"
              label="Entrar"
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
import { useStorageStore } from 'src/stores/storage'
import { useRouter } from 'vue-router'

const store = useStorageStore()
const router = useRouter()

const form = ref({
  email: null,
  password: null
})

const isPwd = ref(true)

const handleSubmit = async () => {
  try {
    await store.login(form.value)
    router.push({ name: 'home' })
  } catch (error) {
    notify.error(error)
  }
}
</script>
