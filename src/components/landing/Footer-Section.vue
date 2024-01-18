<template>
  <div class="bg-dark text-white q-py-lg container-height">
    <section class="padding-container margin-x">
      <div class="row">
        <div class="col-12 col-md-3 mt-2">
          <div class="flex items-center justify-center full-height">
            <p class="text-bold text-h3">StarQuiniela</p>
          </div>
        </div>
        <div class="col-12 col-md-3 mt-2">
          <div class="flex justify-center items-center">
            <ul class="footer-list text-center text-lg-right">
              <li>
                <a href="#" class="footer-link text-bold text-h6">Descargar</a>
              </li>
              <q-btn
                color="secondary"
                class="footer-link text-bold text-h6"
                label="Google Play"
                outline
                @click="redirectToGooglePlay"
              >
                <img
                  src="/src/assets/icons/google-play.png"
                  class="google-play-icon q-ml-sm"
                />
              </q-btn>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-3 mt-2">
          <div class="flex justify-center items-center">
            <ul class="footer-list">
              <li>
                <a href="#" class="footer-link text-bold text-h6">
                  Redes Sociales
                </a>
              </li>
              <li>
                <a href="#" class="footer-link flex items-center">
                  <img
                    src="/src/assets/icons/facebook.png"
                    class="icon-footer q-mr-sm"
                  />
                  Facebook
                </a>
              </li>

              <li>
                <a href="#" class="footer-link flex items-center">
                  <img
                    src="/src/assets/icons/instagram.png"
                    class="icon-footer q-mr-sm"
                  />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-12 col-md-3">
          <div class="flex justify-center items-center">
            <ul class="footer-list text-center">
              <li>
                <a href="#" class="footer-link text-bold text-h6"> Contacto </a>
              </li>
              <li>
                <a href="#" class="footer-link flex items-center">
                  <img
                    src="/src/assets/icons/whatsapp.png"
                    class="icon-footer q-mr-sm"
                  />
                  +58 424 531 9348
                </a>
              </li>
              <li>
                <a href="#" class="footer-link flex items-center">
                  <img
                    src="/src/assets/icons/gmail.png"
                    class="icon-footer q-mr-sm"
                  />
                  CorreoElectronico@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="row q-py-md bg-dark border-footer-top">
    <div class="col-4">
      <p class="text-center q-mb-none text-white text-h7">
        ©2022 StarQuiniela Todos los derechos reservados
      </p>
    </div>
    <div class="col-7">
      <div class="flex justify-center items-center">
        <div
          class="d-inline"
          v-for="(item, index) in arrayButtons"
          :key="index"
        >
          <q-btn
            class="btn-flat"
            size="md"
            flat
            :label="item.label"
            @click="scrollToElement(item.idSection)"
          />
          <span class="vl" v-if="index !== arrayButtons.length - 1"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const arrayButtons = [
  {
    icon: 'home',
    label: 'Politica de Privacidad',
    class: 'btn-flat',
    idSection: 'top',
  },
  {
    icon: 'sports_soccer',
    label: 'Terminos y Condiciones',
    class: 'btn-flat',
    idSection: 'advantages',
  },
  {
    icon: 'important_devices',
    label: 'Sobre Nosotros',
    class: 'btn-flat',
    idSection: 'play',
  },
];
</script>

<style lang="scss" scope>
.google-play-icon {
  width: 24px; /* Ajusta el tamaño según sea necesario */
  height: 24px; /* Ajusta el tamaño según sea necesario */
}

.icon-footer {
  width: 20px;
  height: 20px;
}

.flex-column {
  flex-direction: column;
}

.logo-style {
  width: 150px;
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

.footer-list {
  list-style: none;
  padding: 0;
}

.footer-link {
  color: white;
  text-decoration: none;
}

.footer-list li {
  margin-bottom: 8px;
}

.footer-icons {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.footer-icon {
  width: 34px;
  height: 34px;
  border-bottom: transparent;
  color: #fff;
  font-size: 2.2rem;
}

.border-footer-top {
  border-top: 1px solid #fff;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
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
