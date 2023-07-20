import { api } from 'boot/axios';
import { handleMessages } from './notifys';

export const getData = async (path, params, responseType) => {
  try {
    const { data } = await api.get(path, {
      params: params,
      responseType: responseType,
    });
    return data;
  } catch (error) {
    handleMessages({
      message:
        'Oops, hubo un problema durante el proceso, por favor intente mas tarde',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

export const postData = async (
  path,
  payload,
  headers,
  msg = 'Se ha creado exitosamente!'
) => {
  try {
    const { data } = await api.post(path, payload, headers);
    if (msg) {
      handleMessages({
        message: msg,
        color: 'positive',
        icon: 'check',
      });
    }
    return data;
  } catch (error) {
    handleMessages({
      message:
        'Oops, hubo un problema durante el proceso, por favor intente mas tarde',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

// export const getDataById = async (path) => {
//   try {
//     const { data } = await api.get(path);
//     return data;
//   } catch (error) {
//     handleMessages({
//       message:
//         'Oops, hubo un problema durante el proceso, por favor intente mas tarde',
//       color: 'negative',
//       icon: 'cancel',
//     });
//     throw error.response;
//   }
// };

export const putData = async (path, payload, headers) => {
  try {
    const { data } = await api.put(path, payload, headers);
    handleMessages({
      message: 'Se ha actualizado exitosamente!',
      color: 'positive',
      icon: 'check',
    });
    return data;
  } catch (error) {
    handleMessages({
      message:
        'Oops, hubo un problema durante el proceso, por favor intente mas tarde',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

export const deleteData = async (path) => {
  try {
    const { data } = await api.delete(path);
    handleMessages({
      message: 'Se ha eliminado exitosamente!',
      color: 'positive',
      icon: 'check',
    });
    return data;
  } catch (error) {
    handleMessages({
      message:
        'Oops, hubo un problema durante el proceso, por favor intente mas tarde',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

// export const searchData = async (path, payload) => {
//   try {
//     const { data } = await api.post(path, payload);
//     return data;
//   } catch (error) {
//     handleMessages({
//       message: error.response.data.message,
//       color: 'negative',
//       icon: 'cancel',
//     });
//     throw error.response;
//   }
// };
