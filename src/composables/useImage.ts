import { postData } from 'src/services/communServices';

export function useImage() {
  const getImage = async (value: string) => {
    return await postData('getImages', { image: value }, null, '').then(
      (resp) => {
        return resp.image;
      }
    );
  };

  return {
    getImage,
  };
}
