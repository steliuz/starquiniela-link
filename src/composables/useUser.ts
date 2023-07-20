import { User } from 'src/interfaces/user';
import { getData, postData } from 'src/services/communServices';
import { Ref, ref } from 'vue';
import { useUserStore } from 'src/stores/user'
import { storeToRefs } from 'pinia'

const { user: auth } = storeToRefs(useUserStore())

export function useUser() {
  const loading = ref(false);
  const respData = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
  });
  const dialog = ref(false)
  const user: Ref<User> = ref({
    prefix: '@gmail.com',
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
    console.log('auth.value: ', auth.value);
    value.referral_id = auth.value.id
    value.email = value.emailUser + value.prefix
    await postData('register', value).then(() => {
      dialog.value = false;
      getUser()
    })
  };
  const editUser = (value: User = user.value) => {
    user.value = value;
    dialog.value = true
  };

  const getUser = async (value: object = respData.value) => {
    loading.value = true;
    await getData('user/all', value).then((resp) => {
      respData.value = resp.users;
      loading.value = false;
    });
  };

  return {
    postUser,
    editUser,
    getUser,
    respData,
    loading,
    user,
    dialog
  };
}
