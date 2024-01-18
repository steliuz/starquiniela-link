<template>
  <div class="padding-container-step">
    <div>
      <p class="text-center text-tittle q-mb-md">Juega tu primera QUINIELA</p>
      <p class="text-center subtittle-black">
        Para obtener un usuario <b>ORGANIZADOR</b> comunicate con
        <a href="">NOSOTROS</a> o consigue un <b>RESELLER</b>
      </p>
    </div>
    <div class="row q-pt-lg">
      <div class="col-12 col-md-6 q-pl-lg-lg">
        <div class="flex items-center">
          <p class="text-h5 q-pl-md text-weight-medium q-mb-none">
            StarQuiniela Original
          </p>
          <q-btn
            class="q-ml-md"
            outline
            color="secondary"
            label="Jugar ahora"
          />
        </div>

        <q-stepper
          v-model="step"
          vertical
          animated
          header-nav
          inactive-color="grey-5"
          active-color="secondary"
        >
          <q-step
            :name="1"
            title="Selecciona tu QUINIELA"
            icon="fas fa-pencil"
            :done="step > 1"
          >
            <p class="text-style q-mt-md">
              Con tu usuario organizador podras entrar y Tendrás una
              <b class="text-bold">
                lista actualizada de quinielas disponibles
              </b>
              para jugar en diferentes formatos de reglas, selecciona y compra
              la quiniela de tu preferencia.
            </p>
          </q-step>
          <q-step
            :name="2"
            title="Jugadores"
            icon="fas fa-plus"
            :done="step > 2"
          >
            <p class="text-style">
              Crea usuarios personalizados para tus amigos, familiares o
              personas de tu grupo social,
              <b> tu eres el encargado de darle acceso a tu quiniela,</b>
              tus jugadores solo podran ver las quinielas que tu vayas
              seleccionando.
            </p>

            <q-stepper-navigation>
              <!-- <q-btn @click="step = 3" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" /> -->
            </q-stepper-navigation>
          </q-step>
          <q-step
            :name="3"
            title="Juega fácil y seguro"
            icon="fa fa-lock"
            :done="step > 3"
          >
            <p class="text-style">
              <b>Ya no te preocupes por la captura de datos</b>, tus jugadores
              solo deben entrar a la app con su ususario, cada jugador debe
              anotar sus pronosticos y nuestra aplicacion hara el resto.
            </p>

            <q-stepper-navigation>
              <!-- <q-btn @click="step = 4" color="primary" label="Continue" />
          <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" /> -->
            </q-stepper-navigation>
          </q-step>
          <q-step
            :name="4"
            title="Tabla de ranking"
            icon="fas fa-table"
            :done="step > 4"
          >
            <p class="text-style">
              Cada quiniela cuenta con una
              <b>Tabla de ranking</b> individual organizada y automatizada, Solo
              debes anotar los resultados de cada partido y <b>¡LISTO!</b>, ya
              no debes calcular nada más.
            </p>

            <q-stepper-navigation>
              <!-- <q-btn color="primary" label="Finish" />
          <q-btn flat @click="step = 3" color="primary" label="Back" class="q-ml-sm" /> -->
            </q-stepper-navigation>
          </q-step>
          <q-step :name="5" title="Y a ¡JUGAR!" icon="fas fa-futbol ">
            <p class="text-style">
              Y con estos pasos es hora disdfrutar y divertirte junto a tus
              amigos ¡DIVIERTETE! ¿Quieres armar tu propia quiniela?
            </p>
            <q-stepper-navigation>
              <q-btn color="secondary" label="Adquiere tu organizador" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
      <div class="col-12 col-md-6 q-pl-lg-lg">
        <div class="flex items-center">
          <p class="text-dark text-h5 q-pl-md text-weight-medium q-mb-none">
            StarQuiniela 2.0
          </p>
          <q-btn
            unelevated
            class="q-ml-md"
            color="negative"
            label="Jugar ahora"
            square
          />
        </div>
        <q-stepper
          v-model="step2"
          vertical
          animated
          inactive-color="grey-5"
          active-color="negative"
          header-nav
        >
          <q-step
            :name="1"
            title="Selecciona tu QUINIELA"
            icon="fas fa-pencil"
            :done="step > 1"
          >
            <p class="text-style q-mt-md">
              Con tu usuario organizador podras entrar y Tendrás una
              <b class="text-bold">
                lista actualizada de quinielas disponibles
              </b>
              para jugar en diferentes formatos de reglas, selecciona y compra
              la quiniela de tu preferencia.
            </p>
          </q-step>
          <q-step :name="2" title="QR" icon="fas fa-qrcode" :done="step2 > 2">
            <p class="text-style">
              Comparte tu quinela a traves de tu
              <span class="text-bold">codigo QR</span>
            </p>

            <q-stepper-navigation>
              <!-- <q-btn @click="step2 = 3" color="primary" label="Continue" />
          <q-btn flat @click="step2 = 1" color="primary" label="Back" class="q-ml-sm" /> -->
            </q-stepper-navigation>
          </q-step>
          <q-step
            :name="3"
            title="Accede"
            icon="fas fa-running"
            :done="step2 > 3"
          >
            <p class="text-style">
              Accede a
              <span class="text-bold">estadísticas avanzadas y análisis</span>
              de rendimiento para tomar decisiones informadas al hacer tus
              pronósticos.
            </p>

            <q-stepper-navigation>
              <!-- <q-btn @click="step2 = 4" color="primary" label="Continue" />
          <q-btn flat @click="step2 = 2" color="primary" label="Back" class="q-ml-sm" /> -->
            </q-stepper-navigation>
          </q-step>
          <q-step
            :name="4"
            title="Comunidad"
            icon="fas fa-users"
            :done="step > 4"
          >
            <p class="text-style">
              Forma parte de una
              <span class="text-bold">comunidad activa de jugadores</span>,
              comparte tus éxitos y compite por el primer lugar en el ranking.
            </p>

            <q-stepper-navigation>
              <!-- <q-btn color="primary" label="Finish" /> -->
              <!-- <q-btn flat @click="step2 = 3" color="primary" label="Back" class="q-ml-sm" /> -->
            </q-stepper-navigation>
          </q-step>
          <q-step :name="5" title="Y a ¡JUGAR!" icon="fas fa-futbol ">
            <p class="text-style">
              Y con estos pasos es hora disdfrutar y divertirte junto a tus
              amigos ¡DIVIERTETE! ¿Quieres armar tu propia quiniela?
            </p>
            <q-stepper-navigation>
              <q-btn color="secondary" label="Adquiere tu organizador" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const step = ref(1);
const step2 = ref(1);
</script>

<style lang="scss" scoped>
.padding-container-step {
  padding-right: 10%;
  padding-left: 10%;
}

.q-stepper {
  border-radius: 4px;
  background: #fff;
  box-shadow: none;
}

.text-tittle {
  color: #5c00be;
  font-weight: 700;
  font-size: 3rem;
  line-height: 2.5rem;
}

.subtittle-black {
  color: #000;
  font-weight: 300;
  font-size: 1.2rem;
  line-height: 2.5rem;
}

.text-style {
  font-size: 16px;
}
</style>
