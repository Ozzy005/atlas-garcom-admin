<template>
  <XList />
</template>

<script setup>
import XList from 'src/components/crud/list/XList.vue'
import { useXListStore } from 'src/stores/xList'

const xList = useXListStore()
xList.reset()
xList.title = 'Estados'
xList.routeGroupName = 'states'
xList.permissionsGroupName = 'states'
xList.apiGroupName = 'states'
xList.filterPlaceholder = 'Pesquisar por nome/sigla'
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
    label: 'Sigla',
    name: 'letter',
    field: 'letter',
    align: 'center',
    sortable: true
  }
]

</script>
