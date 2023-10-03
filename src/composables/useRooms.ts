/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, computed, ref } from 'vue';
import { Room } from 'src/interfaces/room';
import {
  getData,
  postData,
  putData,
  deleteData,
} from 'src/services/communServices';
import { useAuthStore } from 'src/stores/auth';

const { getMe } = useAuthStore();

export function useRooms() {
  const loading = ref(false);
  const dialog = ref(false);
  const tab = ref('1');
  const room: Ref<Room> = ref({
    name: '',
    category_room_id: 1,
    type: 1,
    // global: false,
    // fase: false,
  });
  const rooms = ref({
    data: [],
    page: 1,
    rowsPerPage: 20,
  });

  const qrcode = ref({
    encode: null,
    path: null,
  });

  const tickets = ref([
    {
      id: 0,
      ticket_factura: '',
      index: 0,
      paid: 0,
      user_id: 0,
      name: '',
      email: '',
      phone: '',
    },
  ]);
  const search = ref('');

  const getReferRoom = async (value: object = rooms.value) => {
    loading.value = true;
    await getData('referer/rooms', value).then((resp) => {
      rooms.value = resp;
      loading.value = false;
    });
  };

  const getRoom = async (value: object = rooms.value) => {
    loading.value = true;
    await getData('rooms', value).then((resp) => {
      rooms.value = resp;
      loading.value = false;
    });
  };

  const getRoomActive = async (value: object = rooms.value) => {
    loading.value = true;
    await getData('rooms/actives', value).then((resp) => {
      rooms.value = resp;
      loading.value = false;
    });
  };

  const postRoom = async (value: Room) => {
    await postData('rooms', value).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const editRoom = (value: Room = room.value) => {
    room.value = JSON.parse(JSON.stringify(value));
    dialog.value = true;
  };
  const putRoom = async (value: Room) => {
    await putData('rooms/' + value.id, value).then(() => {
      dialog.value = false;
      onReset();
    });
  };

  const deleteRoom = async (id: number) => {
    await deleteData('rooms/' + id).then(() => {
      onReset();
    });
  };

  const statusRoom = async (row: Room) => {
    await putData(`rooms/status/${row.id}`, row);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getRoomById = async (id: any) => {
    loading.value = true;
    await getData('rooms/' + id).then((resp) => {
      room.value = resp;
      setTickets(resp.players);
      loading.value = false;
    });
  };

  const setTickets = (players: any) => {
    const bets: any = [];

    players.forEach((ele: any) => {
      ele.bets.forEach((val: any) => {
        bets.push({
          id: val.id,
          ticket_factura: val.ticket_factura,
          index: val.index,
          paid: val.paid,
          user_id: val.user_id,
          name: ele.name,
          email: ele.email,
          phone: ele.phone,
        });
      });
    });
    tickets.value = bets;
  };

  const filteredTicket = computed(() => {
    return tickets.value.filter(
      (val: any) =>
        val.name.toLowerCase().includes(search.value.toLowerCase()) ||
        val.ticket_factura.includes(search.value.toLowerCase())
    );
  });

  const onReset = () => {
    room.value = {
      name: '',
      category_room_id: 1,
      type: 1,
      // global: false,
      // fase: false,
    };
    getRoom({ rowsPerPage: 20 });
  };
  const handlerTab = (value: string) => {
    tab.value = value;
    if (value == '1') {
      getReferRoom({ rowsPerPage: 20 });
    } else {
      getRoomActive({ rowsPerPage: 20 });
    }
  };

  const buyRoom = async (id: number) => {
    await postData(`rooms/${id}/buy`).then(() => {
      getRoomActive({ rowsPerPage: 20 });
      getMe();
    });
  };

  const getQrRoom = async (code: string) => {
    const data = await getData(`v2/rooms/${code}/qrcode`);
    qrcode.value.encode = data.qrcode_encode;
    qrcode.value.path = data.qrcode_path;
    return data;
  };

  const putUpgradePremium = async (value) => {
    await postData('room/updatePremiun', value);
  };

  return {
    loading,
    dialog,
    room,
    rooms,
    getRoom,
    postRoom,
    editRoom,
    putRoom,
    deleteRoom,
    onReset,
    statusRoom,
    getRoomById,
    getReferRoom,
    tab,
    handlerTab,
    getRoomActive,
    buyRoom,
    getQrRoom,
    qrcode,
    tickets,
    filteredTicket,
    search,
  };
}
