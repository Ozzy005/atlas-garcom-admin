<template>
  <div class="row q-gap-md">

    <q-card
      class="cursor-pointer"
      :class="signature.id === signatureId ? 'bg-grey-5' : 'bg-grey-4'"
      style="width: 300px; min-height: 400px; user-select: none;"
      @click="() => { signatureId = signature.id, dueDays = signature.due_days, dueDayId = null }"
      v-for="(signature) in signatures"
      :key="signature.id"
    >

      <q-card-section
        class="flex flex-center text-h5"
        style="position: relative;"
      >
        <span>{{ signature.name }}</span>
        <q-icon
          class="q-mr-md"
          style="position: absolute; right: 0;"
          name="mdi-check-decagram"
          color="green"
          size="md"
          v-if="signature.id === signatureId"
        />
      </q-card-section>

      <q-separator />

      <q-card-section
        class="column flex-center text-subtitle1"
        style="height: 82px;"
      >
        <span
          class="text-subtitle2 text-red"
          style="text-decoration: line-through;"
          v-if="signature.has_discount"
        >
          R$ {{ helpers.floatToMoney(signature.price * signature.recurrence) }} / {{
            enums.getName('recurrences', signature.recurrence) }}
        </span>
        <span class="text-subtitle1">
          R$ {{ helpers.floatToMoney(signature.total_price) }} / {{ enums.getName('recurrences', signature.recurrence) }}
        </span>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div
          class="row justify-between items-center no-wrap"
          v-for="(module, index) in modules"
          :key="index"
        >
          <span>{{ module.description }}</span>
          <q-icon
            :name="signature.modules.includes(module.id) ? 'check' : 'close'"
            :color="signature.modules.includes(module.id) ? 'green' : 'red'"
            size="md"
          />
        </div>
      </q-card-section>

    </q-card>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import notify from 'src/composables/notify'
import { api } from 'src/boot/axios'
import helpers from 'src/utils/helpers'
import { useEnumsStore } from 'src/stores/enums'

const props = defineProps({
  signatureIdModel: {
    type: Number
  },
  dueDaysModel: {
    type: Array
  },
  dueDayIdModel: {
    type: Number
  }
})

const emit = defineEmits(['update:signatureIdModel', 'update:dueDaysModel', 'update:dueDayIdModel'])

const signatureId = computed({
  get () {
    return props.signatureIdModel
  },
  set (value) {
    emit('update:signatureIdModel', value)
  }
})

const dueDays = computed({
  get () {
    return props.dueDaysModel
  },
  set (value) {
    emit('update:dueDaysModel', value)
  }
})

const dueDayId = computed({
  get () {
    return props.dueDayIdModel
  },
  set (value) {
    emit('update:dueDayIdModel', value)
  }
})

const enums = useEnumsStore()
const signatures = ref([])
const modules = ref([])

const getSignatures = async () => {
  try {
    const { data } = await api({ url: '/api/signatures', params: { status: 1 } })
    signatures.value = data.data
    signatures.value.forEach(item => {
      item.modules = item.modules.map(item => item.id)
    })
  } catch (error) {
    notify.error(error)
  }
}

const getModules = async () => {
  try {
    const { data } = await api({ url: '/api/roles', params: { type: 2 } })
    modules.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

onMounted(() => {
  getSignatures()
  getModules()
})
</script>
