<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue';
import { Ref } from 'vue';
import { file_url } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';

const { auth } = useAuthStore();

const showInputsResult: Ref<null | number> = ref(null);
defineProps(['dataMatch', 'player', 'type']);
const emit = defineEmits([
  'saveResult',
  'sendDeleted',
  'sendStatus',
  'sendResetMatch',
]);

const emitCancel = () => {
  showInputsResult.value = null;
};
const emitSave = (match: Math) => {
  emit('saveResult', match);
  showInputsResult.value = null;
};
const openResult = (index: number) => {
  showInputsResult.value = index;
};
const onDelete = (id: number) => {
  emit('sendDeleted', id);
};
const handleStatus = (value: Math) => {
  emit('sendStatus', value);
};

const resetMatch = (id: number) => {
  emit('sendResetMatch', id);
};
</script>

<template>
  <q-card bordered class="card-matchs">
    <q-card-section>
      <div :class="player ? 'box-matchs ' : 'box-matchs-player'">
        <div class="index-number"></div>
        <div class="bg-orange-5"></div>
        <div
          v-if="type != 3"
          class="box-result q-mb-xs"
          :class="player ? '' : 'results-admin'"
        >
          <p class="text-center text-weight-bold q-mb-none">R</p>
          <p class="text-center text-weight-bold q-mb-none" v-if="player">Pr</p>
        </div>
      </div>

      <div
        :class="player ? 'box-matchs ' : 'box-matchs-player'"
        v-for="(match, index) in dataMatch"
        :key="match.id ?? 0"
      >
        <div class="index-number">{{ index + 1 }}</div>
        <div class="box-team">
          <div class="divTeams">
            <div>
              <img
                class="img-team"
                :src="
                  match.team1 && match.team1.image
                    ? file_url + match.team1.image
                    : '/src/assets/team1.jpg'
                "
                alt="team1"
              />
              <p>
                {{ match.team1?.name }}
              </p>
            </div>
            <div>
              <img
                class="img-team"
                :src="
                  match.team2 && match.team2.image
                    ? file_url + match.team2.image
                    : '/src/assets/team2.jpg'
                "
                alt="team1"
              />
              <p>
                {{ match.team2?.name }}
              </p>
            </div>
          </div>

          <div class="box-block flex flex-center q-px-sm">
            <i
              class="fa-solid fa-md"
              :class="match.status ? 'hidden ' : 'fa-lock text-orange-5'"
            ></i>
          </div>
        </div>

        <div class="box-result" :class="player ? '' : 'border-r results-admin'">
          <div class="" v-if="showInputsResult == index">
            <q-input
              v-model="match.goalsTeam1"
              type="number"
              style="max-width: 50px"
              input-class="text-center"
              dense
              :dark="$q.dark.isActive"
              filled
              class="q-pb-xs hide-number-arrows"
            />
            <q-input
              v-model="match.goalsTeam2"
              type="number"
              style="max-width: 50px"
              input-class="text-center"
              dense
              :dark="$q.dark.isActive"
              filled
              class="hide-number-arrows"
            />
          </div>
          <div class="" v-else>
            <p>
              {{ match.goalsTeam1 != null ? match.goalsTeam1 : '-' }}
              <span
                v-if="
                  match.penaltyTeam1 &&
                  (auth.role_id == undefined || auth.role_id == 4)
                "
                >( {{ match.penaltyTeam1 }} )</span
              >
            </p>
            <p>
              {{ match.goalsTeam2 != null ? match.goalsTeam2 : '-' }}
              <span
                v-if="
                  match.penaltyTeam2 &&
                  (auth.role_id == undefined || auth.role_id == 4)
                "
                >( {{ match.penaltyTeam2 }} )</span
              >
            </p>
          </div>
          <template v-if="player">
            <div class="" v-if="showInputsResult == index || player">
              <div>
                <q-input
                  v-model="match.predictTeam1"
                  type="number"
                  color="secondary"
                  :dark="$q.dark.isActive"
                  style="max-width: 50px"
                  dense
                  filled
                  input-class="text-center"
                  class="q-pb-xs hide-number-arrows"
                  :disable="match.status == 0 && player"
                  :min="0"
                />

                <q-input
                  v-model="match.predictTeam2"
                  type="number"
                  color="secondary"
                  input-class="text-center"
                  :dark="$q.dark.isActive"
                  style="max-width: 50px"
                  dense
                  filled
                  class="hide-number-arrows"
                  :disable="match.status == 0 && player"
                  :min="0"
                />
              </div>
            </div>
          </template>
        </div>
        <div class="box-options" v-if="!player">
          <div v-if="showInputsResult == index" class="q-ml-sm">
            <q-btn
              padding="8px"
              flat
              color="secondary"
              icon="check"
              @click="emitSave(match)"
            />
            <q-btn
              padding="8px"
              flat
              color="red"
              icon="cancel"
              @click="emitCancel"
            />
          </div>
          <div v-else>
            <q-btn
              class="q-pa-xs"
              :color="$q.dark.isActive ? 'white' : 'primary'"
              flat
              icon="more_vert"
            >
              <q-menu class="bg-header-dark">
                <q-list style="min-width: 150px">
                  <q-item clickable v-close-popup @click="openResult(index)">
                    <q-item-section>
                      <div class="flex">
                        <i
                          class="q-mr-md fa-solid fa-futbol text-secondary"
                        ></i>
                        <span>Resultados</span>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-if="auth.role_id === 1">
                    <q-item-section>
                      <div class="flex">
                        <i class="q-mr-md fa-solid fa-trash text-red-5"></i>
                        <span>Eliminar</span>
                      </div>
                      <q-popup-proxy>
                        <q-banner>
                          <div class="row">
                            <div class="col-12">
                              <p class="ellipsis-2 text-center text-h6">
                                ¿Está seguro de eliminar esta predicción?
                              </p>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-6 text-center q-px-sm">
                              <q-btn
                                class="full-width"
                                outline
                                color="negative"
                                label="Cancelar"
                                v-close-popup
                              />
                            </div>
                            <div class="col-6 text-center q-px-sm">
                              <q-btn
                                class="full-width"
                                color="secondary"
                                label="Guardar"
                                v-close-popup
                                @click="onDelete(match.id)"
                              />
                            </div>
                          </div>
                        </q-banner>
                      </q-popup-proxy>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-else @click="resetMatch(match.id)">
                    <q-item-section>
                      <div class="flex">
                        <i class="q-mr-md fa-solid fa-trash text-red-5"></i>
                        <span>Reset</span>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset />
                  <q-item v-close-popup>
                    <q-item-section class="text-center">
                      <p class="q-mb-none">Inactivo / Activo</p>
                      <div class="flex justify-center">
                        <q-toggle
                          v-model="match.status"
                          color="secondary"
                          :true-value="1"
                          :false-value="0"
                          @click="handleStatus(match)"
                        />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<style lang="scss" scoped>
.w-50 {
  width: 50px;
}
.name-quiniela {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  margin: 10px auto;
  color: #646464;
}
.body--light {
  .card-matchs {
    background-color: #d8d9da;
    color: #222;
    margin-bottom: 50px;

    .box-matchs {
      color: #222;
      border-bottom: 1px solid #8d8d8d;

      .border-r {
        border-right: 1px solid #8d8d8d;
      }
    }

    .box-matchs-player {
      color: #222;
      border-bottom: 1px solid #8d8d8d;

      .border-r {
        border-right: 1px solid #8d8d8d;
      }
    }
  }
}

.card-matchs {
  max-width: 500px;
  margin: 0 auto;
  background-color: #00141e;

  .q-field--dense .q-field__control,
  .q-field--dense .q-field__marginal {
    height: 25px !important;
    padding-top: 0;
    padding-bottom: 0;
  }

  p {
    margin-bottom: 0;
  }

  .box-matchs {
    display: grid;
    grid-template-columns: 0.3fr repeat(1, minmax(50px, 3fr)) 200px 30px;
    align-items: center;
    gap: 5px;
    padding: 8px;
    border-bottom: 1px solid #e6e6e6;
    color: #fff;
    font-size: 14px;

    @media screen and (max-width: 500px) {
      display: grid;
      grid-template-columns: repeat(1, minmax(20px, 0.8fr)) 0.3fr;
    }

    &:first-child {
      border-bottom: 0px solid transparent;
      padding-bottom: 0;
      padding-top: 0;
    }

    &:nth-of-type(2) {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: 0px solid transparent;
    }

    .index-number {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      font-size: 1.2rem;
      font-weight: bold;

      @media screen and (max-width: 500px) {
        display: none;
      }
    }

    .box-team {
      display: flex;

      & .divTeams div {
        display: flex;

        p {
          line-height: 18px;
          padding-left: 10px;
          font-size: 14px;
          margin-bottom: 0;
          padding-top: 2px;
          padding-bottom: 2px;
          text-transform: capitalize;
        }

        @media screen and (max-width: 500px) {
          p.no-show-name {
            display: none;
          }
        }

        img.img-team {
          margin: 3px 0px;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          box-shadow: 2px 2px 3px rgba($color: #000000, $alpha: 0.1);
        }
      }
    }

    .border-r {
      border-right: 1px solid #e6e6e6;
    }

    .box-result {
      display: grid;
      grid-template-columns: 180px 50px;
      align-items: center;
      gap: 5px;
      place-items: center;
      // padding-right: 15px;

      &.results-admin {
        grid-template-columns: repeat(1, 1fr);
      }

      .mt-negative {
        margin-top: -30px;
      }

      .input-first {
        padding-right: 4px;
      }
    }

    .box-options {
      display: flex;
      justify-content: center;
    }
  }

  .box-matchs-player {
    display: grid;
    align-items: center;
    gap: 5px;
    padding: 8px;
    border-bottom: 1px solid #e6e6e6;
    color: #fff;
    font-size: 14px;
    grid-template-columns: 0.3fr repeat(1, minmax(100px, 2.7fr)) 100px 30px;

    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, minmax(100px, 2.7fr)) 100px 30px;
    }

    &:first-child {
      border-bottom: 0px solid transparent;
      padding-bottom: 0;
      padding-top: 0;
    }

    &:nth-of-type(2) {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: 0px solid transparent;
    }

    .index-number {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      font-size: 1.2rem;
      font-weight: bold;

      @media screen and (max-width: 500px) {
        display: none;
      }
    }

    .box-team {
      display: flex;

      & .divTeams div {
        display: flex;

        p {
          line-height: 18px;
          padding-left: 10px;
          font-size: 14px;
          margin-bottom: 0;
          padding-top: 2px;
          padding-bottom: 2px;
          text-transform: capitalize;

          @media screen and (max-width: 500px) {
            p.no-show-name {
              display: none;
            }
          }
        }

        img.img-team {
          margin: 3px 0px;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          box-shadow: 2px 2px 3px rgba($color: #000000, $alpha: 0.1);
        }
      }
    }

    .border-r {
      border-right: 1px solid #e6e6e6;
    }

    .box-result {
      display: grid;
      grid-template-columns: 180px 50px;
      align-items: center;
      gap: 5px;
      place-items: center;
      // padding-right: 15px;

      &.results-admin {
        grid-template-columns: repeat(1, 1fr);
      }

      .mt-negative {
        margin-top: -30px;
      }

      .input-first {
        padding-right: 4px;
      }
    }

    .box-options {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
