import { getData } from 'src/services/communServices';

export function useBackUp() {
  console.log('first')
  const backUp = async () => {
    return await getData(
      'backup',
    ).then((resp) => {
      console.log('resp: ', resp);
      return resp;
    }).catch((err) => {
      console.log('err: ', err);

    })
  };

  return {
    backUp,
  };
}
