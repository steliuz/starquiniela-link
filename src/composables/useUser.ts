import { User } from 'src/interfaces/user';
import {
  getData,
  postData,
  putData,
  deleteData,
} from 'src/services/communServices';
import { Ref, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { storeToRefs } from 'pinia';

const { auth } = storeToRefs(useAuthStore());

export function useUser() {
  const loading = ref(false);
  const users = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
  });
  const dialog = ref(false);
  const user: Ref<User> = ref({
    prefix: auth.value.prefix,
    emailUser: '',
    name: '',
    password: '',
    password_confirmation: '',
    phone: '',
    role_id: 3,
    subscribe_id: null,
    referral_id: auth.value.id,
  });

  const getUser = async (value: object = users.value) => {
    loading.value = true;
    await getData('user/all', value).then((resp) => {
      users.value = resp.users;
      loading.value = false;
    });
  };

  const postUser = async (value: User) => {
    value.referral_id = auth.value.id;
    value.email = value.emailUser + value.prefix;
    if (auth.value.role_id == 3) value.role_id = 4;
    if (auth.value.role_id == 2) value.role_id = 3;
    await postData('register', value).then(() => {
      dialog.value = false;
      getUser();
      onReset();
    });
  };

  const editUser = (value: User = user.value) => {
    user.value = JSON.parse(JSON.stringify(value));
    dialog.value = true;
  };

  const putUser = async (value: User) => {
    if (auth.value.role_id == 3) value.role_id = 4;
    if (auth.value.role_id == 2) value.role_id = 3;
    await putData('user/update', value).then(() => {
      dialog.value = false;
      getUser();
      onReset();
    });
  };

  const deleteUser = async (id: number) => {
    await deleteData('user/' + id).then(() => {
      getUser();
    });
  };

  const onReset = () => {
    user.value = {
      prefix: auth.value.prefix,
      emailUser: '',
      name: '',
      password: '',
      password_confirmation: '',
      phone: '',
      role_id: 3,
      subscribe_id: null,
      referral_id: auth.value.id,
    };
    dialog.value = false;
  };

  const statusUser = async (value: User) => {
    await putData(`user/status/${value.id}`, value).then(() => {
      getUser();
    });
  };

  return {
    postUser,
    editUser,
    getUser,
    putUser,
    deleteUser,
    users,
    loading,
    user,
    dialog,
    onReset,
    statusUser,
  };
}
