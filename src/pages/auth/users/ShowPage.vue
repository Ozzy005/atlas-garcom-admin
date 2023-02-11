<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <div class="row justify-between items-center">
        <div class="text-h6">Usuários</div>
        <q-btn style="min-width: 120px;"
          label="Voltar"
          color="primary"
          no-caps
          :to="{ name: 'users' }" />
      </div>
      <div class="q-mt-md row q-gap-lg">
        <q-card class="col-md-6 col-xs-12"
          flat
          bordered>
          <q-card-section>
            <span>Nome:</span>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-skeleton type="text"
              v-if="!form.name" />
            <span v-if="!!form.name">{{ form.name }}</span>
          </q-card-section>
        </q-card>

        <q-card class="col-md-grow col-xs-12"
          flat
          bordered>
          <q-card-section>
            <span>Email:</span>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-skeleton type="text"
              v-if="!form.email" />
            <span v-if="!!form.email">{{ form.email }}</span>
          </q-card-section>
        </q-card>

        <q-card class="col-md-6 col-xs-12"
          flat
          bordered>
          <q-card-section>
            <span>Dt. Criação:</span>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-skeleton type="text"
              v-if="!form.created_at" />
            <span v-if="!!form.created_at">{{ helpers.brDateTime(form.created_at) }}</span>
          </q-card-section>
        </q-card>

        <q-card class="col-md-grow col-xs-12"
          flat
          bordered>
          <q-card-section>
            <span>Dt. Edição:</span>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-skeleton type="text"
              v-if="!form.updated_at" />
            <span v-if="!!form.updated_at">{{ helpers.brDateTime(form.updated_at) }}</span>
          </q-card-section>
        </q-card>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import notify from 'src/composables/notify'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useStorageStore } from 'src/stores/storage'
import helpers from 'src/utils/helpers'

const store = useStorageStore()
const route = useRoute()

const form = ref({
  name: null,
  email: null,
  created_at: null,
  updated_at: null
})

const handleGetItem = async () => {
  try {
    const { data } = await store.axios({ url: `/api/users/${route.params.id}` })
    form.value = data.data
  } catch (error) {
    notify.error(error)
  }
}

handleGetItem()

</script>
