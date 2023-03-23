<template>
  <XList
    :columns="columns"
    title="Unidades de Medida"
    route-group-name="measurement-units"
    permissions-group-name="measurement-units"
    api-group-name="measurement-units"
    filter-placeholder="Pesquisar por nome/iniciais"
  >
    <template #body-cell-status="props">
      <q-td :props="props">
        <BadgeStatus
          :name="enums.getName('status', props.row.status)"
          :color="enums.getColor('status', props.row.status)"
        />
      </q-td>
    </template>
  </XList>
</template>

<script setup>
import { useEnumsStore } from 'src/stores/enums'
import XList from 'src/components/crud/list/XList.vue'
import helpers from 'src/utils/helpers'
import BadgeStatus from 'src/components/others/XBadge.vue'

const enums = useEnumsStore()
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
    name: 'name',
    field: 'name',
    align: 'center',
    sortable: true
  },
  {
    label: 'Iniciais',
    name: 'initials',
    field: 'initials',
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
  },
  {
    label: 'Status',
    name: 'status',
    field: 'status',
    align: 'center',
    sortable: true
  }
]
</script>
