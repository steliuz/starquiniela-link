<template>
  <div class="padding-container">
    <div class="bg-box transition" :class="box ? 'box-new box-h1' : 'bg-box'">
      <div class="row">
        <div class="col-12 col-md-8 offset-md-1">
          <h1 class="text-h4 text-bold q-mb-md">
            <span class="material-icons text-yellow q-mb-sm">star</span>
            Gana ingresos extras
          </h1>
          <p class="font-size mb-0">
            Crea tu propia quiniela rápido y totalmente exclusiva para que
            invites a tus amigos.
          </p>
        </div>
        <div
          class="col-12 col-md-2 flex justify-center align-center content-center"
        >
          <q-btn
            class="mt-2 text-primary px-5 py-1 btn-gratis"
            rounded
            :color="colorBtn"
            label="GRATIS"
            @mouseenter="addClass"
            @mouseleave="removeClass"
          >
          </q-btn>
        </div>
        <q-img class="tarjetas" src="/src/assets/coin.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// const props = defineProps(["title", "subtitle"]);

const box = ref(false);
console.log('box: ', box.value);

const addClass = () => {
  box.value = true;
};
const removeClass = () => {
  box.value = false;
};

const colorBtn = computed(() => {
  return box.value ? 'primary transition' : 'secondary transition';
});
</script>

<style lang="scss" scoped>
.transition {
  transition: all 0.3s ease-out;
}
.tarjetas {
  width: 120px;
  height: auto;
  position: absolute;
  right: -30px;
  bottom: -10px;
}
.padding-container {
  padding-right: 114px;
  padding-left: 114px;
}

.bg-box {
  background-color: #5c00bf;
  padding: 20px 0px;
  border-radius: 20px;
  color: #fff;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border: 2px solid #fff;
  position: relative;
}

.bg-box h1 {
  color: #fff;
}

.btn-gratis {
  width: 150px;
  padding: 10px 0;
  text-shadow: 2px 2px 1px #000;
  font-size: 1.4rem;
  border-radius: 8px;
}

.box-new {
  background-color: #fff !important;
  border: 2px solid #5c00bf;
  color: #222 !important;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4) !important;
}

.box-h1 h1 {
  color: #5c00bf !important;
}

.font-size {
  font-size: 1.5rem;
}

/*------ Entre a 600px y 1023px ------*/

@media screen and (min-width: 601px) and (max-width: 1023px) {
  .padding-container {
    padding-right: 10px;
    padding-left: 10px;
  }

  .bg-box {
    padding: 20px 15px;
    color: #fff;
  }
}

/*------ Menor a 600px ------*/

@media screen and (max-width: 600px) {
  .padding-container {
    padding-right: 10px;
    padding-left: 10px;
  }

  .bg-box {
    background-color: #5c00bf;
    padding: 20px 10px;
    border-radius: 20px;
    color: #fff;
  }

  .tarjetas {
    width: 100px;
    height: auto;
    position: absolute;
    right: -30px;
    bottom: -30px;
  }
}
</style>
