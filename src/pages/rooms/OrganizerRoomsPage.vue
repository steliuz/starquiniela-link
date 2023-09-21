<script setup lang="ts">
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, optColumn } from 'src/helpers/columns';
import { useRooms } from 'src/composables/useRooms';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import { copyToClipboard } from 'quasar';
import { vue_url } from 'src/boot/axios';

const { setRoom } = useAuthStore();
const columns = [nameColumn, optColumn];
const {
  loading,
  rooms,
  getReferRoom,
  tab,
  handlerTab,
  getRoomActive,
  buyRoom,
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
      // success!
      console.log('success');
    })
    .catch(() => {
      // fail
      console.log('fail');
    });
};
</script>

<template>
  <section class="q-px-sm q-px-md-lg q-mt-lg">
    <div class="q-my-md">
      <q-tabs
        v-model="tab"
        class="q-ml-md"
        align="left"
        active-bg-color="secondary"
        activeClass="text-white"
        indicator-color="primary"
      >
        <q-tab
          name="1"
          icon="mail"
          label="Adquirida"
          @click="handlerTab(tab)"
        />
        <q-tab name="2" icon="alarm" label="Comprar" @click="handlerTab(tab)" />
      </q-tabs>
      <q-tab-panels v-model="tab" animated keep-alive>
        <q-tab-panel name="1" :key="tab">
          <UniversalTable
            :respData="rooms"
            :columns="columns"
            @paginateData="getReferRoom"
            :loading="loading"
            title="Mis Quinielas"
            :editBtnHidden="true"
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
              <q-item
                clickable
                v-close-popup
                @click="clipboard(scope.props.row)"
              >
                <q-item-section>
                  <div class="flex">
                    <i class="q-mr-md fa-solid fa-shield text-red-5"></i>
                    <span>Compartir</span>
                  </div>
                </q-item-section>
              </q-item>
            </template>
          </UniversalTable>
        </q-tab-panel>
        <q-tab-panel name="2" :key="tab">
          <UniversalTable
            :respData="rooms"
            :columns="columns"
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
                  <div class="flex">
                    <i class="q-mr-md fa-solid fa-shield text-red-5"></i>
                    <span>Comprar</span>
                  </div>
                </q-item-section>
                <q-popup-proxy>
                  <q-banner>
                    <div class="row">
                      <div class="col-12">
                        <p class="ellipsis-2 text-center">
                          ¿Está seguro de que desea comprar esta quiniela?
                        </p>
                      </div>
                      <div class="col-6 text-center">
                        <div class="col-6 text-center">
                          <q-btn
                            flat
                            color="grey-13"
                            label="Cancelar"
                            v-close-popup
                          />
                        </div>
                      </div>
                      <q-btn
                        color="secondary"
                        label="Comprar"
                        v-close-popup
                        @click.stop.prevent="buyRoom(scope.props.row.id)"
                      />
                    </div>
                  </q-banner>
                </q-popup-proxy>
              </q-item>
            </template>
          </UniversalTable>
        </q-tab-panel>
      </q-tab-panels>
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
