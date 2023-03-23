<template>
  <XView
    v-model="form"
    :return-to="{ name: 'cities-list' }"
    title="Cidades"
    api-get="cities"
  >
    <XField
      class="col-md-grow col-xs-12"
      field="Cidade:"
      :value="form.title"
    />

    <XField
      class="col-md-grow col-xs-12"
      field="Estado:"
      :value="form.state"
    />
  </XView>
</template>

<script setup>
import { ref } from 'vue'
import XView from 'src/components/crud/view/XView.vue'
import XField from 'src/components/crud/view/XField.vue'

const form = ref({
  title: null,
  state: null
})

</script>
