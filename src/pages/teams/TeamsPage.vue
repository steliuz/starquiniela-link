<script setup lang="ts">
import FormTeam from './components/FormTeam.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, optColumn } from 'src/helpers/columns';
import { useTeam } from 'src/composables/useTeam';
import { file_url } from 'src/boot/axios';

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
        <q-btn
          class="q-mr-lg"
          color="secondary"
          unelevated
          square
          label="Registrar equipo"
          @click="dialog = !dialog"
        />
      </div>
      <FormTeam
        v-model="dialog"
        @postTeam="postTeam"
        @putTeam="putTeam"
        :team="team"
        @onReset="onReset"
      />
      <div class="col-12 flex justify-center q-my-md">
        <UniversalTable
          :respData="teams"
          :columns="columns"
          @paginateData="getTeam"
          :loading="loading"
          @editData="editTeam"
          title="Equipos"
          @deleteData="deleteTeam"
        >
          <template v-slot:customName="scope">
            <td>
              <div class="row no-wrap">
                <div class="col-auto">
                  <q-avatar>
                    <img
                      spinner-color="white"
                      :src="file_url + scope.props.row.image"
                    />
                  </q-avatar>
                </div>
                <div class="col-auto q-ml-sm">
                  <div class="q-mb-xs flex items-center full-height">
                    <p class="nameCustom ellipsis" style="max-width: 280px">
                      {{ scope.props.row.name }}
                    </p>
                  </div>
                </div>
              </div>
            </td>
          </template>
        </UniversalTable>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.nameCustom {
  margin-bottom: 0;
  font-size: 16px;
  padding-left: 5px;
  font-weight: bold;
  text-transform: capitalize;
  // text-decoration: underline;
  cursor: pointer;
}
</style>
