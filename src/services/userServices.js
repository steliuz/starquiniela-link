import { api } from 'boot/axios';
import { handleMessages } from '../notifys';

export const createUser = async (value) => {
  try {
    await api.post('/users', value);
    handleMessages({
      message: 'Empleado, creado con éxito',
      color: 'green-5',
      icon: 'check',
    });
  } catch (error) {
    handleMessages({
      message: 'Revisa los datos para cumplir con el formulario',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

export const getUsers = async (params) => {
  try {
    const data = await api.get('/users', {
      params: params,
    });
    return data;
  } catch (error) {
    handleMessages({
      message: 'Oops, Algo no salio bien, recarga',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/user/${id}`);
    handleMessages({
      message: 'Empleado eliminado',
      color: 'green-5',
      icon: 'check',
    });
  } catch (error) {
    handleMessages({
      message: 'Oops, Algo no salio bien, intenta de nuevo',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

export const updateUser = async (value) => {
  try {
    await api.put('/users/update', value);
    handleMessages({
      message: 'Empleado, editado con éxito',
      color: 'green-5',
      icon: 'check',
    });
  } catch (error) {
    handleMessages({
      message: 'Revisa los datos para cumplir con el formulario',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};

export const selectRoles = async () => {
  try {
    const data = await api.get('/roles/select');
    return data;
  } catch (error) {
    handleMessages({
      message: 'Oops, Algo no salio bien, recarga',
      color: 'negative',
      icon: 'cancel',
    });
    throw error.response;
  }
};
