<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue';
import { Ref } from 'vue';
import { file_url } from 'src/boot/axios';

const showInputsResult: Ref<null | number> = ref(null);
defineProps(['dataMatch', 'player']);
const emit = defineEmits(['emitSave', 'emitDelete', 'emitStatus']);

const emitCancel = () => {
  showInputsResult.value = null;
  // showInputsPredict.value = null;
};
const emitSave = (match: Math) => {
  emit('emitSave', match);
  showInputsResult.value = null;
};
const emitResult = (index: number) => {
  showInputsResult.value = index;
  //   showInputsPredict.value = index;
};
const emitDelete = (id: number) => {
  emit('emitDelete', id);
};
const emitStatus = (value: Math) => {
  emit('emitStatus', value);
};
// const showPredict = (value: any) => {
//   console.log('value: ', value);
// };
</script>

<template>
  <q-card bordered class="card-matchs">
    <q-card-section>
      <div
        class="box-matchs"
        :class="player ? 'box-matchs-player' : 'box-matchs'"
      >
        <div class="index-number"></div>
        <div></div>
        <div class="box-result">
          <p class="text-center text-weight-bold q-mb-none">R</p>
          <p class="text-center text-weight-bold q-mb-none">P</p>
        </div>
      </div>

      <div
        class="box-matchs"
        :class="player ? 'box-matchs-player' : 'box-matchs'"
        v-for="(match, index) in dataMatch"
        :key="match.id ?? 0"
      >
        <div class="index-number">{{ index + 1 }}</div>
        <div class="box-team">
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
            <p>{{ match.team1?.name }}</p>
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
            <p>{{ match.team2?.name }}</p>
          </div>
        </div>
        <div
          class="box-result"
          :class="player ? '' : 'border-right__box-result'"
        >
          <div class="" v-if="showInputsResult == index">
            <q-input
              v-model="match.goalsTeam1"
              type="number"
              style="max-width: 50px"
              dense
              filled
              class="q-pb-xs hide-number-arrows"
            />
            <q-input
              v-model="match.goalsTeam2"
              type="number"
              style="max-width: 50px"
              dense
              filled
              class="hide-number-arrows"
            />
          </div>
          <div v-else>
            <p>{{ match.goalsTeam1 || '-' }}</p>
            <p>{{ match.goalsTeam2 || '-' }}</p>
          </div>
          <div class="" v-if="showInputsResult == index || player">
            <q-input
              v-model="match.penaltyTeam1"
              type="number"
              color="secondary"
              :dark="player"
              style="max-width: 50px"
              dense
              filled
              class="q-pb-xs hide-number-arrows"
              :disable="match.status == 0 && player"
              :min="0"
            />
            <q-input
              v-model="match.penaltyTeam2"
              type="number"
              color="secondary"
              :dark="player"
              style="max-width: 50px"
              dense
              filled
              class="hide-number-arrows"
              :disable="match.status == 0 && player"
              :min="0"
            />
          </div>
          <div v-else>
            <!-- v-if="match.penaltyTeam1 != null" -->
            <p class="text-red-5">
              {{ match.penaltyTeam1 ? match.penaltyTeam1 : '-' }}
            </p>
            <p class="text-red-5">
              {{ match.penaltyTeam2 ? match.penaltyTeam2 : '-' }}
            </p>
          </div>
        </div>
        <div class="box-options" v-if="!player">
          <div v-if="showInputsResult == index" class="q-ml-sm">
            <q-btn
              padding="8px"
              flat
              color="primary"
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
            <!-- <q-btn padding="8px" flat color="primary" @click="showPredict(index)" v-if="player">
              <i class="fa-solid fa-futbol text-primary fa-xl"></i>
            </q-btn> -->
            <q-btn class="q-pa-xs" color="white" flat icon="more_vert">
              <q-menu class="bg-header-dark">
                <q-list style="min-width: 150px">
                  <q-item clickable v-close-popup @click="emitResult(index)">
                    <q-item-section>
                      <div class="flex">
                        <i class="q-mr-md fa-solid fa-futbol text-primary"></i>
                        <span>Resultados</span>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-item @click="emitDelete(match.id)" clickable v-close-popup>
                    <q-item-section>
                      <div class="flex">
                        <i class="q-mr-md fa-solid fa-trash text-red-5"></i>
                        <span>Eliminar</span>
                      </div>
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset />
                  <q-item v-close-popup>
                    <q-item-section class="text-center">
                      <p class="q-mb-none">Activo / Inactivo</p>
                      <div class="flex justify-center">
                        <q-toggle
                          v-model="match.status"
                          color="secondary"
                          :true-value="1"
                          :false-value="0"
                          @click="emitStatus(match)"
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
.name-quiniela {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  margin: 10px auto;
  color: #646464;
}

.card-matchs {
  max-width: 500px;
  margin: 0 auto;
  background-color: #00141e;
  // outline: 3px solid #fff;
  // outline-offset: 3px;

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
    grid-template-columns: 0.3fr repeat(1, minmax(100px, 3fr)) 1.2fr 30px;
    align-items: center;
    gap: 5px;
    padding: 8px;
    border-bottom: 1px solid #e6e6e6;
    color: #fff;
    font-size: 14px;

    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, minmax(100px, 3fr)) 1.8fr 30px;
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
      flex-direction: column;

      & > div {
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

        img.img-team {
          margin: 3px 0px;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          box-shadow: 2px 2px 3px rgba($color: #000000, $alpha: 0.1);
        }
      }
    }

    .border-right__box-result {
      border-right: 1px solid #e6e6e6;
    }

    .box-result {
      display: grid;
      grid-template-columns: repeat(2, auto);
      align-items: center;
      gap: 5px;
      place-items: center;
      padding-right: 8px;

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
    grid-template-columns: 0.3fr repeat(1, minmax(100px, 3fr)) 1.2fr;

    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, minmax(100px, 3fr)) 1.8fr;
    }
  }
}
</style>
