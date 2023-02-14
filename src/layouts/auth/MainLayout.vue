<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen" />

        <q-toolbar-title>
          Atlas Garçom
        </q-toolbar-title>

        <q-btn-dropdown flat
          color="white"
          icon="person">
          <q-list>
            <q-item clickable
              v-close-popup
              @click="router.push({ name: 'profile' })">
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable
              v-close-popup
              @click="router.push({ name: 'change-password' })">
              <q-item-section>
                <q-item-label>Editar senha</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable
              v-close-popup
              @click="handleLogout">
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <DrawerDefault v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import DrawerDefault from './DrawerDefault.vue'

const router = useRouter()
const auth = useAuthStore()
const leftDrawerOpen = ref(false)

const handleLogout = () => {
  try {
    auth.logout()
    auth.isAuthenticated = false
    auth.user = null
    router.push({ name: 'login' })
  } catch (error) {
    notify.error(error)
    auth.isAuthenticated = false
    auth.user = null
    router.push({ name: 'login' })
  }
}
</script>
