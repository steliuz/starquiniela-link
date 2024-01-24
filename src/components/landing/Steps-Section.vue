<template>
  <div class="padding-container">
    <div>
      <p class="text-center text-tittle q-mb-md">Juega tu primera QUINIELA</p>
      <p class="text-center subtittle-black">
        Obtén tu usuario <b>ORGANIZADOR</b> comunicándote con
        <a href="#">NOSOTROS</a> o consigue un <b>RESELLER</b> autorizado.
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
            @click="goToV1"
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
              Con tu usuario organizador, accede a una lista actualizada de
              quinielas disponibles en diversos formatos de reglas. Selecciona y
              adquiere la quiniela que más te apasione.
            </p>
            <p class="text-style q-mt-md">
              ¡Sumérgete en la emoción de las apuestas y compite por grandes
              premios con amigos y seguidores!"
            </p>
          </q-step>
          <q-step
            :name="2"
            title="Jugadores"
            icon="fas fa-plus"
            :done="step > 2"
          >
            <p class="text-style">
              <strong>¡Hazlo social! </strong> Crea usuarios personalizados para
              tus amigos, familiares o compañeros de tu grupo social. Tú eres el
              encargado de proporcionarles acceso a tu quiniela exclusiva. Solo
              podrán visualizar las quinielas que tú selecciones.
            </p>
            <p class="text-style">
              Comparte la emoción del juego y compite junto a tus seres
              queridos. ¡La diversión es aún mejor cuando se comparte!"
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
              ¡Olvida las preocupaciones sobre la captura de datos! Tus
              jugadores simplemente deben ingresar a la aplicación con su
              usuario. Cada participante anota sus pronósticos y ¡nuestra
              aplicación se encarga del resto!
            </p>
            <p class="text-style">
              Facilitamos el proceso para que te enfoques en la emoción del
              juego. ¡Disfruta de una experiencia sin complicaciones y juega con
              confianza!"
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
              En cada quiniela, disfruta de una Tabla de Ranking individual
              organizada y automatizada. ¡Simplemente anota los resultados de
              cada partido y listo! No te preocupes por cálculos complicados,
              nuestra aplicación se encarga de todo.
            </p>
            <p class="text-style">
              Mantente actualizado con las posiciones y vive la emoción de ver
              cómo avanzas en la clasificación. ¡La competencia nunca fue tan
              sencilla y emocionante!"
            </p>
          </q-step>
          <q-step :name="5" title="Y a ¡JUGAR!" icon="fas fa-futbol ">
            <p class="text-style">
              Con estos simples pasos, es hora de disfrutar y divertirte junto a
              tus amigos. ¡La emoción está a punto de comenzar! ¿Listo para
              armar tu propia quiniela?
            </p>
            <p class="text-style">
              Haz clic para empezar la diversión y vive la emoción de competir
              con tus seres queridos. ¡Que empiece el juego!"
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
            @click="$router.push('/login')"
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
              Con tu usuario organizador, accede a una lista actualizada de
              quinielas disponibles en diversos formatos de reglas. Selecciona y
              adquiere la quiniela que más te apasione.
            </p>
            <p class="text-style q-mt-md">
              ¡Sumérgete en la emoción de las apuestas y compite por grandes
              premios con amigos y seguidores!"
            </p>
          </q-step>
          <q-step :name="2" title="QR" icon="fas fa-qrcode" :done="step2 > 2">
            <p class="text-style">
              <strong>¡Actualización emocionante!</strong> En
              <span class="text-primary">Starquiniela 2.0,</span>
              compartir tu quiniela es aún más fácil. Utiliza tu código QR
              exclusivo o comparte el enlace directo con tus amigos. No es
              necesario crear usuarios; ellos pueden acceder directamente y
              sumarse a la diversión.
            </p>
            <p class="text-style">
              Simplificamos el proceso para que disfrutes de la quiniela sin
              complicaciones.
            </p>
          </q-step>
          <q-step
            :name="3"
            title="Notificaciones Automáticas"
            icon="fas fa-running"
            :done="step2 > 3"
          >
            <p class="text-style">
              <strong>¡Tú tienes el control!</strong> Con nuestra última
              versión, eres el maestro de los tickets que formarán parte de la
              tabla de clasificación de tu quiniela. Cada vez que actives un
              ticket, nuestro sistema enviará automáticamente una notificación
              directamente a su número telefónico con toda la información
              necesaria.
            </p>

            <p class="text-style">
              Gestiona tus participantes de manera sencilla y mantén a todos
              actualizados con un toque personal. ¡La emoción está a solo un
              clic de distancia!"
            </p>
          </q-step>
          <q-step
            :name="4"
            title="Tabla de ranking"
            icon="fas fa-table"
            :done="step > 4"
          >
            <p class="text-style">
              En cada quiniela, disfruta de una Tabla de Ranking individual
              organizada y automatizada. ¡Simplemente anota los resultados de
              cada partido y listo! No te preocupes por cálculos complicados,
              nuestra aplicación se encarga de todo.
            </p>
            <p class="text-style">
              Mantente actualizado con las posiciones y vive la emoción de ver
              cómo avanzas en la clasificación. ¡La competencia nunca fue tan
              sencilla y emocionante!"
            </p>
          </q-step>
          <q-step :name="5" title="Y a ¡JUGAR!" icon="fas fa-futbol ">
            <p class="text-style">
              Con estos simples pasos, es hora de disfrutar y divertirte junto a
              tus amigos. ¡La emoción está a punto de comenzar! ¿Listo para
              armar tu propia quiniela?
            </p>
            <p class="text-style">
              Haz clic para empezar la diversión y vive la emoción de competir
              con tus seres queridos. ¡Que empiece el juego!"
            </p>
            <q-stepper-navigation>
              <q-btn color="negative" label="Adquiere tu organizador" />
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
const step2 = ref(2);

const goToV1 = () => {
  window.location.href = 'https://private.starquiniela.com/pages/login';
};
</script>

<style lang="scss" scoped>
.q-stepper {
  border-radius: 4px;
  background: #fff;
  box-shadow: none;
}

.text-style {
  font-size: 16px;
}
</style>
