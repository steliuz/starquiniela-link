import { api } from 'boot/axios';
import { handleMessages } from './notifys';

const ERROR_MESSAGE =
  'Oops, hubo un problema durante el proceso, por favor intente mas tarde';
export const getData = async (path, params, options) => {
  try {
    const { data } = await api.get(path, {
      params: params,
      ...options,
    });
    return data;
  } catch (error) {
    let msg = error.response.data.error ?? ERROR_MESSAGE;
    handleMessages({
      message: msg,
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
    let msg = error.response.data.error ?? ERROR_MESSAGE;
    handleMessages({
      message: msg,
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

export const putData = async (
  path,
  payload,
  headers,
  msg = 'Se ha actualizado exitosamente!'
) => {
  try {
    const { data } = await api.put(path, payload, headers);
    if (msg) {
      handleMessages({
        message: msg,
        color: 'positive',
        icon: 'check',
      });
    }
    return data;
  } catch (error) {
    let msg = error.response.data.error ?? ERROR_MESSAGE;
    handleMessages({
      message: msg,
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

export const deleteData = async (
  path,
  msg = 'Se ha eliminado exitosamente!'
) => {
  try {
    const { data } = await api.delete(path);
    if (msg) {
      handleMessages({
        message: msg,
        color: 'positive',
        icon: 'check',
      });
    }
    return data;
  } catch (error) {
    let msg = error.response.data.error ?? ERROR_MESSAGE;
    handleMessages({
      message: msg,
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
//       message: error.response.data.error,
//       color: 'negative',
//       icon: 'cancel',
//     });
//     throw error.response;
//   }
// };
