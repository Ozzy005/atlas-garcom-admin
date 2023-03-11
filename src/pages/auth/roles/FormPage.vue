<template>
  <div class="row q-gap-sm">

    <div class="col-12 row q-gap-x-md q-gap-y-sm">
      <q-input
        v-model="form.name"
        class="col-md-grow col-xs-12"
        label="Nome"
        outlined
        clearable
        maxlength="125"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Nome é obrigatório!']"
      />

      <q-input
        v-model="form.description"
        class="col-md-grow col-xs-12"
        label="Descrição"
        outlined
        clearable
        maxlength="125"
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Descrição é obrigatória!']"
      />

      <q-select
        v-model="form.type"
        class="col-md-grow col-xs-12"
        :options="enums.getEnum('role-types')"
        label="Tipo"
        outlined
        option-value="id"
        option-label="name"
        emit-value
        map-options
        clearable
        lazy-rules="ondemand"
        :rules="[val => !!val || 'Tipo é obrigatório!']"
      />
    </div>

    <div class="col-12 column q-gap-md">
      <div class="row q-gap-sm">
        <q-btn
          :label="expandedAll ? 'Recolher todos' : 'Expandir todos'"
          size="md"
          color="primary"
          no-caps
          @click="expand"
        />
        <q-btn
          :label="tickedAll ? 'Desmarcar todos' : 'Marcar todos'"
          size="md"
          color="primary"
          no-caps
          @click="collapse"
        />
      </div>
      <q-tree
        ref="treeRef"
        node-key="id"
        label-key="description"
        tick-strategy="leaf"
        :nodes="permissions"
        v-model:ticked="form.permission_ids"
      />
    </div>

    <div class="col-12">
      <q-btn
        type="submit"
        class="float-right"
        style="min-width: 150px;"
        label="Salvar"
        color="secondary"
        no-caps
      />
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import { useEnumsStore } from 'src/stores/enums'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const form = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

const enums = useEnumsStore()

const treeRef = ref(null)
const expandedAll = ref(false)
const tickedAll = ref(false)
const permissions = ref([])

const rootNodes = computed(() => {
  const nodes = []
  const loop = (array) => {
    array.forEach(item => {
      if ('id' in item) nodes.push(item.id)
      if ('children' in item) loop(item.children)
    })
  }
  loop(permissions.value)
  return nodes
})

const expand = () => {
  if (expandedAll.value) {
    treeRef.value.collapseAll()
    expandedAll.value = false
  } else {
    treeRef.value.expandAll()
    expandedAll.value = true
  }
}

const collapse = () => {
  if (tickedAll.value) {
    form.value.permission_ids = []
    tickedAll.value = false
  } else {
    form.value.permission_ids = rootNodes.value
    tickedAll.value = true
  }
}

const getPermissions = async () => {
  try {
    const { data } = await api({ url: '/api/permissions-tree' })
    permissions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getPermissions()
})

</script>
