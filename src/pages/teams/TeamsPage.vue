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
  putTeam,
  deleteTeam,
  onReset,
} = useTeam();
const columns = [nameColumn, optColumn];
</script>
<template>
  <section class="q-ma-sm">
    <div class="row">
      <FormTeam
        @postTeam="postTeam"
        @putTeam="putTeam"
        :team="team"
        @onReset="onReset"
      />
      <UniversalTable
        :respData="teams"
        :columns="columns"
        @paginateData="getTeam"
        :loading="loading"
        @editData="editTeam"
        title="Equipos"
        @deleteData="deleteTeam"
      >
      </UniversalTable>
    </div>
  </section>
</template>

<style scoped></style>
