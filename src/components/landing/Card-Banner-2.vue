<template>
  <div class="padding-container">
    <div class="bg-box transition" :class="box ? 'box-new box-h1' : 'bg-box'">
      <div class="row">
        <div class="col-12 col-sm-8 offset-md-1">
          <h1 class="text-h4 text-bold q-mb-md">
            <span class="material-icons text-yellow q-mb-sm">star</span>
            Conviértete en organizador
          </h1>
        </div>
        <div
          class="col-12 col-sm-2 flex justify-center align-center content-center"
        >
          <div class="btn-play mt-3">
            <button
              class="btn-in"
              @click="$router.push('/pages/login')"
              @mouseenter="addClass"
              @mouseleave="removeClass"
            >
              ¡Contactar!
              <div class="icon">
                <img class="balon-icon" src="balon.png" alt="" />
              </div>
            </button>
          </div>
        </div>
        <q-img class="tarjetas" src="/src/assets/copa.png" />
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
  border: 2px solid #fff;
  text-shadow: 2px 2px 1px #000;
  font-size: 1.4rem;
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

.btn-in {
  background: $white;
  color: #222;
  font-family: inherit;
  padding: 0.35em;
  padding-left: 1.2em;
  font-size: 20px;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  height: 2.8em;
  padding-right: 3.3em;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #7b52b9;
  }
}

.balon-icon {
  width: 40px;
  height: auto;
}

.btn-play {
  justify-content: left;
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
  right: 0.3em;
  transition: all 0.3s;
  border-radius: 4px;
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

/*------ Entre a 600px y 1023px ------*/

@media screen and (min-width: 601px) and (max-width: 1023px) {
  .bg-box {
    padding: 20px 15px;
    color: #fff;
  }

  h1 {
    text-align: center;
    font-size: 1.4rem;
  }
}

/*------ Menor a 600px ------*/

@media screen and (max-width: 600px) {
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

  h1 {
    font-size: 1.4rem;
    text-align: center;
  }
}
</style>
