<template>
  <XList />
</template>

<script setup>
import XList from 'src/components/crud/list/XList.vue'
import helpers from 'src/utils/helpers'
import { useXListStore } from 'src/stores/xList'

const xList = useXListStore()
xList.reset()
xList.title = 'Permissões'
xList.routeGroupName = 'permissions'
xList.permissionsGroupName = 'permissions'
xList.apiGroupName = 'permissions'
xList.filterPlaceholder = 'Pesquisar por nome/descrição'
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
    name: 'name',
    field: 'name',
    align: 'center',
    sortable: true
  },
  {
    label: 'Descrição',
    name: 'description',
    field: 'description',
    align: 'center',
    sortable: true
  },
  {
    label: 'Dt.Criação',
    name: 'created_at',
    field: 'created_at',
    align: 'center',
    sortable: true,
    format: (val) => helpers.brDateTime(val)
  },
  {
    label: 'Dt.Edição',
    name: 'updated_at',
    field: 'updated_at',
    align: 'center',
    sortable: true,
    format: (val) => helpers.brDateTime(val)
  }
]

</script>
