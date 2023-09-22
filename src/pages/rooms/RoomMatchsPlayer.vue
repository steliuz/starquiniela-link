<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { useTeam } from 'src/composables/useTeam';
import { useRooms } from 'src/composables/useRooms';
import { useRoute } from 'vue-router';
import { file_url } from 'src/boot/axios';

const route = useRoute();
const roomID: string | string[] = route.params.id;
const { room, getRoomById } = useRooms();
const { selectTeams } = useTeam();
const showInputsPredict: Ref<null | number> = ref(null);

onMounted(async () => {
  await selectTeams();
  await getRoomById(roomID);
  console.log(room.value);
});

const onPredict = (index: number) => {
  showInputsPredict.value = index;
};

function onSave() {
  console.log('save');
}
function onCancel() {
  showInputsPredict.value = null;
}
</script>
<template>
  <section class="q-mt-md q-px-sm">
    <div class="flex justify-end">
      <q-btn
        class="px-3"
        flat
        color="red-5"
        label="Regresar"
        @click="$router.go(-1)"
      />
    </div>

    <div class="row">
      <div class="col-12 q-px-md-md">
        <div class="name-quiniela">
          <p class="q-mb-none text-body2 text-weight-bold ellipsis">
            {{ room.name || '' }}
          </p>
          <q-btn padding="5px" flat color="primary">
            <i class="fa-solid fa-trophy text-orange-5 fa-xl"></i>
          </q-btn>
        </div>
        <q-card class="card-matchs">
          <q-card-section>
            <div class="box-matchs">
              <div class="index-number"></div>
              <div></div>
              <div class="box-result">
                <p class="text-center text-weight-bold q-mb-none q-mr-sm">R</p>
                <p class="text-center text-weight-bold q-mb-none">P</p>
              </div>
              <div></div>
            </div>

            <div
              class="box-matchs"
              v-for="(match, index) in room.matches"
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
              <div class="box-result">
                <div class="" v-if="showInputsPredict == index">
                  <q-input
                    v-model="match.goalsTeam1"
                    input-class="text-center"
                    type="number"
                    style="max-width: 40px"
                    dense
                    dark
                    filled
                    class="q-pb-xs hide-number-arrows"
                  />
                  <q-input
                    v-model="match.goalsTeam2"
                    input-class="text-center"
                    type="number"
                    style="max-width: 40px"
                    dense
                    dark
                    filled
                    class="hide-number-arrows"
                  />
                </div>
                <div v-else>
                  <p>{{ match.goalsTeam1 }}</p>
                  <p>{{ match.goalsTeam2 }}</p>
                </div>
                <div class="" v-if="showInputsPredict == index">
                  <q-input
                    v-model="match.penaltyTeam1"
                    input-class="text-center"
                    type="number"
                    style="max-width: 40px"
                    dense
                    dark
                    filled
                    class="q-pb-xs hide-number-arrows"
                  />
                  <q-input
                    v-model="match.penaltyTeam2"
                    input-class="text-center"
                    type="number"
                    style="max-width: 40px"
                    dense
                    dark
                    filled
                    class="hide-number-arrows"
                  />
                </div>
                <div v-else>
                  <p class="text-red-5" v-if="match.penaltyTeam1">
                    ({{ match.penaltyTeam1 }})
                  </p>
                  <p class="text-red-5" v-if="match.penaltyTeam2">
                    ({{ match.penaltyTeam2 }})
                  </p>
                </div>
              </div>
              <div class="box-options">
                <div v-if="showInputsPredict == index">
                  <q-btn
                    padding="8px"
                    flat
                    color="primary"
                    icon="check"
                    @click="onSave"
                  />
                  <q-btn
                    padding="8px"
                    flat
                    color="red"
                    icon="cancel"
                    @click="onCancel"
                  />
                </div>
                <div v-else>
                  <q-btn
                    padding="8px"
                    flat
                    color="primary"
                    @click="onPredict(index)"
                  >
                    <i class="fa-solid fa-futbol text-primary fa-xl"></i>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.box-form {
  max-width: 700px;
  margin: 0 auto;
}

.name-quiniela {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 700px;
  margin: 10px auto;
  color: #646464;
}

.card-matchs {
  max-width: 700px;
  margin: 0 auto;

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
    grid-template-columns: 0.3fr repeat(1, minmax(100px, 3fr)) 0.6fr 30px;
    align-items: center;
    gap: 10px;
    padding: 8px;
    border-bottom: 1px solid #e6e6e6;
    color: #646464;

    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(1, minmax(100px, 3fr)) 2fr 30px;
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
          padding-top: 2px;
          padding-bottom: 2px;
          text-transform: uppercase;
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

    .box-result {
      display: grid;
      grid-template-columns: repeat(2, auto);
      align-items: center;
      gap: 15px;
      justify-content: flex-end;
      align-items: center;
      padding-right: 8px;
      border-right: 1px solid #e6e6e6;

      .mt-negative {
        margin-top: -30px;
      }

      .input-first {
        padding-right: 4px;
      }

      @media screen and (max-width: 500px) {
        gap: 8px;
      }
    }

    .box-options {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
