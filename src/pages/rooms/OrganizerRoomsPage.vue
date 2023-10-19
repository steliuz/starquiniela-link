<script setup lang="ts">
import UniversalTable from 'src/components/UniversalTable.vue';
import {
  customColumn,
  idColumn,
  nameColumn,
  optColumn,
} from 'src/helpers/columns';
import { useRooms } from 'src/composables/useRooms';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import { copyToClipboard } from 'quasar';
import { vue_url } from 'src/boot/axios';
import { handleMessages } from 'src/services/notifys';

const { setRoom } = useAuthStore();
const columns = [
  idColumn,
  nameColumn,
  customColumn({
    name: 'show_ranking',
    label: 'Ver Ranking',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: (row: any) => row.room_user?.show_ranking,
  }),
  optColumn,
];
const columns2 = [idColumn, nameColumn, optColumn];
const {
  loading,
  rooms,
  getReferRoom,
  tab,
  handlerTab,
  getRoomActive,
  buyRoom,
  deleteRoom,
  showRanking,
  putLinkWsGrpoup,
} = useRooms();
const router = useRouter();
const popup = ref();

const goToMatch = (roomID: number) => {
  setRoom(roomID);
  setTimeout(() => {
    router.push({ path: '/admin/rooms/matchs' });
  }, 500);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clipboard = (row: any) => {
  let url = `${vue_url}/rooms/${row.room_user.cod_compartir}`;
  copyToClipboard(url)
    .then(() => {
      handleMessages({
        message: 'Link de compartir, copiado',
        color: 'secondary',
        icon: 'check',
        position: 'center',
      });
    })
    .catch(() => {
      handleMessages({
        message: 'Hubo un problema al intentar copiarlo',
        color: 'red-7',
        icon: 'closed',
        position: 'center',
      });
    });
};

const roomData = ref();
const dialogLink = ref(false);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openDialogLink = (room_user: any) => {
  roomData.value = room_user;
  dialogLink.value = true;
};

const saveLinkWsGroup = async () => {
  let data = {
    id: roomData.value.id,
    enable_link: roomData.value.enable_link,
    link_ws_groups: roomData.value.link_ws_groups,
  };

  await putLinkWsGrpoup(data).then(() => {
    dialogLink.value = false;
  });
};
</script>

<template>
  <section class="q-px-sm q-px-md-lg q-mt-lg">
    <div class="q-my-md">
      <q-tabs
        v-model="tab"
        class="q-ml-md"
        align="center"
        active-bg-color="transparent"
        :activeClass="$q.dark.isActive ? 'text-white' : 'text-primary'"
        indicator-color="secondary"
      >
        <q-tab name="1" label="Adquiridas" @click="handlerTab(tab)" />
        <q-tab name="2" label="Comprar Quiniela" @click="handlerTab(tab)" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated keep-alive>
        <q-tab-panel
          class="bg-new-dark flex justify-center"
          name="1"
          :key="tab"
        >
          <UniversalTable
            :respData="rooms"
            :columns="columns"
            @paginateData="getReferRoom"
            :loading="loading"
            title="Mis Quinielas"
            :editBtnHidden="true"
            @deleteData="deleteRoom"
            @showRanking="showRanking"
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
                @click="clipboard(scope.props.row)"
              >
                <q-item-section>
                  <div class="flex">
                    <i class="q-mr-md fa-solid fa-share text-secondary"></i>
                    <span>Link de Quiniela</span>
                  </div>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="goToMatch(scope.props.row.id)"
              >
                <q-item-section>
                  <div class="flex">
                    <i class="q-mr-md fa-solid fa-shield text-orange-5"></i>
                    <span>Enfrentamientos</span>
                  </div>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="openDialogLink(scope.props.row.room_user)"
              >
                <q-item-section>
                  <div class="flex">
                    <i class="q-mr-md fa-solid fa-shield text-orange-5"></i>
                    <span>Link del Whatsapp grupo</span>
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </UniversalTable>
        </q-tab-panel>
        <q-tab-panel
          class="bg-new-dark flex justify-center"
          name="2"
          :key="tab"
        >
          <UniversalTable
            :respData="rooms"
            :columns="columns2"
            @paginateData="getRoomActive"
            :loading="loading"
            title="Quinielas Activas"
            :editBtnHidden="true"
            :delBtnHidden="true"
          >
            <template v-slot:customName="scope">
              <td>
                <div>
                  <p class="nameCustom q-mb-sm">
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
              <q-item clickable ref="popup">
                <q-item-section>
                  <div class="flex items-center">
                    <i class="fa-solid fa-cart-shopping text-secondary"></i>
                    <span class="q-ml-sm">Comprar</span>
                  </div>
                </q-item-section>
                <q-popup-proxy>
                  <q-banner class="bg-header-dark q-pa-lg">
                    <div class="row">
                      <div class="col-12">
                        <p class="ellipsis-2 text-center text-h6">
                          ¿Está seguro de que desea comprar esta quiniela?
                        </p>
                        <p class="text-h5 text-center">
                          Costo:
                          <span class="text-warning"
                            >{{ scope.props.row.credit }} Moneda</span
                          >
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 col-sm-6 text-center q-pa-sm">
                        <q-btn
                          class="full-width"
                          outline
                          color="negative"
                          label="Cancelar"
                          v-close-popup
                        />
                      </div>
                      <div class="col-12 col-sm-6 text-center q-pa-sm">
                        <q-btn
                          class="full-width"
                          color="secondary"
                          label="Comprar"
                          v-close-popup
                          @click.stop.prevent="buyRoom(scope.props.row.id)"
                        />
                      </div>
                    </div>
                  </q-banner>
                </q-popup-proxy>
              </q-item>
            </template>
          </UniversalTable>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <q-dialog v-model="dialogLink" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div>
            <p>Activar Link</p>
            <q-toggle
              v-model="roomData.enable_link"
              :true-value="1"
              :false-value="0"
              color="green"
            />
          </div>
          <div>
            <q-input
              v-model="roomData.link_ws_groups"
              type="text"
              label="Link del grupo WhatsApp"
            />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Guardar"
            color="primary"
            @click="saveLinkWsGroup"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
