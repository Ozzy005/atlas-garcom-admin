<template>
  <q-page padding>
    <q-table :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="id">
      <template #top-left>
        <div class="text-h6">Usuários</div>
      </template>
      <template #top-right>
        <q-btn style="min-width: 120px;"
          label="Adicionar novo"
          color="primary"
          no-caps
          :to="{ name: 'users-create' }" />
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props">
          <ActionsDefault model="users"
            :item="props.row"
            v-model="rows" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import { ref } from 'vue'
import helpers from 'src/utils/helpers'
import ActionsDefault from 'src/components/crud/ActionsDefault.vue'

const loading = ref(false)
const columns = [
  {
    label: 'ID',
    name: 'id',
    field: 'id',
    align: 'left',
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
    label: 'Ações',
    name: 'actions',
    field: 'actions',
    align: 'right'
  }
]
const rows = ref([])

const handleGetItems = async () => {
  try {
    loading.value = true
    const { data } = await api({ url: '/api/users' })
    rows.value = data.data
    loading.value = false
  } catch (error) {
    notify.error(error)
  }
}

handleGetItems()
</script>
