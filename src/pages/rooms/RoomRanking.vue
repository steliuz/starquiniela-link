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
      <div class="pp mt-2 text-center hg_table" ref="containerTable">
        <table>
          <thead>
            <tr>
              <th class="name1 bg-header-dark">
                <div class="q-px-xs text-center">Jugador</div>
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
                <th v-if="typeRoom" class="text-center th-custom">
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
                <th v-if="typeRoom" class="text-center th-custom2">
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
                <th v-if="!typeRoom">
                  <div class="flex justify-center" style="width: 80px">
                    <div class="q-mx-xs">
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
                    <div class="q-mx-xs">
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
                  </div>
                </th>
              </template>
              <!-- <th v-for="(header, index) in headers" :key="index"></th> -->
            </tr>
          </thead>
          <tbody v-if="typeRoom">
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <td class="name1">
                <div class="text-name-player">Lester Douglas</div>
              </td>
              <td class="name2 bg-orange-6 text-black text-bold">
                <div class="flex flex-center">9</div>
              </td>

              <template v-for="(result, index) in teams.length" :key="index">
                <td class="roomNormal">50</td>
                <td class="roomNormal">
                  <p class="q-mb-none text-bold text-center">2</p>
                </td>
                <td class="roomNormal">
                  <p class="q-mb-none text-bold text-center">1</p>
                </td>
              </template>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
              <td class="name1">
                <div class="text-name-player">Lester Douglas</div>
              </td>
              <td class="name2 bg-orange-6 text-black text-bold">
                <div class="flex flex-center">9</div>
              </td>
              <template v-for="(result, index) in teams.length" :key="index">
                <td class="lev">50</td>
                <td class="lev">
                  <p class="q-mb-none text-bold text-center">L</p>
                </td>
              </template>
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

const containerTable = ref<HTMLElement | null>(null);

const typeRoom = ref(false);

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

const rows = ref<Array<Array<string>>>([]);
for (let i = 0; i < 15; i++) {
  rows.value.push([]);
}

// onMounted(() => {
//   const content = containerTable.value;

//   if (content) {
//     content.addEventListener('wheel', (e) => {
//       const hasVerticalScroll = content.scrollHeight > content.clientHeight;

//       const hasHorizontalScroll = content.scrollWidth > content.clientWidth;

//       if (hasVerticalScroll && hasHorizontalScroll) {
//         console.log('1');
//         return;
//       } else if (hasHorizontalScroll && e.deltaX !== 0) {
//         console.log('2');
//         e.preventDefault();
//         content.scrollLeft += e.deltaX;
//       }
//     });
//   }
// });
</script>

<style lang="scss" scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

aside > div.hg_table {
  height: auto;
  max-height: 700px;
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

thead {
  background-color: #001e28;
  position: sticky;
  top: 0;
  z-index: 2;
}

td,
th {
  border: 1px solid #d1d1d1;
  text-align: left;
  padding: 3px;
}

// tr:nth-child(even) {
//   background-color: #001e28;
// }

th:nth-child(3n + 3) {
  background-color: #001e28;
  color: #fff;
  font-weight: 500;
}
td.roomNormal:nth-child(3n + 3) {
  background-color: #001e28;
  color: #fff;
  font-weight: 500;
}

td.lev:nth-child(odd) {
  background-color: #001e28;
  color: #fff;
  font-weight: 500;
}

.name1:nth-of-type(2n + 1) {
  position: sticky;
  height: 20px;
  left: 0;
  text-transform: capitalize;
  z-index: 1;
  background-color: #001e28;
}

.name2:nth-of-type(2n) {
  position: sticky;
  width: 50px;
  height: 20px;
  left: 108px;
  background-color: #001e28;
  z-index: 1;
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
    height: auto;
    max-height: 700px;
  }
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
