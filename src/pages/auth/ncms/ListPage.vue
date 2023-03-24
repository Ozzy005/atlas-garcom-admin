<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <XList>
    <template #body-cell-description="props">
      <q-td
        :props="props"
        v-html="props.row.description"
      />
    </template>
  </XList>
</template>

<script setup>
import XList from 'src/components/crud/list/XList.vue'
import { useXListStore } from 'src/stores/xList'

const xList = useXListStore()
xList.reset()
xList.title = 'Ncms'
xList.routeGroupName = 'ncms'
xList.permissionsGroupName = 'ncms'
xList.apiGroupName = 'ncms'
xList.filterPlaceholder = 'Pesquisar por código/descrição'
xList.columns = [
  {
    label: 'ID',
    name: 'id',
    field: 'id',
    align: 'center',
    required: true,
    sortable: true
  },
  {
    label: 'Código',
    name: 'code',
    field: 'code',
    align: 'center',
    sortable: true
  },
  {
    label: 'Descrição',
    name: 'description',
    field: 'description',
    align: 'center',
    sortable: true
  }
]

</script>
