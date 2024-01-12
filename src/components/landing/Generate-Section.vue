<template>
  <div class="bg-white text-black py-5 container-height">
    <section class="padding-container margin-x" id="income">
      <div class="row">
         <div class="text-center">
          <img class="img-cellphone" src="/src/assets/cellphone.png" />
        </div>
        <div class="col-12 col-sm-6 mt-2">
          <q-list>
            <q-item-label header>
              <h5 class="text-gray text-bold q-my-none">Como generar ingresos</h5>
              <!-- <p class="text-white mb-0">Quiniela</p> -->
            </q-item-label>
            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Quiniela normal</q-item-label>
                <q-item-label lines="7" class="line">
                  <b class="text-yellow">Regla de 1 y 3 puntos</b> , esta regla
                  consiste en que el jugador llenan sus pronósticos, si acierta
                  <b>GANADOR</b> y <b>MARCADOR</b> se le dan 3 puntos, si solo
                  acierta al GANADOR recibe 1 punto.
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator class="bg-white" spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Quiniela Avanzada</q-item-label>
                <q-item-label lines="7" class="line">
                  <b class="text-yellow">Regla de 15 puntos</b>, los jugadores
                  colocan sus pronósticos, el jugador acierta el marcador,
                  recibe 15 puntos, si solo acierta al ganador es en base a 10
                  puntos, y se le restará 1 punto por diferencia de goles entre
                  el Resultado final y pronósticos.
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-separator class="bg-white" spaced inset />

            <q-item>
              <q-item-section>
                <q-item-label class="text-bold">Quiniela LEV</q-item-label>
                <q-item-label lines="7" class="line">
                  <b class="text-yellow">Regla de 1 punto</b>, Consiste en
                  acertar al ganador de local, visitante o al empate.
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
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

.img-cellphone {
    width: 400px;
}
.padding-container {
  padding-right: 34px;
  padding-left: 34px;
}

.margin-x {
  margin-left: 2rem;
  margin-right: 2rem;
}

.line {
  line-height: 1.5 !important;
}

/*------ Entre a 600px y 1023px ------*/

@media screen and (min-width: 601px) and (max-width: 1023px) {
  .padding-container {
    padding-right: 10px;
    padding-left: 10px;
  }
}

/*------ Menor a 600px ------*/

@media screen and (max-width: 600px) {
  .padding-container {
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
