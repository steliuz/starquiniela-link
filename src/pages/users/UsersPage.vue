<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import FormUser from './components/FormUser.vue';
import { user } from 'src/interfaces/user';
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, optColumn, emailColumn } from 'src/helpers/columns';
import { getData } from 'src/services/communServices';

const dialogUser = ref(false);
const columns = [nameColumn, emailColumn, optColumn];
const respData = ref({
  data: [],
  page: 1,
  rowsPerPage: 20,
});
const loading = ref(false);

const postUser = (value: user) => {
  console.log('value: ', value);
};
const onclick = (value: object) => {
  console.log(value);
};

const getUser = async (value: object) => {
  loading.value = true;
  await getData('user/all', value).then((resp) => {
    respData.value = resp.users;
    loading.value = false;
  });
};

onBeforeMount(() => {
  getUser(respData.value);
});
</script>
<template>
  <section class="q-ma-sm">
    <div class="row">
      <div class="col-12 flex justify-end">
        <q-btn
          class="q-mr-lg"
          color="primary"
          unelevated
          square
          label="Registrar usuario"
          @click="dialogUser = !dialogUser"
        />
      </div>
      <FormUser v-model="dialogUser" :postUser="postUser" />
      <UniversalTable
        :respData="respData"
        :columns="columns"
        @paginateData="getUser"
        :loading="loading"
      >
        <template v-slot:opt="{ props }">
          <q-td style="width: 12%" :props="props" class="no-wrap text-center">
            <q-btn
              unelevated
              padding="10px"
              flat
              color="red-5"
              icon="note"
              @click="onclick(props.row)"
            />
          </q-td>
        </template>
      </UniversalTable>
    </div>
  </section>
</template>

<style scoped></style>
