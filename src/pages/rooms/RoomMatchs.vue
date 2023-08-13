<script setup lang="ts">
import { ref } from 'vue';
const status = ref(true)
const showInputsPredict = ref(true)
const showInputsResult = ref(true)
const model1 = ref(null)
const model2 = ref(null)

const options = [
  {
    label: 'Guadalajara',
    value: 'Google',
    description: 'Search engine',
    icon: 'mail'
  },
  {
    label: 'Cruz Azul',
    value: 'Facebook',
    description: 'Social media',
    icon: 'bluetooth'
  },
  {
    label: 'Monterrey',
    value: 'Twitter',
    description: 'Quick updates',
    icon: 'map'
  },
]
const options2 = [
  {
    label: 'Guadalajara',
    value: 'Google',
    description: 'Search engine',
    icon: 'mail'
  },
  {
    label: 'Cruz Azul',
    value: 'Facebook',
    description: 'Social media',
    icon: 'bluetooth'
  },
  {
    label: 'Monterrey',
    value: 'Twitter',
    description: 'Quick updates',
    icon: 'map'
  },
]


const onResult = () => {
  showInputsPredict.value = !showInputsPredict.value
}
const showPredict = () => {
  showInputsResult.value = !showInputsResult.value
}
</script>
<template>
  <section class="q-mt-md q-px-sm">
    <div class="flex justify-end">
      <q-btn class="px-3" flat color="red-5" label="Regresar" @click="$router.go(-1)" />
    </div>
    <div class="row q-mb-md">
      <div class="col-12 full-width">
        <q-form class="box-form ">
          <div class="row">
            <div class="col-6 col-md-5 q-px-sm">
              <q-select dense filled v-model="model1" :options="options" label="Equipo 1" color="teal"
                options-selected-class="text-deep-orange">
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white">
                        <q-img src="src/assets/team1.jpg" :ratio="1" spinner-color="primary" spinner-size="82px" />
                      </q-avatar>

                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                      <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-6 col-md-5 q-px-sm">
              <q-select dense filled v-model="model2" :options="options2" label="Equipo 2" color="teal"
                options-selected-class="text-deep-orange">
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-avatar color="primary" text-color="white">
                        <q-img src="src/assets/team1.jpg" :ratio="1" spinner-color="primary" spinner-size="82px" />
                      </q-avatar>

                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ scope.opt.label }}</q-item-label>
                      <q-item-label caption>{{ scope.opt.description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-md-2 flex justify-center">
              <q-btn label="Add" class="q-my-sm" type="submit" color="primary" />
            </div>
          </div>
        </q-form>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-6 offset-md-1 q-px-md-md">
        <div class="name-quiniela">
          <p class="q-mb-none text-body2 text-weight-bold ellipsis">Nombre de la quiniela</p>
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
            <div class="box-matchs">
              <div class="index-number">1</div>
              <div class="box-team">
                <div>
                  <img class="img-team" src="src/assets/team1.jpg" alt="team1">
                  <p>Mazatlan</p>
                </div>
                <div>
                  <img class="img-team" src="src/assets/team2.jpg" alt="team1">
                  <p>Monterrey</p>
                </div>
              </div>
              <div class="box-result">
                <div class="" v-if="showInputsResult">
                  <p>2</p>
                  <p>2</p>
                </div>
                <div v-else>
                  <q-input type="number" style="max-width: 40px;" dense filled class=" q-pb-xs hide-number-arrows" />
                  <q-input type="number" style="max-width: 40px;" dense filled class=" hide-number-arrows" />
                </div>
                <div class="" v-if="showInputsPredict">
                  <p class="text-red-5">(0)</p>
                  <p class="text-red-5">(0)</p>
                </div>
                <div v-else>
                  <p class="text-center text-weight-bold q-mb-none">P</p>

                  <q-input type="number" style="max-width: 40px;" dense filled class=" q-pb-xs hide-number-arrows" />
                  <q-input type="number" style="max-width: 40px;" dense filled class=" hide-number-arrows" />
                </div>
              </div>
              <div class="box-options">
                <q-btn class="q-pa-xs" color="dark" flat icon="more_vert">
                  <q-menu>
                    <q-list style="min-width: 140px">
                      <q-item clickable v-close-popup @click="onResult">
                        <q-item-section>
                          <div class="flex">
                            <i class="q-mr-md fa-solid fa-futbol text-primary"></i>
                            <span>Resultados</span>
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <div class="flex">
                            <i class="q-mr-md fa-solid fa-trash text-red-5"></i>
                            <span>Eliminar</span>
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-separator spaced inset />
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <p class="q-mb-none">Activo / Inactivo</p>
                          <div class="flex">
                            <q-toggle v-model="status" color="secondary" />
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
            <div class="box-matchs">
              <div class="index-number">2</div>
              <div class="box-team">
                <div>
                  <img class="img-team" src="src/assets/team1.jpg" alt="team1">
                  <p>Santos</p>
                </div>
                <div>
                  <img class="img-team" src="src/assets/team2.jpg" alt="team1">
                  <p>Atlas FC</p>
                </div>
              </div>
              <div class="box-result">
                <div>
                  <p>0</p>
                  <p>0</p>
                </div>
                <div>
                  <p class="text-red-5">(0)</p>
                  <p class="text-red-5">(0)</p>
                </div>
              </div>
              <div class="box-options">
                <q-btn padding="8px" flat color="primary" @click="showPredict">
                  <i class="fa-solid fa-futbol text-primary fa-xl"></i>
                </q-btn>
              </div>
            </div>
            <div class="box-matchs">
              <div class="index-number">3</div>
              <div class="box-team">
                <div>
                  <img class="img-team" src="src/assets/team1.jpg" alt="team1">
                  <p>Guadalajara</p>
                </div>
                <div>
                  <img class="img-team" src="src/assets/team2.jpg" alt="team1">
                  <p>Necaxa</p>
                </div>
              </div>
              <div class="box-result">
                <div>
                  <p>0</p>
                  <p>0</p>
                </div>
                <div>
                  <p class="text-red-5">(0)</p>
                  <p class="text-red-5">(0)</p>
                </div>
              </div>
              <div class="box-options">
                <q-btn padding="8px" flat color="primary" @click="showPredict">
                  <i class="fa-solid fa-futbol text-primary fa-xl"></i>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-4 q-px-md">
        <div class="name-quiniela">
          <p class="q-mb-none q-pl-md text-body2 text-weight-bold ellipsis">Lista de jugadores</p>
        </div>
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>
                <a href="">Jesús Rosales</a>
                <i class="fa-solid fa-circle-check text-secondary fa-xl q-mt-md q-ml-sm"></i>

              </q-item-label>
              <q-item-label caption lines="2">
                jesusrosales19@gmail.com
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>0/0</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>
                <a href="">Wendymar Daboin</a>
                <i class="fa-solid fa-circle-xmark text-red-5 fa-xl q-mt-md q-ml-sm"></i>
              </q-item-label>
              <q-item-label caption lines="2">
                daboinwendy@gmail.com
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>0/0</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
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

    @media screen and (max-width:500px) {
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

      @media screen and (max-width:500px) {
        display: none;

      }
    }

    .box-team {
      display: flex;
      flex-direction: column;

      &>div {
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

      @media screen and (max-width:500px) {
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