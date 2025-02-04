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
  const optionsTeams = ref([]);

  const getTeam = async (value: object = teams.value) => {
    loading.value = true;
    await getData('teams', value).then((resp) => {
      teams.value = resp;
      loading.value = false;
    });
  };

  const postTeam = async (value: Team) => {
    await postData('teams', value).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const editTeam = (value: Team = team.value) => {
    team.value = JSON.parse(JSON.stringify(value));
    dialog.value = true;
  };

  const putTeam = async (value: Team, id: number) => {
    await putData('teams/' + id, value).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const deleteTeam = async (id: number) => {
    await deleteData('teams/' + id).then(() => {
      onReset();
    });
  };

  const selectTeams = async () => {
    loading.value = true;
    await getData('teams/select').then((resp) => {
      optionsTeams.value = resp;
      loading.value = false;
    });
  };

  const onReset = () => {
    team.value = {
      name: '',
      image: '',
      id: null,
    };
    getTeam({ rowsPerPage: 20 });
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
    selectTeams,
    optionsTeams,
  };
}
