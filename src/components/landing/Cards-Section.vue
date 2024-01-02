<template>
  <section class="q-mt-md">
    <div class="row">
      <div
        class="col-12 col-sm-6 col-md-3 flex justify-center items-start"
        v-for="(item, index) in arrayAdvantages"
        :key="index"
      >
        <div class="card-info">
          <div>
            <i
              class="fa-solid fa-5x q-my-sm"
              :class="
                $q.dark.isActive
                  ? `text-secondary ${item.icon}`
                  : `text-secondary ${item.icon}`
              "
            >
            </i>
          </div>
          <hr />
          <div>
            <p class="text-h5">{{ item.title }}</p>
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const arrayAdvantages = [
  {
    title: 'Fácil de usar',
    icon: 'fa-mobile',
    description: 'Aplicación web y móvil en linea 24/7',
  },
  {
    title: 'Seguridad',
    icon: 'fa-square-check',
    description:
      'Ya puedes olvidarte de las tediosas capturas, STARQUINIELA organiza todo por ti',
  },
  {
    title: 'Ranking',
    icon: 'fa-calculator',
    description:
      'Ya no te preocupes más por la suma con nuestra tabla tabla de ranking',
  },
  {
    title: 'Ahorra dinero',
    icon: 'fa-coins',
    description: 'Evita los costos adicionales de impresión',
  },
];
</script>

<style lang="scss" scoped>
.cardContent {
  -webkit-box-shadow: 5px 5px 10px #e4e4e4, -5px -5px 10px #ffffff;
  -moz-box-shadow: 5px 5px 10px #e4e4e4, -5px -5px 10px #ffffff;
  box-shadow: 5px 5px 10px #e4e4e4, -5px -5px 10px #ffffff;
}

.m-section {
  margin-top: 40px;
  padding-bottom: 40px;
}

.my-card {
  height: 110px;
  width: 75%;
  border: 5px solid $grey-11;
  border-radius: 10px;
}

.box-cards {
  display: grid;
  grid-template-columns: repeat(4, 0.25fr);
}

.card-info {
  padding: 20px;
  max-width: 230px;
}

.icon-size {
  font-size: 2.8rem;
}

.font-card {
  font-size: 1.1rem;
}

.padding-container {
  padding-right: 34px;
  padding-left: 34px;
}

.font-title {
  font-size: 5rem;
}

// @media screen and (min-width: 1024px) and (max-width: 1200px) {
//   .m-section {
//     margin: 60px 0 70px 0;
//   }
// }

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

  .font-title {
    font-size: 2.7rem;
  }

  .icon-size {
    font-size: 3rem;
  }

  .m-section {
    margin: -60px 0 70px 0;
  }

  .my-card {
    height: auto;
    width: 80%;
    border: 5px solid $grey-11;
    border-radius: 10px;
  }
}

/*------ Menor a 600px ------*/

@media screen and (max-width: 600px) {
  .padding-container {
    padding-right: 10px;
    padding-left: 10px;
  }

  .font-title {
    font-size: 2.7rem;
  }

  .icon-size {
    font-size: 3.8rem;
  }

  .my-card {
    height: 120px;
    width: 100%;
    border: 5px solid $grey-11;
    border-radius: 10px;
  }

  .m-section {
    margin: 40px 0 70px 0;
  }
}
</style>
