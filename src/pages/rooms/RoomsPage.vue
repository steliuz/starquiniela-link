<script setup lang="ts">
import FormRoom from './components/FormRooms.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import {
  nameColumn,
  userColumn,
  typeColumn,
  optColumn,
  statusToogleColumn,
} from 'src/helpers/columns';
import { useRooms } from 'src/composables/useRooms';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/stores/user';

const { setRoom } = useUserStore();

const columns = [
  nameColumn,
  userColumn,
  typeColumn({
    format: (val: string | number) =>
      val == 1 ? 'normal' : val == 2 ? 'avanzada' : 'LEV',
  }),
  statusToogleColumn,
  optColumn,
];

const {
  room,
  loading,
  dialog,
  rooms,
  postRoom,
  putRoom,
  deleteRoom,
  getRoom,
  editRoom,
  statusRoom,
} = useRooms();

const router = useRouter();
const goToMatch = (roomID: number) => {
  setRoom(roomID);
  setTimeout(() => {
    router.push({ path: '/admin/rooms/matchs' });
  }, 500);
};
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
          label="Registrar Quiniela"
          @click="dialog = !dialog"
        />
      </div>
      <FormRoom
        v-model="dialog"
        @postRoom="postRoom"
        @putRoom="putRoom"
        :room="room"
      />

      <UniversalTable
        :respData="rooms"
        :columns="columns"
        @paginateData="getRoom"
        :loading="loading"
        @editData="editRoom"
        title="Quinielas registradas"
        @deleteData="deleteRoom"
        @statusData="statusRoom"
      >
        <template v-slot:opt="scope">
          <q-item
            clickable
            v-close-popup
            @click="goToMatch(scope.props.row.id)"
          >
            <q-item-section>
              <div class="flex">
                <i class="q-mr-md fa-solid fa-shield text-red-5"></i>
                <span>Enfrentamientos</span>
              </div>
            </q-item-section>
          </q-item>
        </template>
      </UniversalTable>
    </div>
  </section>
</template>

<style scoped></style>
{ options: { format: (val: string | number) => val == 1 ? 'normal' : val == 2 ?
'avanzada' : 'LEV', } }
