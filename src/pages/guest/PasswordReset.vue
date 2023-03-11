<template>
  <q-page
    padding
    class="flex flex-center"
  >

    <q-card style="width: 500px;">
      <q-card-section>
        <div class="text-h6 text-center">Redefinição de senha</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submit">

          <q-input
            :type="isPwd ? 'password' : 'text'"
            label="Nova senha"
            clearable
            maxlength="100"
            lazy-rules="ondemand"
            v-model="form.password"
            :rules="[
              val => !!val || 'Nova senha é obrigatória!',
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

          <q-input
            :type="isPwdConfirm ? 'password' : 'text'"
            class="col-md-grow col-xs-12"
            label="Confirmação da senha"
            clearable
            maxlength="100"
            lazy-rules="ondemand"
            v-model="form.password_confirmation"
            :rules="[
              val => !!val || 'Confirmação da nova senha é obrigatória!',
              val => val.length >= 8 || 'Minímo 8 caracteres!',
              val => val === form.password || 'A senha não corresponde!'
            ]"
          >
            <template #append>
              <q-icon
                :name="isPwdConfirm ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwdConfirm = !isPwdConfirm"
              />
            </template>
          </q-input>

          <q-card-actions align="right">
            <XSbtBtn />
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
import { useRoute, useRouter } from 'vue-router'
import XSbtBtn from 'src/components/common/XSbtBtn.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref({
  token: route.params.token,
  email: route.query.email,
  password: null,
  password_confirmation: null
})

const isPwd = ref(true)
const isPwdConfirm = ref(true)

const submit = async () => {
  try {
    const { data } = await auth.resetPassword(form.value)
    router.push({ name: 'login' })
    notify.success(data.status)
  } catch (error) {
    notify.error(error)
  }
}
</script>
