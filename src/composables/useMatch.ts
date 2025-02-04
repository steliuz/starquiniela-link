import { Match, MatchForm } from 'src/interfaces/match';
import {
  getData,
  postData,
  putData,
  deleteData,
} from 'src/services/communServices';
import { Ref, ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMatch(roomID: any) {
  const loading = ref(false);
  const matches = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
    room_id: roomID,
  });
  const dialog = ref(false);
  const match: Ref<Match> = ref({
    id: null,
    name: '',
    status: true,
  });

  const getMatch = async (payload: object = matches.value) => {
    loading.value = true;
    await getData('matches', payload).then((resp) => {
      matches.value = resp;
      loading.value = false;
    });
  };

  const postMatch = async (value: MatchForm) => {
    await postData('matches', value).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const editMatch = (value: Match = match.value) => {
    match.value = JSON.parse(JSON.stringify(value));
    dialog.value = true;
  };

  const putMatch = async (match: Match) => {
    await putData('matches/' + match.id, match).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const deleteMatch = async (id: number | null | undefined | string) => {
    await deleteData('matches/' + id).then(() => {
      onReset();
    });
  };

  const onReset = () => {
    match.value = {
      id: null,
      name: '',
      status: true,
    };
    dialog.value = false;
    getMatch({ room_id: roomID });
  };

  const statusMatch = async (match: Match) => {
    await putData('matches/status/' + match.id, { status: match.status });
  };

  const resultMatch = async (match: Match) => {
    await putData('matches/result/' + match.id, match);
  };

  const statusAllMatch = async (value: number) => {
    await putData(`v2/rooms/${roomID}/status/all`, { status: value });
  };

  const resetMatch = async (id: number) => {
    await putData(`v2/matches/${id}/reset`);
  };

  return {
    postMatch,
    editMatch,
    getMatch,
    putMatch,
    deleteMatch,
    matches,
    loading,
    match,
    dialog,
    onReset,
    statusMatch,
    resultMatch,
    statusAllMatch,
    resetMatch,
  };
}
