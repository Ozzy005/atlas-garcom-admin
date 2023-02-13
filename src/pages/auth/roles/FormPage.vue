<template>
  <div class="row q-gap-lg">

    <q-input v-model="form.name"
      class="col-md-6 col-xs-12"
      label="Nome"
      clearable
      maxlength="125"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Nome é obrigatório !']" />

    <q-input v-model="form.description"
      class="col-md-grow col-xs-12"
      label="Descrição"
      clearable
      maxlength="125"
      lazy-rules="ondemand"
      :rules="[val => !!val || 'Descrição é obrigatória !']" />

    <div class="col-12 column q-gap-md">
      <div class="row q-gap-sm">
        <q-btn :label="expandedAll ? 'Recolher todos' : 'Expandir todos'"
          size="md"
          color="primary"
          no-caps
          @click="handleExpand" />
        <q-btn :label="tickedAll ? 'Desmarcar todos' : 'Marcar todos'"
          size="md"
          color="primary"
          no-caps
          @click="handleCollapse" />
      </div>
      <q-tree ref="treeRef"
        node-key="id"
        label-key="description"
        tick-strategy="leaf"
        :nodes="permissions"
        v-model:ticked="form.permission_ids" />
    </div>

    <div class="col-12">
      <q-btn type="submit"
        class="float-right"
        style="min-width: 120px;"
        label="Salvar"
        color="secondary"
        no-caps />
    </div>

  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'

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

const handleExpand = () => {
  if (expandedAll.value) {
    treeRef.value.collapseAll()
    expandedAll.value = false
  } else {
    treeRef.value.expandAll()
    expandedAll.value = true
  }
}

const handleCollapse = () => {
  if (tickedAll.value) {
    form.value.permission_ids = []
    tickedAll.value = false
  } else {
    form.value.permission_ids = rootNodes.value
    tickedAll.value = true
  }
}

const handleGetPermissions = async () => {
  try {
    const { data } = await api({ url: '/api/permissions-tree' })
    permissions.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => handleGetPermissions())

</script>
