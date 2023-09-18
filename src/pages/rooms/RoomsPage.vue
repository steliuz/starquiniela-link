<script setup lang="ts">
import FormRoom from './components/FormRooms.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, optColumn, statusToogleColumn } from 'src/helpers/columns';
import { useRooms } from 'src/composables/useRooms';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const { setRoom, auth } = useAuthStore();
const columns = [nameColumn, statusToogleColumn, optColumn];
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
  console.log('click');
  setRoom(roomID);
  setTimeout(() => {
    router.push({ path: '/admin/rooms/matchs' });
  }, 500);
};
</script>

<template>
  <section class="q-ma-sm">
    <div class="row">
      <div class="col-12 flex justify-end q-my-md" v-if="auth.role_id === 1">
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
      <div class="col-12 flex justify-center q-my-md">
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
          <template v-slot:customName="scope">
            <td>
              <div>
                <p
                  class="nameCustom q-mb-sm"
                  @click="goToMatch(scope.props.row.id)"
                >
                  {{ scope.props.row.name }}
                </p>
                <p class="q-mb-none">
                  <span class="text-custom-subtitle">
                    {{ scope.props.row.room_user.user.name }} /
                  </span>
                  <span>
                    <i class="fa-regular fa-flag q-mx-xs"></i>
                    {{
                      scope.props.row.type == 1
                        ? 'Normal'
                        : scope.props.row.type == 2
                        ? 'avanzada'
                        : 'LEV'
                    }}
                  </span>
                </p>
              </div>
            </td>
          </template>
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
  text-decoration: underline;
  cursor: pointer;
}
.text-custom-subtitle {
  color: $secondary;
  margin-bottom: 0;
  font-size: 12px;
  padding-left: 5px;
  font-weight: 500;
  cursor: pointer;
}
</style>
