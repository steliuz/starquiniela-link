import { putData } from 'src/services/communServices';
import { PaidBet } from 'src/interfaces/bet';

export function useBet() {
  const statusPaidBet = async (value: PaidBet) => {
    return await putData(
      'matches/paidpronosticos',
      value,
      null,
      'Ticket actualizado Exitosamente!'
    ).then((resp) => {
      return resp;
    });
  };

  return {
    statusPaidBet,
  };
}
