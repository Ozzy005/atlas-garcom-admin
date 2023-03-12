<template>
  <XListPage
    :columns="columns"
    crud="Cidades"
    model="cities"
    filter-placeholder="Pesquisar por cidade"
  />
</template>

<script setup>
import XListPage from 'src/components/crud/XListPage.vue'

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
