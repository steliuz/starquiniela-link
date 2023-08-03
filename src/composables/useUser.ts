import { User } from 'src/interfaces/user';
import {
  getData,
  postData,
  putData,
  deleteData,
} from 'src/services/communServices';
import { Ref, ref } from 'vue';
import { useUserStore } from 'src/stores/user';
import { storeToRefs } from 'pinia';

const { user: auth } = storeToRefs(useUserStore());

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

  const postUser = async (value: User) => {
    value.referral_id = auth.value.id;
    value.email = value.emailUser + value.prefix;
    await postData('register', value).then(() => {
      dialog.value = false;
      getUser();
      onReset();
    });
  };

  const editUser = (value: User = user.value) => {
    user.value = value;
    dialog.value = true;
  };

  const getUser = async (value: object = users.value) => {
    loading.value = true;
    await getData('user/all', value).then((resp) => {
      users.value = resp.users;
      loading.value = false;
    });
  };

  const putUser = async (value: User) => {
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
  };
}
