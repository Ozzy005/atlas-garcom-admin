<template>
  <q-layout view="hHh Lpr lff">
    <q-header bordered>
      <q-toolbar>
        <XBtn
          @click="drawer.drawerOpen = !drawer.drawerOpen"
          aria-label="Menu"
          icon="menu"
          color="white"
          flat
          dense
          round
        />

        <q-toolbar-title>
          Atlas Garçom
        </q-toolbar-title>

        <XBtn
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          :tooltip-label="$q.fullscreen.isActive ? 'Sair do modo fullscreen' : 'Colocar em modo fullscreen'"
          color="white"
          flat
        />

        <XBtn
          @click="darkMode.toggle()"
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          :tooltip-label="$q.dark.isActive ? 'Sair do modo escuro' : 'Colocar em modo escuro'"
          color="white"
          flat
        />

        <q-btn-dropdown
          flat
          color="white"
          icon="person"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="router.push({ name: 'profile' })"
            >
              <q-item-section>
                <q-item-label>Perfil</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="router.push({ name: 'change-password' })"
            >
              <q-item-section>
                <q-item-label>Editar senha</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              @click="logout"
            >
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <XDrawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDarkModeStore } from 'src/stores/darkMode'
import { useAuthStore } from 'src/stores/auth'
import { useEnumsStore } from 'src/stores/enums'
import { useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import XDrawer from 'src/components/layouts/XDrawer.vue'
import XBtn from 'src/components/buttons/XBtn.vue'
import { useDrawerStore } from 'src/stores/drawer'

const router = useRouter()
const drawer = useDrawerStore()
const darkMode = useDarkModeStore()
const auth = useAuthStore()
const enums = useEnumsStore()

darkMode.initialize()

onMounted(() => {
  auth.getPermissions()
  enums.getEnums()
})

const logout = () => {
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
