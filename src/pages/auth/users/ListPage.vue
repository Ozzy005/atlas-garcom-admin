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
        <q-td :props="props"
          class="q-gutter-x-sm">
          <q-btn icon="visibility"
            color="accent"
            dense
            @click="handleShow(props.row)">
            <q-tooltip>Visualizar</q-tooltip>
          </q-btn>
          <q-btn icon="edit"
            color="info"
            dense
            @click="handleEdit(props.row)">
            <q-tooltip>Editar</q-tooltip>
          </q-btn>
          <q-btn icon="delete"
            color="negative"
            dense
            @click="handleDestroy(props.row)">
            <q-tooltip>Excluir</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { useStorageStore } from 'src/stores/storage'
import notify from 'src/composables/notify'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import helpers from 'src/utils/helpers'

const store = useStorageStore()
const $q = useQuasar()
const router = useRouter()

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
    const { data } = await store.axios({ url: '/api/users' })
    rows.value = data.data
    loading.value = false
  } catch (error) {
    notify.error(error)
  }
}

handleGetItems()

const handleShow = (item) => {
  router.push({ name: 'users-show', params: { id: item.id } })
}

const handleEdit = (item) => {
  router.push({ name: 'users-edit', params: { id: item.id } })
}

const handleDestroy = (item) => {
  $q.dialog({
    title: 'Atenção !',
    message: `Você deseja deletar o usuário ${item.name}?`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    try {
      const { data } = await store.axios({ method: 'delete', url: `/api/users/${item.id}` })
      rows.value = rows.value.filter(val => val.id !== item.id)
      notify.success(data.message)
    } catch (error) {
      notify.error(error)
    }
  })
}
</script>
