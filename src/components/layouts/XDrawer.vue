<template>
  <q-drawer
    v-model="drawer.drawerOpen"
    :breakpoint="1200"
    :mini-width="80"
    :mini="drawer.miniState"
    ref="drawerRef"
    show-if-above
    bordered
  >
    <div
      class="text-h6 text-center q-my-md cursor-pointer"
      @click="() => hideMiniMode(true, true)"
    >
      Menu
      <XTooltip
        v-if="drawer.miniState"
        label="Mostrar Menu"
        position="right"
      />
    </div>

    <q-separator />

    <q-list>
      <!-- Dashboard -->
      <q-item
        v-if="auth.hasPermissions(['dashboard_view'])"
        @click="() => hideMiniMode(false)"
        :to="{ name: 'dashboard' }"
        active-class="text-primary"
      >
        <q-item-section avatar>
          <q-icon name="dashboard" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Dashboard</q-item-label>
        </q-item-section>
        <XTooltip
          v-if="drawer.miniState"
          label="Dashboard"
          position="right"
        />
      </q-item>
      <!-- Pessoas -->
      <q-expansion-item
        v-if="auth.hasPermissions(['tenants_view'])"
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
                :color="people.includes($route.name) ? 'primary' : ''"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section :class="people.includes($route.name) ? 'text-primary' : ''">
            Pessoas
          </q-item-section>
          <XTooltip
            v-if="drawer.miniState"
            label="Pessoas"
            position="right"
          />
        </template>
        <q-list>
          <!-- Contratantes -->
          <q-item
            v-if="auth.hasPermissions(['tenants_view'])"
            :to="{ name: 'tenants-list' }"
            :inset-level="0.5"
            active-class="text-primary"
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
          'due-days_view',
          'categories_view',
          'complements_view'
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
                :color="operational.includes($route.name) ? 'primary' : ''"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section :class="operational.includes($route.name) ? 'text-primary' : ''">
            Operacional
          </q-item-section>

          <XTooltip
            v-if="drawer.miniState"
            label="Operacional"
            position="right"
          />
        </template>
        <q-list>
          <!-- Assinaturas -->
          <q-item
            v-if="auth.hasPermissions(['signatures_view'])"
            :to="{ name: 'signatures-list' }"
            :inset-level="0.5"
            active-class="text-primary"
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
            active-class="text-primary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-calendar-multiselect" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Dias de<br>Vencimento</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Categorias -->
          <q-item
            v-if="auth.hasPermissions(['categories_view']) && auth.isTenantOrTenantEmployee"
            :to="{ name: 'categories-list' }"
            :inset-level="0.5"
            active-class="text-primary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-view-column" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Categorias</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Produtos -->
          <q-item
            v-if="auth.hasPermissions(['products_view']) && auth.isTenantOrTenantEmployee"
            :to="{ name: 'products-list' }"
            :inset-level="0.5"
            active-class="text-primary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-cart" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Produtos</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Complementos -->
          <q-item
            v-if="auth.hasPermissions(['complements_view']) && auth.isTenantOrTenantEmployee"
            :to="{ name: 'complements-list' }"
            :inset-level="0.5"
            active-class="text-primary"
          >
            <q-item-section avatar>
              <q-icon name="mdi-cart-plus" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Complementos</q-item-label>
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
                :color="general.includes($route.name) ? 'primary' : ''"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section :class="general.includes($route.name) ? 'text-primary' : ''">
            Geral
          </q-item-section>

          <XTooltip
            v-if="drawer.miniState"
            label="Geral"
            position="right"
          />
        </template>
        <q-list>
          <!-- Métodos de Pagamento -->
          <q-item
            v-if="auth.hasPermissions(['payment-methods_view'])"
            :to="{ name: 'payment-methods-list' }"
            :inset-level="0.5"
            active-class="text-primary"
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
            active-class="text-primary"
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
            active-class="text-primary"
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
            active-class="text-primary"
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
            active-class="text-primary"
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
                :color="management.includes($route.name) ? 'primary' : ''"
              />
            </q-avatar>
          </q-item-section>

          <q-item-section :class="management.includes($route.name) ? 'text-primary' : ''">
            Gerenciamento
          </q-item-section>

          <XTooltip
            v-if="drawer.miniState"
            label="Gerenciamento"
            position="right"
          />
        </template>
        <q-list>
          <!-- Usuários -->
          <q-item
            v-if="auth.hasPermissions(['users_view'])"
            :to="{ name: 'users-list' }"
            :inset-level="0.5"
            active-class="text-primary"
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
            active-class="text-primary"
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
            active-class="text-primary"
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
      <XBtn
        @click="showMiniMode"
        tooltip-label="Esconder Menu"
        icon="chevron_left"
        dense
        round
        unelevated
      />
    </div>
  </q-drawer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useDrawerStore } from 'src/stores/drawer'
import XTooltip from 'src/components/others/XTooltip.vue'
import XBtn from 'src/components/buttons/XBtn.vue'
import { useRoute } from 'vue-router'

const drawer = useDrawerStore()
const auth = useAuthStore()
const route = useRoute()
const drawerRef = ref()
const peopleExpansionItemRef = ref()
const operationalExpansionItemRef = ref()
const generalExpansionItemRef = ref()
const managementExpansionItemRef = ref()

const people = [
  'tenants-list',
  'tenants-create',
  'tenants-view',
  'tenants-edit'
]

const operational = [
  'signatures-list',
  'signatures-create',
  'signatures-view',
  'signatures-edit',
  'due-days-list',
  'due-days-create',
  'due-days-view',
  'due-days-edit',
  'categories-list',
  'categories-create',
  'categories-view',
  'categories-edit',
  'products-list',
  'products-create',
  'products-view',
  'products-edit',
  'complements-list',
  'complements-create',
  'complements-view',
  'complements-edit'
]

const general = [
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
  'cities-view'
]

const management = [
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
]

const showMiniMode = () => {
  drawer.miniState = true
  if (peopleExpansionItemRef.value) {
    peopleExpansionItemRef.value.hide()
  }
  if (operationalExpansionItemRef.value) {
    operationalExpansionItemRef.value.hide()
  }
  if (generalExpansionItemRef.value) {
    generalExpansionItemRef.value.hide()
  }
  if (managementExpansionItemRef.value) {
    managementExpansionItemRef.value.hide()
  }
}

const hideMiniMode = (hide = true, expand = false) => {
  if (drawer.miniState && hide) {
    drawer.miniState = false
    if (expand) {
      expandSelectedItem()
    }
  }
}

const expandSelectedItem = () => {
  if (!drawer.miniState) {
    if (people.includes(route.name)) {
      peopleExpansionItemRef.value.show()
    } else if (operational.includes(route.name)) {
      operationalExpansionItemRef.value.show()
    } else if (general.includes(route.name)) {
      generalExpansionItemRef.value.show()
    } else if (management.includes(route.name)) {
      managementExpansionItemRef.value.show()
    }
  }
}

onMounted(() => {
  expandSelectedItem()
})

</script>
