import { Team } from 'src/interfaces/team';
import {
  getData,
  postData,
  putData,
  deleteData,
} from 'src/services/communServices';
import { Ref, ref } from 'vue';

export function useTeam() {
  const loading = ref(false);
  const teams = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
  });
  const dialog = ref(false);
  const team: Ref<Team> = ref({
    id: null,
    name: '',
    image: '',
  });

  const postTeam = async (value: Team) => {
    await postData('teams', value).then(() => {
      dialog.value = false;
      onReset();
      getTeam();
    });
  };

  const editTeam = (value: Team = team.value) => {
    team.value = value;
    dialog.value = true;
  };

  const getTeam = async (value: object = teams.value) => {
    loading.value = true;
    await getData('teams', value).then((resp) => {
      teams.value = resp;
      loading.value = false;
    });
  };

  const putTeam = async (value: Team) => {
    await putData('teams/' + value.id, value).then(() => {
      dialog.value = false;
      onReset();
      getTeam();
    });
  };

  const deleteTeam = async (id: number) => {
    await deleteData('teams/' + id).then(() => {
      getTeam();
    });
  };

  const onReset = () => {
    team.value = {
      name: '',
      image: '',
      id: null,
    };
  };

  return {
    postTeam,
    editTeam,
    getTeam,
    putTeam,
    deleteTeam,
    teams,
    loading,
    team,
    dialog,
    onReset,
  };
}
