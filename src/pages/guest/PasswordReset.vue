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

          <XPwdInput
            v-model="form.password"
            :outlined="false"
            label="Nova senha"
          />

          <XPwdInput
            v-model="form.password_confirmation"
            :rules="[val => val === form.password || 'A senha não corresponde!']"
            :outlined="false"
            label="Confirmação da senha"
          />

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
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XPwdInput from 'src/components/common/inputs/XPwdInput.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref({
  token: route.params.token,
  email: route.query.email,
  password: null,
  password_confirmation: null
})

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
