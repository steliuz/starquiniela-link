<script setup>
import videoIngreso from 'src/assets/videos/video-ingresos.mp4';
</script>
<template>
  <div class="q-">
    <q-parallax>
      <template v-slot:media>
        <div>
          <video autoplay muted loop>
            <source :src="videoIngreso" type="video/mp4" />
            Tu navegador no admite la reproducción de videos.
          </video>

          <div class="overlay"></div>
        </div>
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute items-center box-parallax"
          :style="{
            opacity: 0.75 + (1 - scope.percentScrolled) * 0.55,
            top: scope.percentScrolled * 60 + '%',
            left: 0,
            right: 0,
          }"
        >
          <div
            class="parallax-text-title text-white text-center text-bold text-shadow"
          >
            ¡Transforma la diversión en ganancias a tu medida!
          </div>

          <h6 class="parallax-text-content container text-white text-shadow">
            Invita a tus amigos a unirse a la diversión y comparte la
            experiencia de jugar en nuestra plataforma. Tú tienes el control
            total: elige tu propia recaudación y establece el porcentaje de
            ingresos o ganancias que deseas. Nosotros te proporcionamos la
            aplicación y tú disfrutas de las ganancias
          </h6>
        </div>
      </template>
    </q-parallax>
  </div>
</template>

<style lang="scss" scoped>
video {
  object-fit: cover;
  width: 100%;
  height: 100%;
  background-position: center center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4));
}

.text-shadow {
  text-shadow: 0px 2px 1px rgba(10, 0, 0, 1);
}
.box-parallax {
  padding: 0% 15%;
  text-align: center;

  .parallax-text-title {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .parallax-text-content {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 600px) {
    padding: 0% 5%;

    .parallax-text-title {
      font-size: 1.5rem;
      margin-bottom: 0.7rem;
    }

    .parallax-text-content {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
