<template>
  <XListPage
    :columns="columns"
    crud="Contratantes"
    model="tenants"
    filter-placeholder="Pesquisar nome completo/razão social/cpf/cnpj/email"
  >
    <template #body-cell-status="props">
      <q-td :props="props">
        <BadgeStatus
          :name="enums.getName('tenant-status', props.row.status)"
          :color="enums.getColor('tenant-status', props.row.status)"
        />
      </q-td>
    </template>
  </XListPage>
</template>

<script setup>
import { useEnumsStore } from 'src/stores/enums'
import XListPage from 'src/components/crud/XListPage.vue'
import helpers from 'src/utils/helpers'
import BadgeStatus from 'src/components/common/BadgeStatus.vue'

const enums = useEnumsStore()
const columns = [
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
    sortable: true
  }
]

</script>
