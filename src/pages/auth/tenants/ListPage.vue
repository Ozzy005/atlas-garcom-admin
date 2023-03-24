<template>
  <XList>
    <template #body-cell-status="props">
      <q-td :props="props">
        <XBadge
          :name="enums.getName('tenant-status', props.row.status)"
          :color="enums.getColor('tenant-status', props.row.status)"
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
xList.title = 'Contratantes'
xList.routeGroupName = 'tenants'
xList.permissionsGroupName = 'tenants'
xList.apiGroupName = 'tenants'
xList.filterPlaceholder = 'Pesquisar por nome completo/razão social/cpf/cnpj/email'
xList.columns = [
  {
    label: 'ID',
    name: 'id',
    field: 'id',
    align: 'center',
    sortable: true,
    required: true
  },
  {
    label: 'Nome completo/Razão Social',
    name: 'full_name',
    field: 'full_name',
    align: 'center',
    sortable: true
  },
  {
    label: 'CPF/CNPJ',
    name: 'nif',
    field: 'nif',
    align: 'center',
    sortable: true,
    format: (val) => helpers.nifMask(val)
  },
  {
    label: 'Email',
    name: 'email',
    field: 'email',
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
    format: (val) => xList.gridMode ? enums.getName('tenant-status', val) : val
  }
]

</script>
