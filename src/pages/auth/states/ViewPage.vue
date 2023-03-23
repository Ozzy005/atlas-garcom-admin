<template>
  <XView
    v-model="form"
    :return-to="{ name: 'states-list' }"
    title="Estados"
    api-get="states"
  >
    <XField
      class="col-md-grow col-xs-12"
      field="Nome:"
      :value="form.title"
    />

    <XField
      class="col-md-grow col-xs-12"
      field="Sigla:"
      :value="form.letter"
    />
  </XView>
</template>

<script setup>
import { ref } from 'vue'
import XView from 'src/components/crud/view/XView.vue'
import XField from 'src/components/crud/view/XField.vue'

const form = ref({
  title: null,
  letter: null
})

</script>
