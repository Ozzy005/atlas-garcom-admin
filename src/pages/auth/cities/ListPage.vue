<template>
  <XList />
</template>

<script setup>
import XList from 'src/components/crud/list/XList.vue'
import { useXListStore } from 'src/stores/xList'

const xList = useXListStore()
xList.reset()
xList.title = 'Cidades'
xList.routeGroupName = 'cities'
xList.permissionsGroupName = 'cities'
xList.apiGroupName = 'cities'
xList.filterPlaceholder = 'Pesquisar por cidade'
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
    label: 'Nome',
    name: 'title',
    field: 'title',
    align: 'center',
    sortable: true
  },
  {
    label: 'Estado',
    name: 'state',
    field: 'state',
    align: 'center',
    sortable: true
  }
]

</script>
