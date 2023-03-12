<template>
  <XFormGroup>

    <XFormGroup>
      <XInput
        v-model="form.name"
        :rules="[val => !!val || 'Nome é obrigatório!']"
        class="col-md-grow"
        label="Nome"
        maxlength="125"
      />

      <XInput
        v-model="form.description"
        :rules="[val => !!val || 'Descrição é obrigatória!']"
        class="col-md-grow"
        label="Descrição"
        maxlength="125"
      />

      <XEnumSelect
        v-model="form.type"
        :rules="[val => !!val || 'Tipo é obrigatório!']"
        class="col-md-grow"
        label="Tipo"
        enum-name="role-types"
      />
    </XFormGroup>

    <XFormGroup>
      <XFormGroup>
        <XBtn
          @click="expand"
          :label="expandedAll ? 'Recolher todos' : 'Expandir todos'"
          size="md"
        />
        <XBtn
          @click="collapse"
          :label="tickedAll ? 'Desmarcar todos' : 'Marcar todos'"
          size="md"
        />
      </XFormGroup>
      <XFormGroup>
        <q-tree
          ref="treeRef"
          node-key="id"
          label-key="description"
          tick-strategy="leaf"
          :nodes="permissions"
          v-model:ticked="form.permission_ids"
        />
      </XFormGroup>
    </XFormGroup>

    <XBtnGroup>
      <q-space />
      <XSbtBtn />
    </XBtnGroup>

  </XFormGroup>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { api } from 'src/boot/axios'
import notify from 'src/composables/notify'
import XSbtBtn from 'src/components/common/buttons/XSbtBtn.vue'
import XInput from 'src/components/common/inputs/XInput.vue'
import XEnumSelect from 'src/components/common/inputs/XEnumSelect.vue'
import XBtn from 'src/components/common/buttons/XBtn.vue'
import XFormGroup from 'src/components/crud/XFormGroup.vue'
import XBtnGroup from 'src/components/crud/XBtnGroup.vue'

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
