import { Advertise } from 'src/interfaces/advertise';
import {
  getData,
  postData,
  putData,
  deleteData,
} from 'src/services/communServices';
import { Ref, ref } from 'vue';

export function useAdvertise() {
  const loading = ref(false);
  const advertises = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
  });
  const dialog = ref(false);
  const advertise: Ref<Advertise> = ref({
    id: null,
    name: '',
    image: '',
    client: '',
    status: true,
  });

  const getAdvertise = async (value: object = advertises.value) => {
    loading.value = true;
    await getData('advertises', value).then((resp) => {
      advertises.value = resp;
      loading.value = false;
    });
  };

  const postAdvertise = async (value: Advertise) => {
    await postData('advertises', value).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const editAdvertise = (value: Advertise = advertise.value) => {
    advertise.value = JSON.parse(JSON.stringify(value));
    dialog.value = true;
  };

  const putAdvertise = async (value: Advertise, id: number) => {
    await putData('advertises/' + id, value).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const deleteAdvertise = async (id: number) => {
    await deleteData('advertises/' + id).then(() => {
      onReset();
    });
  };

  const onReset = () => {
    advertise.value = {
      name: '',
      image: '',
      id: null,
      client: '',
      status: true,
    };
    dialog.value = false;
    getAdvertise({ rowsPerPage: 20 });
  };

  return {
    postAdvertise,
    editAdvertise,
    getAdvertise,
    putAdvertise,
    deleteAdvertise,
    advertises,
    loading,
    advertise,
    dialog,
    onReset,
  };
}
