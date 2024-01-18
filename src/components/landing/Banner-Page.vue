<template>
  <div>
    <section class="bg">
      <div class="column position-title absolute">
        <div class="lt-sm">
          <div class="flex justify-center mb-5">
            <button class="btn-in" @click="$router.push('/pages/login')">
              ¡JUGAR!
              <div class="icon">
                <img class="balon-icon" src="balon.png" alt="" />
              </div>
            </button>
          </div>
          <h3 class="text-white h3-banner">JUEGA , COMPITE Y DIVIÉRTETE</h3>
          <h4 class="text-white pb-2 lt-sm">
            ¡Nunca fue tan sencillo jugar con tus amigos!
          </h4>
          <div class="text-center">
            <q-btn
              class="bg-contact mx-2 my-1 p-0"
              color="dark"
              label="Descargar"
              @click="$router.push('/redirect')"
            >
              <q-icon class="text-dark" size="md">
                <img class="play-store-icon" src="playstore.png" />
              </q-icon>
            </q-btn>
            <q-btn
              class="bg-contact mx-2 my-1 p-0"
              color="dark"
              icon-right="email"
              label="Contáctanos"
              @click="$router.push('/pages/register')"
            >
            </q-btn>
          </div>
        </div>
        <div class="gt-sm">
          <h3 class="text-white h3-banner">JUEGA , COMPITE Y DIVIÉRTETE</h3>
          <h4 class="text-white pb-2 lt-sm">
            ¡Nunca fue tan sencillo jugar con tus amigos!
          </h4>
          <h4 class="text-white pb-2 gt-sm">
            ¡Nunca fue tan sencillo jugar con tus amigos!
          </h4>
          <div class="btn-play mt-3 gt-xs">
            <button class="btn-in" @click="$router.push('/pages/login')">
              ¡JUGAR!
              <div class="icon">
                <img class="balon-icon" src="balon.png" alt="" />
              </div>
            </button>
          </div>
          <!-- <div class="text-center">
              <q-btn class="bg-contact mx-2 p-0" color="dark" label="Descargar" @click="$router.push('/redirect')">
                <q-icon class="text-dark" size="md">
                  <img class="play-store-icon" src="~assets/images/login/playstore.png" />
                </q-icon>
              </q-btn>
              <q-btn class="bg-contact mx-2 p-0" color="dark" icon-right="email" label="Contáctanos"
                @click="$router.push('/pages/register')">
              </q-btn>
            </div> -->
        </div>
        <!-- <div class="gt-ms">
            <h3 class="text-white h3-banner">JUEGA , COMPITE Y DIVIÉRTETE</h3>
            <h4 class="text-white pb-2 lt-sm">
              ¡Nunca fue tan sencillo jugar con tus amigos!
            </h4>
            <h4 class="text-white pb-2 gt-sm">
              ¡Nunca fue tan sencillo jugar con tus amigos!
            </h4>
            <div class=" btn-play mt-3 gt-xs">
              <button class="btn-in " @click="$router.push('/pages/login')">
                ¡JUGAR!
                <div class="icon ">
                  <img class="balon-icon" src="@/assets/images/login/balon.png" alt="" />
                </div>
              </button>
            </div>
          </div> -->
      </div>
      <!-- <div class="buttons-group text-center">
        <div class="gt-xs">
          <q-btn
            class="bg-contact mx-2 p-0"
            color="dark"
            label="Descargar"
            @click="$router.push('/redirect')"
          >
            <q-icon class="text-dark" size="md">
              <img class="play-store-icon" src="playstore.png" />
            </q-icon>
          </q-btn>
          <q-btn
            class="bg-contact mx-2 p-0"
            color="dark"
            icon-right="email"
            label="Contáctanos"
            @click="$router.push('/pages/register')"
          >
          </q-btn>
        </div>
      </div> -->
      <div class="bg-header">
        <q-img class="lt-sm" src="vertical2.jpg" />
        <!-- <div class="lt-md" style="height: 400px"></div> -->
        <!-- <q-img class="lt-md" src="@/assets/images/login/vertical.jpg" /> -->
        <q-img class="gt-xs height-banner" src="wall.jpg" />
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bg {
  position: relative;
}
.height-banner {
}

.bg-header {
  margin-top: 0px;
  /* background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)),
        url('~@/assets/images/login/copas.jpg'); */
  height: 435px;
}

.h3-banner {
  /* background: rgba(255, 255, 255, 1); */
  border-radius: 10px;
  padding: 5px 0px;
  font-weight: bold;
}

.btn-play {
  justify-content: left;
}

.btn-entrar {
  width: 100px;
  padding: 10px;

  &:hover {
    transform: scale(1.1);
    background-color: #fff;
    color: black;
  }
}

.bg-contact {
  border-radius: 10px;
}

.title-font {
  font-size: 4rem;
  font-weight: bold;
}

.position-title {
  text-align: center;
  max-width: 450px;
  margin: auto;
  top: 20%;
  left: 5%;
  z-index: 2;
}

.btn-in {
  background: $secondary;
  color: #222;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 17px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 1.6em -0.6em #714da6;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;
}

.balon-icon {
  width: 40px;
  height: auto;
}

.play-store-icon {
  width: 20px;
  height: auto;
}

.btn-in .icon {
  background: $white;
  margin-left: 1em;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2em;
  width: 2.2em;
  border-radius: 0.7em;
  box-shadow: 0.1em 0.1em 0.6em 0.2em #00a050;
  right: 0.3em;
  transition: all 0.3s;
  border-radius: 8px;
}

.btn-in:hover .icon {
  width: calc(100% - 0.6em);
}

.btn-in:hover .balon-icon {
  animation-name: rotate;
  animation-duration: 2s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

.btn-in .icon svg {
  width: 1.1em;
  transition: transform 0.3s;
  color: #7b52b9;
}

.btn-in:hover .icon svg {
  transform: translateX(0.1em);
}

.btn-in:active .icon {
  transform: scale(0.95);
}

.buttons-group {
  position: absolute;
  left: 0;
  right: 0;
  top: 60%;
  z-index: 10;
}

/* =========================
  ---------Responsive---------
  ============================*/

/*------ Mayor a 1023px ------*/

@media screen and (min-width: 1024px) {
  .position-title {
    text-align: left;
    top: 15%;
    max-width: 450px;
  }

  .title-font {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .buttons-group {
    top: 75%;

    .btn-play {
      justify-content: left;
    }
  }
}

/*------ Entre a 1025px y 1300px ------*/

@media screen and (min-width: 1024px) and (max-width: 1200px) {
  .position-title {
    text-align: left;
    top: 15%;
    max-width: 380px;
  }
}

/*------ Entre a 600px y 1023px ------*/

@media screen and (min-width: 601px) and (max-width: 1023px) {
  .position-title {
    text-align: left;
    top: 20%;
    left: 5%;
    margin: 0;
    max-width: 350px;
  }

  .btn-in {
    background: $secondary;
    color: #222;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 1.2em;
    font-size: 17px;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    position: relative;
    height: 2.6em;
    padding-right: 3.3em;
    cursor: pointer;
  }

  .title-font {
    font-size: 2rem;
    font-weight: bold;
  }

  .buttons-group {
    top: 73%;
  }

  .btn-play {
    justify-content: left;
  }

  .bg-header {
    margin-top: -45px;
    height: 70%;
  }
}

/*------ Menor a 600px ------*/

@media screen and (max-width: 600px) {
  .position-title {
    text-align: center;
    padding: 20px;
    right: 0;
    top: 15%;
    left: 0px;
    margin: auto;
  }

  .title-font {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .buttons-group {
    top: 45%;
  }

  .btn-play {
    justify-content: center;
  }
}
</style>
