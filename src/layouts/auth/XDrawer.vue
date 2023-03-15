<template>
  <q-drawer
    v-model="leftDrawerOpen"
    :breakpoint="1200"
    :mini-width="80"
    :mini="miniState"
    ref="drawerRef"
    show-if-above
    elevated
  >
    <div
      class="text-h6 text-center q-my-md cursor-pointer"
      @click="() => hideMiniMode()"
    >
      Menu
    </div>

    <q-separator />

    <q-list>
      <!-- Dashboard -->
      <q-item
        v-show="auth.hasPermissions(['dashboard_view'])"
        @click="() => hideMiniMode(false)"
        :to="{ name: 'dashboard' }"
        active-class="text-secondary"
      >
        <q-item-section avatar>
          <q-icon name="dashboard" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
        <q-tooltip
          v-if="miniState"
          :offset="[10, 10]"
          class="fs-14"
          anchor="center right"
          self="center left"
        >
          Dashboard
        </q-tooltip>
      </q-item>
      <!-- Pessoas -->
      <q-expansion-item
        v-show="auth.hasPermissions(['tenants_view'])"
        @click="() => hideMiniMode()"
        ref="peopleExpansionItemRef"
        group="menu"
      >
        <template #header>
          <q-item-section avatar>
            <q-avatar>
              <q-icon
                name="mdi-account-group"
                size="sm"
                :color="[
                  'tenants-list',
                  'tenants-create',
                  'tenants-view',
                  'tenants-edit'
                ].includes($route.name) ? 'secondary' : ''"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section :class="[
            'tenants-list',
            'tenants-create',
            'tenants-view',
            'tenants-edit'
          ].includes($route.name) ? 'text-secondary' : ''">
            Pessoas
          </q-item-section>
          <q-tooltip
            v-if="miniState"
            :offset="[10, 10]"
            class="fs-14"
            anchor="center right"
            self="center left"
          >
            Pessoas
          </q-tooltip>
        </template>
        <q-list>
          <!-- Contratantes -->
          <q-item
            v-show="auth.hasPermissions(['tenants_view'])"
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
        v-show="auth.hasPermissions([
          'signatures_view',
          'due-days_view'
        ])"
        @click="() => hideMiniMode()"
        ref="operationalExpansionItemRef"
        group="menu"
      >
        <template #header>
          <q-item-section avatar>
            <q-avatar>
              <q-icon
                name="mdi-sitemap"
                size="sm"
                :color="[
                  'signatures-list',
                  'signatures-create',
                  'signatures-view',
                  'signatures-edit',
                  'due-days-list',
                  'due-days-create',
                  'due-days-view',
                  'due-days-edit'
                ].includes($route.name) ? 'secondary' : ''"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section :class="[
            'signatures-list',
            'signatures-create',
            'signatures-view',
            'signatures-edit',
            'due-days-list',
            'due-days-create',
            'due-days-view',
            'due-days-edit'
          ].includes($route.name) ? 'text-secondary' : ''">
            Operacional
          </q-item-section>

          <q-tooltip
            v-if="miniState"
            :offset="[10, 10]"
            class="fs-14"
            anchor="center right"
            self="center left"
          >
            Operacional
          </q-tooltip>
        </template>
        <q-list>
          <!-- Assinaturas -->
          <q-item
            v-show="auth.hasPermissions(['signatures_view'])"
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
            v-show="auth.hasPermissions(['due-days_view'])"
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
        v-show="auth.hasPermissions([
          'payment-methods_view',
          'measurement-units_view',
          'ncms_view',
          'states_view',
          'cities_view'
        ])"
        @click="() => hideMiniMode()"
        ref="generalExpansionItemRef"
        group="menu"
      >
        <template #header>
          <q-item-section avatar>
            <q-avatar>
              <q-icon
                name="mdi-menu"
                size="sm"
                :color="[
                  'payment-methods-list',
                  'payment-methods-create',
                  'payment-methods-view',
                  'payment-methods-edit',
                  'measurement-units-list',
                  'measurement-units-create',
                  'measurement-units-view',
                  'measurement-units-edit',
                  'ncms-list',
                  'ncms-view',
                  'states-list',
                  'states-view',
                  'cities-list',
                  'cities-view',
                ].includes($route.name) ? 'secondary' : ''"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section :class="[
            'payment-methods-list',
            'payment-methods-create',
            'payment-methods-view',
            'payment-methods-edit',
            'measurement-units-list',
            'measurement-units-create',
            'measurement-units-view',
            'measurement-units-edit',
            'ncms-list',
            'ncms-view',
            'states-list',
            'states-view',
            'cities-list',
            'cities-view',
          ].includes($route.name) ? 'text-secondary' : ''">
            Geral
          </q-item-section>

          <q-tooltip
            v-if="miniState"
            :offset="[10, 10]"
            class="fs-14"
            anchor="center right"
            self="center left"
          >
            Geral
          </q-tooltip>
        </template>
        <q-list>
          <!-- Métodos de Pagamento -->
          <q-item
            v-show="auth.hasPermissions(['payment-methods_view'])"
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
            v-show="auth.hasPermissions(['measurement-units_view'])"
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
            v-show="auth.hasPermissions(['ncms_view'])"
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
            v-show="auth.hasPermissions(['states_view'])"
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
            v-show="auth.hasPermissions(['cities_view'])"
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
        v-show="auth.hasPermissions([
          'users_view',
          'roles_view',
          'permissions_view'
        ])"
        @click="() => hideMiniMode()"
        ref="managementExpansionItemRef"
        group="menu"
      >
        <template #header>
          <q-item-section avatar>
            <q-avatar>
              <q-icon
                name="mdi-account-cog"
                size="sm"
                :color="[
                  'users-list',
                  'users-create',
                  'users-view',
                  'users-edit',
                  'roles-list',
                  'roles-create',
                  'roles-view',
                  'roles-edit',
                  'permissions-list',
                  'permissions-view',
                  'permissions-edit'
                ].includes($route.name) ? 'secondary' : ''"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section :class="[
            'users-list',
            'users-create',
            'users-view',
            'users-edit',
            'roles-list',
            'roles-create',
            'roles-view',
            'roles-edit',
            'permissions-list',
            'permissions-view',
            'permissions-edit'
          ].includes($route.name) ? 'text-secondary' : ''">
            Gerenciamento
          </q-item-section>

          <q-tooltip
            v-if="miniState"
            :offset="[10, 10]"
            class="fs-14"
            anchor="center right"
            self="center left"
          >
            Gerenciamento
          </q-tooltip>
        </template>
        <q-list>
          <!-- Usuários -->
          <q-item
            v-show="auth.hasPermissions(['users_view'])"
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
            v-show="auth.hasPermissions(['roles_view'])"
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
            v-show="auth.hasPermissions(['permissions_view'])"
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
        @click="showMiniMode"
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
const drawerRef = ref()
const miniState = ref(true)
const peopleExpansionItemRef = ref()
const operationalExpansionItemRef = ref()
const generalExpansionItemRef = ref()
const managementExpansionItemRef = ref()

const showMiniMode = () => {
  miniState.value = true
  peopleExpansionItemRef.value.hide()
  operationalExpansionItemRef.value.hide()
  generalExpansionItemRef.value.hide()
  managementExpansionItemRef.value.hide()
}

const hideMiniMode = (hide = true) => {
  if (miniState.value && hide) {
    miniState.value = false
  }
}

</script>
