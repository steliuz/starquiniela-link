<script setup lang="ts">
import FormUser from './components/FormUser.vue';
import UniversalTable from 'src/components/UniversalTable.vue';
import {
  nameColumn,
  optColumn,
  emailColumn,
  roleColumn,
  phoneColumn,
  customColumn,
  statusToogleColumn,
} from 'src/helpers/columns';
import { useUser } from 'src/composables/useUser';
// import { ref } from 'vue';
import DialogCredit from './components/DialogCredit.vue';
import { useAuthStore } from 'src/stores/auth';
import { useCredit } from 'src/composables/useCredit';
import { Credit } from 'src/interfaces/credit';
import { ref } from 'vue';

const { auth } = useAuthStore();

const userData = ref({
  name: '',
  email: '',
  role_id: 0,
  phone: '',
  status: 0,
});
const {
  postAdminCredit,
  postCredit,
  dialog: dialogCredit,
  userId,
  openCredit,
} = useCredit();

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
  onReset,
  statusUser,
} = useUser();

const creditColumn = {
  name: 'credit',
  label: 'Creditos',
  field: (row: { credits: number }) => row.credits,
};

let columns = [
  nameColumn,
  emailColumn,
  roleColumn,
  phoneColumn,
  statusToogleColumn,
  optColumn,
];
if (auth.role_id != 3)
  columns.splice(columns.length - 2, 0, customColumn(creditColumn));

const addCredits = async (credit: number) => {
  let data: Credit = {
    user_id: userId.value,
    credits: credit,
  };
  if (auth.role_id == 1) {
    await postAdminCredit(data);
  } else {
    await postCredit(data);
  }
  getUser();
};

const handleCredit = (item: any) => {
  userData.value = item;
  openCredit(item.id);
};
</script>
<template>
  <section class="q-ma-sm">
    <div class="row">
      <div class="col-12 flex justify-end q-my-md">
        <q-btn
          class="q-mr-lg"
          color="secondary"
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
        @onReset="onReset"
        :admin="auth.role_id === 1"
      />
      <div class="col-12 flex justify-center q-my-md">
        <UniversalTable
          :respData="users"
          :columns="columns"
          @paginateData="getUser"
          :loading="loading"
          placeholder="Filtrar por nombre"
          @editData="editUser"
          title="Usuarios"
          @deleteData="deleteUser"
          @statusData="statusUser"
        >
          <template v-slot:opt="scope" v-if="auth.role_id != 3">
            <q-item
              clickable
              v-close-popup
              @click="handleCredit(scope.props.row)"
            >
              <q-item-section>
                <div class="flex">
                  <i class="q-mr-md fa-solid fa-shield text-red-5"></i>
                  <span>Creditos</span>
                </div>
              </q-item-section>
            </q-item>
          </template>
        </UniversalTable>
      </div>
    </div>
    <DialogCredit
      v-model="dialogCredit"
      :userData="userData"
      @addCredits="addCredits"
    ></DialogCredit>
  </section>
</template>

<style scoped></style>
