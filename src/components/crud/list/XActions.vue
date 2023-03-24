<template>
  <div class="row justify-between items-center q-gap-md">

    <q-input
      v-model="xList.filter"
      :placeholder="xList.filterPlaceholder"
      class="col-md-5 col-xs-12"
      debounce="300"
      dense
      outlined
      clearable
    >
      <template #append>
        <q-icon name="search" />
      </template>
    </q-input>

    <div class="row q-gap-sm">
      <XBtn
        @click="xList.destroy"
        :disable="!xList.selectedRows.length"
        v-if="auth.hasPermission(`${xList.permissionsGroupName}_delete`)"
        tooltip-label="Excluir"
        icon="mdi-close"
        color="red"
      />
      <XBtn
        @click="xList.edit"
        :disable="!(xList.selectedRows.length === 1)"
        v-if="auth.hasPermission(`${xList.permissionsGroupName}_edit`)"
        tooltip-label="Editar"
        icon="mdi-pencil"
      />
      <XBtn
        @click="xList.view"
        :disable="!(xList.selectedRows.length === 1)"
        v-if="auth.hasPermission(`${xList.permissionsGroupName}_view`)"
        tooltip-label="Visualizar"
        icon="mdi-eye"
      />
      <XBtn
        :to="{ name: `${xList.routeGroupName}-create` }"
        v-if="auth.hasPermission(`${xList.permissionsGroupName}_create`)"
        tooltip-label="Adicionar"
        icon="mdi-plus"
      />
      <XBtn
        @click="xList.toggleFullscreenMode()"
        :icon="xList.fullscreenModeIcon"
        :tooltip-label="xList.fullscreenModeTooltipLabel"
      />
      <XBtn
        @click="xList.toggleGridMode()"
        :tooltip-label="xList.gridModeTooltipLabel"
        icon="mdi-grid"
      />
    </div>

  </div>
</template>

<script setup>
import { useXListStore } from 'src/stores/xList'
import { useAuthStore } from 'src/stores/auth'
import XBtn from 'src/components/buttons/XBtn.vue'

const xList = useXListStore()
const auth = useAuthStore()

</script>
