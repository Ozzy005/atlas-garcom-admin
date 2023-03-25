<template>
  <div class="row items-center q-gap-md">

    <q-input
      v-model="xList.filter"
      :placeholder="xList.filterPlaceholder"
      class="col-md-grow col-xs-12"
      debounce="300"
      dense
      outlined
      clearable
    >
      <template #append>
        <q-icon name="search" />
      </template>
    </q-input>

    <q-space />

    <div class="col-md-auto col-xs-12 row q-gap-sm">
      <XBtn
        @click="xList.tableRef.requestServerInteraction()"
        :loading="xList.tableLoadingMode"
        icon="mdi-reload"
        tooltip-label="Atualizar registros"
        tooltip-position="top"
        dense
      />
      <XBtn
        @click="xList.toggleFullscreenMode()"
        :icon="xList.fullscreenModeIcon"
        :tooltip-label="xList.fullscreenModeTooltipLabel"
        tooltip-position="top"
        dense
      />
      <XBtn
        @click="xList.toggleGridMode()"
        :tooltip-label="xList.gridModeTooltipLabel"
        tooltip-position="top"
        icon="mdi-grid"
        dense
      />
      <q-fab
        v-model="xList.actionsButtonStatus"
        :class="$q.screen.lt.md ? 'order-first' : ''"
        color="primary"
        icon="keyboard_arrow_down"
        direction="down"
        padding="sm"
        square
      >
        <template #tooltip>
          <XTooltip
            label="Ações"
            position="top"
          />
        </template>
        <q-fab-action
          :to="{ name: `${xList.routeGroupName}-create` }"
          v-if="auth.hasPermission(`${xList.permissionsGroupName}_create`)"
          icon="mdi-plus"
          color="primary"
        >
          <XTooltip
            label="Adicionar"
            position="top"
          />
        </q-fab-action>
        <q-fab-action
          @click="xList.view"
          :disable="!(xList.selectedRows.length === 1)"
          v-if="auth.hasPermission(`${xList.permissionsGroupName}_view`)"
          icon="mdi-eye"
          color="primary"
        >
          <XTooltip
            label="Visualizar"
            position="top"
          />
        </q-fab-action>
        <q-fab-action
          @click="xList.edit"
          :disable="!(xList.selectedRows.length === 1)"
          v-if="auth.hasPermission(`${xList.permissionsGroupName}_edit`)"
          icon="mdi-pencil"
          color="primary"
        >
          <XTooltip
            label="Editar"
            position="top"
          />
        </q-fab-action>
        <q-fab-action
          @click="xList.destroy"
          :disable="!xList.selectedRows.length"
          v-if="auth.hasPermission(`${xList.permissionsGroupName}_delete`)"
          icon="mdi-close"
          color="red"
        >
          <XTooltip
            label="Excluir"
            position="top"
          />
        </q-fab-action>
      </q-fab>
    </div>

  </div>
</template>

<script setup>
import { useXListStore } from 'src/stores/xList'
import { useAuthStore } from 'src/stores/auth'
import XBtn from 'src/components/buttons/XBtn.vue'
import XTooltip from 'src/components/others/XTooltip.vue'

const xList = useXListStore()
const auth = useAuthStore()

</script>
