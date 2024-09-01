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
import DialogCredit from './components/DialogCredit.vue';
import { useAuthStore } from 'src/stores/auth';
import { useCredit } from 'src/composables/useCredit';
import { ref, Ref } from 'vue';
import { use2fa } from 'src/composables/use2fa';
import { handleMessages } from 'src/services/notifys';
import Dialog2fa from 'src/components/Dialog-2fa.vue';
import { Credit } from 'src/interfaces/credit';
import { User } from 'src/interfaces/user';

const { auth } = useAuthStore();
const dataCredit: Ref<Credit> = ref({
  credits: 0,
  user_id: 0,
});

const handlePost2fa = ref<boolean>(false);
const idDelete = ref<number | null>(null);

const userData = ref<User>({
  name: '',
  email: '',
  role_id: 0,
  phone: '',
  status: 0,
  two_factor_code: '',
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

const {
  dialog2fa,
  secret,
  qrCodeUrl,
  handleOnComplete,
  closeDialog,
  showDialog,
} = use2fa();

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
  dataCredit.value = {
    user_id: userId.value,
    credits: credit,
  };
  if (auth.role_id == 1) {
    await postAdminCredit(dataCredit.value)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((resp) => {
        console.log('resp: ', resp);
      })
      .catch((err) => {
        if (err.active2fa) {
          showDialog();
          return;
        }
      });
  } else {
    await postCredit(dataCredit.value);
  }
  getUser();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleEdit = (value: any) => {
  handlePost2fa.value = true;
  editUser(value);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleCredit = async (item: any) => {
  openCredit(item.id);
};
const updateUser = async (item: User) => {
  userData.value = item;
  putUser(userData.value)
    .then((resp) => {
      console.log('resp: ', resp);
    })
    .catch((err) => {
      if (err.active2fa) {
        showDialog();
        return;
      }
    });
};

const resetData = () => {
  handlePost2fa.value = false;
  idDelete.value = null;
  userData.value = {
    name: '',
    email: '',
    role_id: 0,
    phone: '',
    status: 0,
    two_factor_code: '',
  };
  onReset();
};

const handleDelete = (value: number) => {
  idDelete.value = value;
  handlePost2fa.value = true;
  deleteUser(value)
    .then((resp) => {
      console.log('resp: ', resp);
    })
    .catch((err) => {
      if (err.active2fa) {
        showDialog();
        return;
      }
    });
};

const submit2faCodeHandler = async (value: string | '') => {
  dataCredit.value.two_factor_code = value;

  if (idDelete.value) {
    try {
      deleteUser(idDelete.value, { two_factor_code: value });
      handlePost2fa.value = false;
      closeDialog();
      getUser();
    } catch (error) {
      console.log('error: ', error);
    }
    return;
  }

  if (handlePost2fa.value) {
    userData.value.two_factor_code = value;

    try {
      putUser(userData.value);
      handlePost2fa.value = false;
      closeDialog();
      getUser();
    } catch (error) {
      console.log('error: ', error);
    }
    return;
  }

  try {
    if (auth.role_id == 1) {
      await postAdminCredit(dataCredit.value);
      dataCredit.value = {
        user_id: 0,
        credits: 0,
        two_factor_code: null,
      };
      closeDialog();
      getUser();
    } else {
      await postCredit(dataCredit.value);
      dataCredit.value = {
        user_id: 0,
        credits: 0,
        two_factor_code: null,
      };
      closeDialog();
      getUser();
    }
  } catch (err) {
    handleMessages({
      color: 'negative',
      icon: 'cancel',
      message: 'Error enviando el código 2FA',
    });
  }
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
        @putUser="updateUser"
        :user="user"
        @resetAll="resetData"
        :admin="auth.role_id === 1"
      />
      <div class="col-12 flex justify-center q-my-md">
        <UniversalTable
          :respData="users"
          :columns="columns"
          @paginateData="getUser"
          :loading="loading"
          placeholder="Filtrar por nombre"
          @editData="handleEdit"
          title="Usuarios"
          @deleteData="handleDelete"
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
    />
    <Dialog2fa
      v-model="dialog2fa"
      :qrCodeUrl="qrCodeUrl"
      :secret="secret"
      @update:model-value="closeDialog"
      @onComplete="handleOnComplete"
      @submit2faCodeHandler="submit2faCodeHandler"
    />
  </section>
</template>

<style scoped></style>
