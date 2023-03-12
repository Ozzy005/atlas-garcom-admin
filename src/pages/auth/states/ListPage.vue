<template>
  <XListPage
    :columns="columns"
    crud="Estados"
    model="states"
    filter-placeholder="Pesquisar por nome/sigla"
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
    label: 'Sigla',
    name: 'letter',
    field: 'letter',
    align: 'center',
    sortable: true
  }
]

</script>
