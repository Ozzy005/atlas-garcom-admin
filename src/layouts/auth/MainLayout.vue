<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Atlas Garçom
        </q-toolbar-title>

        <q-btn
          round
          dense
          :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
          @click="darkMode.toggle()"
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

    <DrawerDefault v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDarkModeStore } from 'src/stores/darkMode'
import { useAuthStore } from 'src/stores/auth'
import { useEnumsStore } from 'src/stores/enums'
import { useRouter } from 'vue-router'
import notify from 'src/composables/notify'
import DrawerDefault from './DrawerDefault.vue'

const router = useRouter()
const darkMode = useDarkModeStore()
const auth = useAuthStore()
const enums = useEnumsStore()
const leftDrawerOpen = ref(false)

darkMode.initialize()

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

onMounted(() => enums.getEnums())

</script>
