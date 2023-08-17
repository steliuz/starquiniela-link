<script setup lang="ts">
import FormAdvertise from './components/FormAdvertise.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, optColumn } from 'src/helpers/columns';
import { useAdvertise } from 'src/composables/useAdvertise';

const {
  getAdvertise,
  advertises,
  postAdvertise,
  loading,
  editAdvertise,
  advertise,
  dialog,
  putAdvertise,
  deleteAdvertise,
  onReset,
} = useAdvertise();
const columns = [nameColumn, optColumn];
</script>
<template>
  <section class="q-ma-sm">
    <div class="row">
      <div class="col-12 flex justify-end q-my-md">
        <q-btn
          class="q-mr-lg"
          color="primary"
          unelevated
          square
          label="Registrar Publicidad"
          @click="dialog = !dialog"
        />
      </div>
      <FormAdvertise
        v-model="dialog"
        @postAdvertise="postAdvertise"
        @putAdvertise="putAdvertise"
        :advertise="advertise"
        @onReset="onReset"
      />
      <UniversalTable
        :respData="advertises"
        :columns="columns"
        @paginateData="getAdvertise"
        :loading="loading"
        @editData="editAdvertise"
        title="Publicidad registrada"
        @deleteData="deleteAdvertise"
      >
      </UniversalTable>
    </div>
  </section>
</template>

<style scoped></style>
