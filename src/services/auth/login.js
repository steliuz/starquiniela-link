import { api } from 'boot/axios';
import { handleMessages } from '../notifys';

export const login = async (value) => {
  let user = value;
  try {
    const { data } = await api.post('login', user);
    localStorage.setItem('access_token', data.access_token);
    handleMessages({
      message: `<b>Bienvenido</b> ${data.user_data.name}`,
      color: 'positive',
      icon: 'mood',
    });

    return data;
  } catch (error) {
    localStorage.removeItem('access_token');
    let msg = 'Oops :( , Los datos no son correctos';
    if (error.status == 402)
      msg = 'Usuario Inactivo, por favor comuniquese con el administrador';
    handleMessages({
      message: msg,
      color: 'negative',
      icon: 'cancel',
    });
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('logout');
    localStorage.removeItem('access_token');
    // localStorage.removeItem("user");
    handleMessages({
      message: 'Esperamos regreses pronto',
      color: 'positive',
      icon: 'check',
    });
  } catch (error) {
    handleMessages({
      message: 'Oops, Algo a fallado intenta de nuevo',
      color: 'negative',
      icon: 'sentiment_dissatisfied',
    });
    throw error;
  }
};

export const registerUser = async (value) => {
  let register = value;
  try {
    await api.post('signup', register);
    handleMessages({
      message: 'Excelente, Ya tienes cuenta en <b>Maxi Rifa</b>',
      color: 'positive',
      icon: 'check',
    });
  } catch (error) {
    handleMessages({
      message: 'Revisa los datos para cumplir con el formulario',
      color: 'negative',
      icon: 'cancel',
    });
    throw error;
  }
};

export const updateUser = async (value) => {
  try {
    const { data } = await api.post('update-profile', value);
    handleMessages({
      message: 'Excelente, Ya se actualizo tu perfil',
      color: 'positive',
      icon: 'check',
    });
    return data;
  } catch (error) {
    handleMessages({
      message: 'Revisa los datos para cumplir con el formulario',
      color: 'negative',
      icon: 'cancel',
    });
    throw error;
  }
};

export const getAvatars = async () => {
  try {
    const { data } = await api.get('avatars');
    return data.avatars;
  } catch (error) {
    handleMessages({
      message: 'Oops, Algo no salio bien, recarga',
      color: 'negative',
      icon: 'cancel',
    });
    throw error;
  }
};

export const updateAvatar = async (value) => {
  try {
    const { data } = await api.post('avatars', value, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    handleMessages({
      message: 'Avatar, actualizado con éxito',
      color: 'positive',
      icon: 'check',
    });
    return data;
  } catch (error) {
    handleMessages({
      message: 'Revisa los datos para cumplir con el formulario',
      color: 'negative',
      icon: 'cancel',
    });
    throw error;
  }
};
