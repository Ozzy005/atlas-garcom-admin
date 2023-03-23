<template>
  <XList
    :columns="columns"
    title="Cidades"
    route-group-name="cities"
    permissions-group-name="cities"
    api-group-name="cities"
    filter-placeholder="Pesquisar por cidade"
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
    label: 'Estado',
    name: 'state',
    field: 'state',
    align: 'center',
    sortable: true
  }
]

</script>
