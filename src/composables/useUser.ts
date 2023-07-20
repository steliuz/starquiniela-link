import { user } from 'src/interfaces/user';
import { getData } from 'src/services/communServices';
import { ref } from 'vue';

export function useUser() {
  const loading = ref(false);
  const respData = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
  });

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

  return {
    postUser,
    onclick,
    getUser,
    respData,
    loading,
  };
}
