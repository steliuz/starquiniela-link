<script setup lang="ts">
import FormTeam from './components/FormTeam.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, optColumn } from 'src/helpers/columns';
import { useTeam } from 'src/composables/useTeam';

const {
  getTeam,
  teams,
  postTeam,
  loading,
  editTeam,
  team,
  dialog,
  putTeam,
  deleteTeam,
  onReset,
} = useTeam();
const columns = [nameColumn, optColumn];
</script>
<template>
  <section class="q-ma-sm">
    <div class="row">
      <div class="col-12 flex justify-end q-my-md">
        <q-btn class="q-mr-lg" color="secondary" unelevated square label="Registrar equipo" @click="dialog = !dialog" />
      </div>
      <FormTeam v-model="dialog" @postTeam="postTeam" @putTeam="putTeam" :team="team" @onReset="onReset" />
      <UniversalTable :respData="teams" :columns="columns" @paginateData="getTeam" :loading="loading" @editData="editTeam"
        title="Equipos" @deleteData="deleteTeam">
      </UniversalTable>
    </div>
  </section>
</template>

<style scoped></style>
