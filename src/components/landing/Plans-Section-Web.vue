<template>
  <section class="q-mt-xl q-mx-md gt-sm">
    <div class="text-h4 text-center text-primary text-bold q-mb-lg">Planes</div>
    <div class="q-pa-md flex justify-center">
      <q-markup-table class="table-price">
        <thead>
          <tr>
            <th></th>
            <th v-for="plan in dataPlans" :key="plan">
              <p
                class="q-mb-none text-bold text-grey-7 text-capitalize text-center text-h5"
              >
                {{ plan.title }}
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(description, index) in descriptionPlans" :key="index">
            <td>
              <p class="q-mb-none text-subtitle1">{{ description }}</p>
            </td>
            <td v-for="(plan, indexPlan) in dataPlans" :key="indexPlan">
              <div class="flex flex-center">
                <i
                  v-if="plan.checks.includes(index + 1)"
                  class="fa-regular fa-circle-check fa-2x text-secondary"
                >
                </i>
                <p v-else-if="index < 5">{{ plan.tickets }}</p>
                <div class="text-center" v-else>
                  <p class="q-mb-none text-bold">${{ plan.priceMXN }} MXN</p>
                  <p class="text-bold">
                    {{ plan.coins }}
                    {{ plan.coins == 1 ? 'Moneda' : 'Monedas' }}
                  </p>
                  <q-btn
                    :outline="indexPlan != 2"
                    :color="indexPlan == 2 ? 'secondary' : 'grey'"
                    square
                    label="Comprar"
                    unelevated
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { descriptionPlans, dataPlans } from 'src/helpers/infoPlans';
</script>

<style lang="scss" scoped>
.bold-heading {
  font-size: 2em;
  color: rgb(25, 97, 31);
}
.table-price {
  width: 1200px;
  box-shadow: 0px 0px transparent !important;

  tr {
    pointer-events: none;
  }
  th,
  td {
    border: 1px solid transparent !important;
  }
}

.my-card .buttom-card {
  margin-top: auto;
  text-align: center;
  display: block;
  margin: auto;
}
/*------ Entre a 600px y 1023px ------*/

@media screen and (min-width: 601px) and (max-width: 1023px) {
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
    height: auto;
    width: 100%;
    border: 5px solid $grey-11;
    border-radius: 10px;
  }

  .m-section {
    margin: 40px 0 70px 0;
  }
}
</style>
