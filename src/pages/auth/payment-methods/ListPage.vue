<template>
  <XList>
    <template #body-cell-status="props">
      <q-td :props="props">
        <XBadge
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
import XBadge from 'src/components/others/XBadge.vue'
import { useXListStore } from 'src/stores/xList'

const enums = useEnumsStore()
const xList = useXListStore()
xList.reset()
xList.title = 'Métodos de Pagamento'
xList.routeGroupName = 'payment-methods'
xList.permissionsGroupName = 'payment-methods'
xList.apiGroupName = 'payment-methods'
xList.filterPlaceholder = 'Pesquisar por código/nome'
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
    label: 'Nome',
    name: 'name',
    field: 'name',
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
    sortable: true,
    format: (val) => xList.gridMode ? enums.getName('status', val) : val
  }
]

</script>
