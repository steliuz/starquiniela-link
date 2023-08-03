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
  putAdvertise,
  deleteAdvertise,
  onReset,
} = useAdvertise();
const columns = [nameColumn, optColumn];
</script>
<template>
  <section class="q-ma-sm">
    <div class="row">
      <FormAdvertise
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
        title="Equipos"
        @deleteData="deleteAdvertise"
      >
      </UniversalTable>
    </div>
  </section>
</template>

<style scoped></style>
