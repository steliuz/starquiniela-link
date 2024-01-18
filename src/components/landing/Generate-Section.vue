<template>
  <!-- <div >
    <q-parallax>
      <template v-slot:media>
        <img src="/src/assets/parallax1.jpg">
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute column items-center justify-start"
          :style="{
            opacity: 0.95 + (1 - scope.percentScrolled) * 0.85,
            top: (scope.percentScrolled * 50) + '%',
            left: 0,
            right: 0,
          }"
        >
          <div class="text-h3 text-white text-center text-bold text-shadow">¿Como generar ingresos?</div>
         
          <ul class="text-list">
            <li><i class="fa-regular fa-circle-check fa-beat q-pr-md fa-lg" style="color:yellow"></i>Invita a tus amigos</li>
            <li><i class="fas fa-share-alt fa-beat q-pr-md fa-lg" style="color:yellow"></i>Comparteles la manera de jugar</li>
            <li><i class="fas fa-crosshairs fa-beat q-pr-md fa-lg" style="color:yellow"></i>tu eliges tu recaudación, nosotros te brindamos la app</li>
            <li><i class="fas fa-percent fa-beat q-pr-md fa-lg" style="color:yellow"></i>Coloca el % de ingreso o ganancia y listo.</li>
          </ul>
        </div>
      </template>
    </q-parallax>
  </div> -->

  <div class="q-">
    <q-parallax>
      <template v-slot:media>
        <img class="q-mb-lg" src="/src/assets/parallax4.jpg">
      </template>

      <template v-slot:content="scope">
        <div
          class="absolute column items-center"
          :style="{
            opacity: 0.95 + (1 - scope.percentScrolled) * 0.55,
            top: (scope.percentScrolled * 60) + '%',
            left: 0,
            right: 0
          }"
        >
          <div class="text-h3 text-white text-center text-bold text-shadow">¿Como generar ingresos?</div>
         
          <ul class="text-list">
            <li><i class="fa-regular fa-circle-check fa-beat q-pr-md fa-lg" style="color:#f2c037"></i>Invita a tus amigos</li>
            <li><i class="fas fa-share-alt fa-beat q-pr-md fa-lg" style="color:#f2c037"></i>Comparteles la manera de jugar</li>
            <li><i class="fas fa-crosshairs fa-beat q-pr-md fa-lg" style="color:#f2c037"></i>Tu eliges tu recaudación, nosotros te brindamos la app</li>
            <li><i class="fas fa-percent fa-beat q-pr-md fa-lg" style="color:#f2c037"></i>Coloca el % de ingreso o ganancia y listo.</li>
          </ul>
        </div>
      </template>
    </q-parallax>
  </div>
</template>

<style scoped>
.text-list {
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
}

.text-list li {
  margin: 15px 0;
  font-size: 1.6rem;
  color: #fff;
   text-shadow: 0px 2px 1px rgba(10, 0, 0, 1);
}

.text-shadow {
  text-shadow: 0px 2px 1px rgba(10, 0, 0, 1);
}
</style>
