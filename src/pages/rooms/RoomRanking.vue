<template>
  <section class="q-mt-md q-px-sm">
    <div class="flex justify-end">
      <q-btn
        class="px-3"
        flat
        color="red-5"
        label="Regresar"
        @click="$router.go(-1)"
      />
    </div>

    <!-- <aside>
      <div class="q-pa-md">
        <q-table
          separator="cell"
          dark
          class="table-custom-columns bg-table"
          flat
          bordered
          dense
          :rows="rows"
          :columns="columns"
        />
      </div>
    </aside> -->
    <aside>
      <div class="pp mt-2 text-center hg_table">
        <table>
          <thead>
            <tr>
              <th class="text-center name1 bg-header-dark">
                <div class="q-px-xs">Jugador</div>
              </th>
              <th class="name2 text-center bg-header-dark">
                <div class="q-px-xs">Pts</div>
              </th>
              <template v-for="(team, index) of teams" :key="index">
                <th>
                  <div class="full-width full-height flex flex-center">
                    {{ index + 1 }}
                  </div>
                </th>
                <th class="text-center th-custom">
                  <div class="m-0 q-pa-none text-center">
                    <q-avatar size="30px">
                      <img :src="team.teamAvatar1" />
                      <q-tooltip>
                        <span class="text-capitalize">
                          {{ team.teamName1 }}</span
                        >
                      </q-tooltip>
                    </q-avatar>
                    <div class="text-center flex justify-center">
                      <p class="gols">{{ team.teamGol1 }}</p>
                    </div>
                  </div>
                </th>
                <th class="text-center th-custom2">
                  <div class="m-0 q-pa-none text-center">
                    <q-avatar size="30px">
                      <img :src="team.teamAvatar2" />
                      <q-tooltip>
                        <span class="text-capitalize">
                          {{ team.teamName2 }}
                        </span>
                      </q-tooltip>
                    </q-avatar>
                    <div class="text-center flex justify-center">
                      <p class="gols">{{ team.teamGol2 }}</p>
                    </div>
                  </div>
                </th>
              </template>
              <!-- <th v-for="(header, index) in headers" :key="index"></th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <td class="sticky-left">
                <div class="text-name-player">Lester Douglas</div>
              </td>
              <td class="name2 bg-orange-6 text-black text-bold">
                <div class="flex flex-center">9</div>
              </td>
              <td
                v-for="(result, index) in teams.length * 2 + 2"
                :key="index"
              ></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>

              <!-- <td v-for="(item, cellIndex) in row" :key="cellIndex">
                {{ item }}
              </td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
// import { PropType } from 'vue';
// import { QTableProps } from 'quasar';
import { ref } from 'vue';

const teams = [
  {
    teamName1: 'Atlas',
    teamName2: 'Monterrey',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/CxOLsUWH-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/rojPBGA6-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Puma',
    teamName2: 'Tigres',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/A9NpRSR0-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/OUbkbhQq-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Puma',
    teamName2: 'Tigres',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/A9NpRSR0-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/OUbkbhQq-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Puma',
    teamName2: 'Tigres',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/A9NpRSR0-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/OUbkbhQq-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Puma',
    teamName2: 'Tigres',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/A9NpRSR0-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/OUbkbhQq-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Toluca',
    teamName2: 'Pachuca',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/KAF9lqRq-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/UcvERb5k-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Toluca',
    teamName2: 'Pachuca',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/KAF9lqRq-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/UcvERb5k-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Toluca',
    teamName2: 'Pachuca',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/KAF9lqRq-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/UcvERb5k-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Toluca',
    teamName2: 'Pachuca',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/KAF9lqRq-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/UcvERb5k-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Toluca',
    teamName2: 'Pachuca',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/KAF9lqRq-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/UcvERb5k-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Toluca',
    teamName2: 'Pachuca',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/KAF9lqRq-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/UcvERb5k-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Toluca',
    teamName2: 'Pachuca',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/KAF9lqRq-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/UcvERb5k-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Atlas',
    teamName2: 'Monterrey',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/CxOLsUWH-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/rojPBGA6-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Puma',
    teamName2: 'Tigres',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/A9NpRSR0-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/OUbkbhQq-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Toluca',
    teamName2: 'Pachuca',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/KAF9lqRq-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/UcvERb5k-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
  {
    teamName1: 'Atlas',
    teamName2: 'Monterrey',
    teamAvatar1:
      'https://static.flashscore.com/res/image/data/CxOLsUWH-ltB92yKu.png',
    teamAvatar2:
      'https://static.flashscore.com/res/image/data/rojPBGA6-ltB92yKu.png',
    teamGol1: 1,
    teamGol2: 2,
  },
];

// Define los encabezados
// const headers = [
//   'Encabezado 1',
//   'Encabezado 2',
//   'Encabezado 3',
//   'Encabezado 4',
//   'Encabezado 5',
//   'Encabezado 6',
//   'Encabezado 7',
//   'Encabezado 8',
//   'Encabezado 9',
//   'Encabezado 10',
// ];

// Define los datos de las filas
const rows = ref<Array<Array<string>>>([]);
for (let i = 0; i < 15; i++) {
  rows.value.push([]);
}

// const props = defineProps({
//   columns: {
//     type: [Array as PropType<QTableProps['columns'] | any>],
//   },
// });

// const columns: QTableProps['columns'] = [
//   {
//     name: 'name',
//     required: true,
//     label: 'Dessert (100g serving)',
//     align: 'left',
//     field: (row: any) => row.name,
//     format: (val: any) => `${val}`,
//     sortable: true,
//   },
//   {
//     name: 'calories',
//     align: 'center',
//     label: 'Calories',
//     field: 'calories',
//     sortable: true,
//   },
//   { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
//   { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
//   { name: 'protein', label: 'Protein (g)', field: 'protein' },
//   { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
//   {
//     name: 'calcium',
//     label: 'Calcium (%)',
//     field: 'calcium',
//     sortable: true,
//     sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
//   },
//   {
//     name: 'iron',
//     label: 'Iron (%)',
//     field: 'iron',
//     sortable: true,
//     sort: (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
//   },
// ];

// const rows = [
//   {
//     name: 'Frozen Yogurt',
//     calories: 159,
//     fat: 6.0,
//     carbs: 24,
//     protein: 4.0,
//     sodium: 87,
//     calcium: '14%',
//     iron: '1%',
//   },
//   {
//     name: 'Ice cream sandwich',
//     calories: 237,
//     fat: 9.0,
//     carbs: 37,
//     protein: 4.3,
//     sodium: 129,
//     calcium: '8%',
//     iron: '1%',
//   },
//   {
//     name: 'Eclair',
//     calories: 262,
//     fat: 16.0,
//     carbs: 23,
//     protein: 6.0,
//     sodium: 337,
//     calcium: '6%',
//     iron: '7%',
//   },
//   {
//     name: 'Cupcake',
//     calories: 305,
//     fat: 3.7,
//     carbs: 67,
//     protein: 4.3,
//     sodium: 413,
//     calcium: '3%',
//     iron: '8%',
//   },
//   {
//     name: 'Gingerbread',
//     calories: 356,
//     fat: 16.0,
//     carbs: 49,
//     protein: 3.9,
//     sodium: 327,
//     calcium: '7%',
//     iron: '16%',
//   },
//   {
//     name: 'Jelly bean',
//     calories: 375,
//     fat: 0.0,
//     carbs: 94,
//     protein: 0.0,
//     sodium: 50,
//     calcium: '0%',
//     iron: '0%',
//   },
//   {
//     name: 'Lollipop',
//     calories: 392,
//     fat: 0.2,
//     carbs: 98,
//     protein: 0,
//     sodium: 38,
//     calcium: '0%',
//     iron: '2%',
//   },
//   {
//     name: 'Honeycomb',
//     calories: 408,
//     fat: 3.2,
//     carbs: 87,
//     protein: 6.5,
//     sodium: 562,
//     calcium: '0%',
//     iron: '45%',
//   },
//   {
//     name: 'Donut',
//     calories: 452,
//     fat: 25.0,
//     carbs: 51,
//     protein: 4.9,
//     sodium: 326,
//     calcium: '2%',
//     iron: '22%',
//   },
//   {
//     name: 'KitKat',
//     calories: 518,
//     fat: 26.0,
//     carbs: 65,
//     protein: 7,
//     sodium: 54,
//     calcium: '12%',
//     iron: '6%',
//   },
// ];
</script>

<style lang="scss" scoped>
.name1:nth-of-type(2n + 1) {
  position: sticky;
  height: 20px;
  left: 0;
  text-transform: capitalize;
  z-index: 1000;
}

.name2:nth-of-type(2n) {
  position: sticky;
  height: 20px;
  left: 63px;
  z-index: 1000;
  overflow: auto;
  -webkit-overflow-scrolling: auto;
}

.text-name-player {
  width: 101px;
  max-width: 101px;
}

@media (max-width: 700px) {
  .name2:nth-of-type(2n) {
    position: sticky;
    height: 20px;
    left: 62px;
    z-index: 1000;
    overflow: auto;
    -webkit-overflow-scrolling: auto;
  }
}

@media screen and (orientation: portrait) {
  aside > div.hg_table {
    height: 450px;
  }
}

@media screen and (max-width: 992px) and (orientation: landscape) {
  aside > div.hg_table {
    height: 250px;
  }
}

.sticky-left {
  position: sticky;
  left: 0;
  background-color: #001e28;
  z-index: 1;
}

/* Estilo para agregar scroll a la tabla */
.table-container {
  max-height: 400px;
  overflow: auto;
  max-width: 550px;
}

aside > div.hg_table {
  height: 400px;
  &::-webkit-scrollbar {
    width: 4px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    // border-radius: 500px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $secondary;
    border-radius: 500px;
  }
}

.box-space {
  height: 300px;
}

.font_name {
  font-size: 10px;
  font-weight: bold;
}

.center {
  margin-left: auto;
  margin-right: auto;
}

.pp {
  overflow: auto;
}

.gols {
  // background-color: #fff;
  color: #fff;
  padding: 1px;
  width: 20px;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 3px;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  /* table-layout: fixed; */
}

thead {
  background-color: #001e28;
  position: sticky;
  top: 0; /* Hace que el encabezado sea pegajoso en la parte superior del contenedor */
  z-index: 2;
}

td,
th {
  border: 1px solid #d1d1d1;
  text-align: left;
  padding: 3px;
}

tr:nth-child(even) {
  background-color: #001e28;
}

th:nth-child(3n + 3) {
  /* background-color: rgba(92, 0, 191); */
  // background-color: $orange-6;
  background-color: #00141e;
  color: #fff;
  font-weight: 500;
}

.th-custom {
  border-right: 1px solid transparent;
}

.th-custom2 {
  border-left: 1px solid transparent;
}

.th-custom {
  border-right: 1px solid transparent;
}

.th-custom2 {
  border-left: 1px solid transparent;
}
</style>
