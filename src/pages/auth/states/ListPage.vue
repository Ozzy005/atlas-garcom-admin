<template>
  <XList
    :columns="columns"
    title="Estados"
    route-group-name="states"
    permissions-group-name="states"
    api-group-name="states"
    filter-placeholder="Pesquisar por nome/sigla"
  />
</template>

<script setup>
import XList from 'src/components/crud/list/XList.vue'

const columns = [
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
