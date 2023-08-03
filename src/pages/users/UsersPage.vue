<script setup lang="ts">
import FormUser from './components/FormUser.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import { nameColumn, optColumn, emailColumn } from 'src/helpers/columns';
import { useUser } from 'src/composables/useUser';

const {
  getUser,
  users,
  postUser,
  loading,
  editUser,
  user,
  dialog,
  putUser,
  deleteUser,
} = useUser();
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
      <FormUser
        v-model="dialog"
        @postUser="postUser"
        @putUser="putUser"
        :user="user"
      />
      <UniversalTable
        :respData="users"
        :columns="columns"
        @paginateData="getUser"
        :loading="loading"
        @editData="editUser"
        title="Usuario"
        @deleteData="deleteUser"
      >
      </UniversalTable>
    </div>
  </section>
</template>

<style scoped></style>
