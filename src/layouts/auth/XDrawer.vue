<template>
  <q-drawer
    v-model="leftDrawerOpen"
    :breakpoint="1200"
    :mini-width="80"
    :mini="!leftDrawerOpen || miniState"
    @click.capture="drawerClick"
    show-if-above
    elevated
  >
    <div class="text-h6 text-center q-my-md">Menu</div>

    <q-separator />

    <q-list>
      <!-- Dashboard -->
      <q-item
        v-if="auth.hasPermissions(['dashboard_view'])"
        :to="{ name: 'dashboard' }"
        active-class="text-secondary"
      >
        <q-item-section avatar>
          <q-icon name="dashboard" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
      </q-item>
      <!-- Pessoas -->
      <q-expansion-item
        v-if="auth.hasPermissions(['tenants_view'])"
        icon="mdi-account-group"
        label="Pessoas"
        group="menu"
      >
        <q-list>
          <!-- Contratantes -->
          <q-item
            v-if="auth.hasPermissions(['tenants_view'])"
            :to="{ name: 'tenants-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-account-tie" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Contratantes</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <!-- Operacional -->
      <q-expansion-item
        v-if="auth.hasPermissions([
          'signatures_view',
          'due-days_view'
        ])"
        icon="mdi-sitemap"
        label="Operacional"
        group="menu"
      >
        <q-list>
          <!-- Assinaturas -->
          <q-item
            v-if="auth.hasPermissions(['signatures_view'])"
            :to="{ name: 'signatures-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-file-document" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Assinaturas</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Dias de Vencimento -->
          <q-item
            v-if="auth.hasPermissions(['due-days_view'])"
            :to="{ name: 'due-days-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-calendar-multiselect" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dias de<br>Vencimento</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <!-- Geral -->
      <q-expansion-item
        v-if="auth.hasPermissions([
          'payment-methods_view',
          'measurement-units_view',
          'ncms_view',
          'states_view',
          'cities_view'
        ])"
        icon="mdi-menu"
        label="Geral"
        group="menu"
      >
        <q-list>
          <!-- Métodos de Pagamento -->
          <q-item
            v-if="auth.hasPermissions(['payment-methods_view'])"
            :to="{ name: 'payment-methods-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-wallet" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Métodos de<br>Pagamento</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Unidades de Medida -->
          <q-item
            v-if="auth.hasPermissions(['measurement-units_view'])"
            :to="{ name: 'measurement-units-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-ruler" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Unidades de<br>Medida</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Ncms -->
          <q-item
            v-if="auth.hasPermissions(['ncms_view'])"
            :to="{ name: 'ncms-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-tag" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Ncms</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Estados -->
          <q-item
            v-if="auth.hasPermissions(['states_view'])"
            :to="{ name: 'states-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-diving-scuba-flag" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Estados</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Cidades -->
          <q-item
            v-if="auth.hasPermissions(['cities_view'])"
            :to="{ name: 'cities-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-city" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cidades</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <!-- Gerenciamento -->
      <q-expansion-item
        v-if="auth.hasPermissions([
          'users_view',
          'roles_view',
          'permissions_view'
        ])"
        icon="mdi-account-cog"
        label="Gerenciamento"
        group="menu"
      >
        <q-list>
          <!-- Usuários -->
          <q-item
            v-if="auth.hasPermissions(['users_view'])"
            :to="{ name: 'users-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-account-supervisor" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Usuários</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Atribuições/Módulos -->
          <q-item
            v-if="auth.hasPermissions(['roles_view'])"
            :to="{ name: 'roles-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-account-lock" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Atribuições<br>/Módulos</q-item-label>
            </q-item-section>
          </q-item>
          <!--Permissões -->
          <q-item
            v-if="auth.hasPermissions(['permissions_view'])"
            :to="{ name: 'permissions-list' }"
            :inset-level="0.5"
            active-class="text-secondary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-lock" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Permissões</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
    <div
      class="q-mini-drawer-hide absolute"
      style="top: 15px; right: -17px"
    >
      <q-btn
        dense
        round
        unelevated
        color="primary"
        icon="chevron_left"
        @click="miniState = true"
      />
    </div>
  </q-drawer>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const leftDrawerOpen = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const auth = useAuthStore()
const miniState = ref(true)

const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false
    e.stopPropagation()
  }
}
</script>
