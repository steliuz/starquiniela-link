<template>
  <div class="bg-primary text-white q-py-lg container-height">
    <section class="padding-container margin-x">
      <div class="row">
        <!-- <div class="col-12 col-sm-6 mt-2">
          <q-list>
            <q-item-label header>
              <h5 class="text-yellow text-bold q-my-none">
                Niveles de Quiniela
              </h5>
            </q-item-label>
            <div v-for="(item, index) of plans" :key="index">
              <q-item>
                <q-item-section>
                  <q-item-label class="">{{ item.name }}</q-item-label>
                  <q-item-label caption lines="2">
                    <div class="text-yellow">
                      <q-icon
                        v-for="(star, index) of item.stars"
                        name="star"
                        :key="index"
                      />
                    </div>
                  </q-item-label>
                </q-item-section>

                <q-item-section side top class="text-center">
                  <q-icon name="local_activity" color="white" />
                  <q-item-label caption>
                    <h6 class="text-white q-my-none">{{ item.tickets }}</h6>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator class="bg-white" spaced inset />
            </div>
          </q-list>
        </div> -->
        <div class="marginvip">
          <div class="col-12 mt-2">
            <q-list>
              <q-item-label header>
                <h5 class="text-yellow text-bold q-my-none text-center text-h3">
                  Tipos de quiniela
                </h5>
              </q-item-label>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-bold text-h5">
                    Quiniela normal
                  </q-item-label>
                  <q-item-label lines="7" class="line">
                    <b class="text-yellow">Regla de 1 y 3 puntos</b> , esta
                    regla consiste en que el jugador llenan sus pronósticos, si
                    acierta <b>GANADOR</b> y <b>MARCADOR</b> se le dan 3 puntos,
                    si solo acierta al GANADOR recibe 1 punto.
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator class="bg-white" spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-bold text-h5"
                    >Quiniela Avanzada</q-item-label
                  >
                  <q-item-label lines="7" class="line">
                    <b class="text-yellow">Regla de 15 puntos</b>, los jugadores
                    colocan sus pronósticos, el jugador acierta el marcador,
                    recibe 15 puntos, si solo acierta al ganador es en base a 10
                    puntos, y se le restará 1 punto por diferencia de goles
                    entre el Resultado final y pronósticos.
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-separator class="bg-white" spaced inset />

              <q-item>
                <q-item-section>
                  <q-item-label class="text-bold text-h5"
                    >Quiniela LEV</q-item-label
                  >
                  <q-item-label lines="7" class="line">
                    <b class="text-yellow">Regla de 1 punto</b>, Consiste en
                    acertar al ganador de local, visitante o al empate.
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const plans = [
  {
    name: 'Quiniela Básica',
    tickets: '20 tickets',
    stars: 1,
  },
  {
    name: 'Quiniela Bronce',
    tickets: '50 tickets',
    stars: 2,
  },
  {
    name: 'Quiniela Plata',
    tickets: '100 tickets',
    stars: 3,
  },
  {
    name: 'Quiniela Oro',
    tickets: '300 tickets',
    stars: 4,
  },
  {
    name: 'Quiniela Platino',
    tickets: 'Ilimitados',
    stars: 5,
  },
];
</script>

<style lang="scss" scoped>
.marginvip {
  margin-right: 20%;
  margin-left: 20%;
}
.margin-x {
  margin-left: 2rem;
  margin-right: 2rem;
}

.line {
  line-height: 1.5 !important;
  font-size: 18px;
}

@media screen and (max-width: 800px) {
  .padding-container {
    padding: 0;
  }

  .marginvip {
    margin-right: 10%;
    margin-left: 10%;
  }
}
</style>
