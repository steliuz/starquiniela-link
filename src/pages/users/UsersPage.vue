<script setup lang="ts">
import FormUser from './components/FormUser.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, optColumn, emailColumn } from 'src/helpers/columns';
import { useUser } from 'src/composables/useUser';

const { getUser, respData, postUser, loading, editUser, user, dialog } =
  useUser();
const columns = [nameColumn, emailColumn, optColumn];
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
          @click="dialog = !dialog"
        />
      </div>
      <FormUser v-model="dialog" @postUser="postUser" :user="user" />
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
              @click="editUser(props.row)"
            />
          </q-td>
        </template>
      </UniversalTable>
    </div>
  </section>
</template>

<style scoped></style>
