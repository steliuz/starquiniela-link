<script setup lang="ts">
import FormRoom from './components/FormRooms.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, userColumn, typeColumn, priceColumn, optColumn } from 'src/helpers/columns';
import { useRooms } from 'src/composables/useRooms';




const columns = [nameColumn, userColumn, typeColumn, priceColumn, optColumn];

const {
  room,
  loading,
  dialog
} = useRooms()

</script>

<template>
  <section class="q-ma-sm">
    <div class="row">
      <div class="col-12 flex justify-end q-my-md">
        <q-btn class="q-mr-lg" color="secondary" unelevated square label="Registrar Quiniela" @click="dialog = !dialog" />
      </div>
      <FormRoom v-model="dialog" @postUser="postUser" @putUser="putUser" :room="room" />

      <UniversalTable :respData="advertises" :columns="columns" @paginateData="getAdvertise" :loading="loading"
        @editData="editAdvertise" title="Quinielas registradas" @deleteData="deleteAdvertise">
      </UniversalTable>
    </div>
  </section>
</template>



<style scoped></style>