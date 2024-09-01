import { getData, putData } from 'src/services/communServices';
import { Ref, ref } from 'vue';
import { Credit } from 'src/interfaces/credit';

export function useCredit() {
  const loading = ref(false);
  const credits = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
  });
  const dialog = ref(false);
  const credit: Ref<Credit> = ref({
    credits: 0,
    user_id: 0,
  });
  const userId = ref();

  const getCredit = async (value: object = credits.value) => {
    loading.value = true;
    await getData('credits', value).then((resp) => {
      credits.value = resp;
      loading.value = false;
    });
  };

  const postAdminCredit = async (value: Credit) => {
    return putData(`credits/${value.user_id}`, value).then(() => {
      onReset();
    })
  };
  const postCredit = async (value: Credit) => {
    await putData(`credits/${value.user_id}`, value).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const openCredit = (id: number) => {
    userId.value = id;
    dialog.value = true;
  };

  const onReset = () => {
    credit.value = {
      credits: 0,
      user_id: 0,
    };
    dialog.value = false;
  };

  return {
    postCredit,
    getCredit,
    postAdminCredit,
    openCredit,
    credits,
    loading,
    credit,
    dialog,
    onReset,
    userId,
  };
}
