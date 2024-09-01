import { api } from 'boot/axios';
import { handleMessages } from './notifys';

const handleError = (error) => {
  let msg =
    'Oops, hubo un problema durante el proceso, por favor intente mas tarde';
  let response = error.response.data;
  if (response.error) {
    msg = response.error;
  } else if (response.errors || response.data) {
    let errors = Object.values(response.errors || response.data);
    errors.forEach((element) => {
      handleMessages({
        message: element,
        color: 'negative',
        icon: 'cancel',
      });
    });
    throw error.response;
  }

  handleMessages({
    message: msg,
    color: 'negative',
    icon: 'cancel',
  });
  throw error.response;
};

export const getData = async (path, params, options) => {
  try {
    const { data } = await api.get(path, {
      params: params,
      ...options,
    });
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const postData = async (
  path,
  payload,
  headers,
  msg = 'Se ha creado exitosamente!',
  noMsg
) => {
  try {
    const { data } = await api.post(path, payload, headers);
    if (msg && noMsg) {
      handleMessages({
        message: msg,
        color: 'positive',
        icon: 'check',
      });
    }
    return data;
  } catch (error) {
    return handleError(error);
  }
};

export const putData = (
  path,
  payload,
  headers,
  msg = 'Se ha actualizado exitosamente!'
) => {
  return new Promise(async (resolve, rejeted) => {
    try {
      const { data } = await api.put(path, payload, headers);
      if (msg) {
        handleMessages({
          message: msg,
          color: 'positive',
          icon: 'check',
        });
      }
      resolve(data);
    } catch (error) {
      const resp = error?.response?.data?.requires_2fa;

      if (resp) {
        rejeted({ active2fa: resp });
        return;
      }
      handleMessages({
        message: error.message || 'Ocurrió un error',
        color: 'negative',
        icon: 'cancel',
      });
    }
  });
};

export const deleteData = async (
  path,
  code,
  msg = 'Se ha eliminado exitosamente!'
) => {
  return new Promise(async (resolve, rejeted) => {
    try {
      let data;
      if (code) {
        const newPath = `${path}?two_factor_code=${code.two_factor_code}`;
        const resp = await api.delete(newPath);
        data = resp.data;
      } else {
        const resp = await api.delete(path);
        data = resp.data;
      }
      if (msg) {
        handleMessages({
          message: msg,
          color: 'positive',
          icon: 'check',
        });
      }
      resolve(data);
    } catch (error) {
      const resp = error?.response?.data?.requires_2fa;

      if (resp) {
        rejeted({ active2fa: resp });
        return;
      }
      handleMessages({
        message: error.message || 'Ocurrió un error',
        color: 'negative',
        icon: 'cancel',
      });
    }
  });
};
