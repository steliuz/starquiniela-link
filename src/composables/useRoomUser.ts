import { Match } from 'src/interfaces/match';
import { useBet } from 'src/composables/useBet';
import { useMatch } from 'src/composables/useMatch';
import { PaidBet } from 'src/interfaces/bet';
import { useRooms } from 'src/composables/useRooms';
import { ref } from 'vue';

const { getRoomById, postUpgradePremium } = useRooms();
const { statusPaidBet } = useBet();
export function useRoomUser(roomID: string | number | null) {
  const { deleteMatch, statusMatch, resultMatch, resetMatch } =
    useMatch(roomID);
  const dialogUpgrade = ref(false);

  async function onSave(match: Match) {
    await resultMatch(match);
    await getRoomById(roomID);
  }
  async function onStatus(match: Match) {
    await statusMatch(match);
    await getRoomById(roomID);
  }

  async function onDelete(id: number | null | undefined | string) {
    await deleteMatch(id);
    await getRoomById(roomID);
  }

  const statusPaid = async (value: PaidBet) => {
    value.room_id = roomID;
    await statusPaidBet(value);
    await getRoomById(roomID);
  };

  const onResetMatch = async (id: number) => {
    await resetMatch(id);
    await getRoomById(roomID);
  };

  const upgradePremium = async (id: number) => {
    const data = {
      subscribe_id: id,
      room_id: roomID,
    };
    await postUpgradePremium(data).then(async () => {
      dialogUpgrade.value = false;
      await getRoomById(roomID);
    });
  };
  return {
    onSave,
    onStatus,
    upgradePremium,
    onResetMatch,
    statusPaid,
    onDelete,
    dialogUpgrade,
  };
}
