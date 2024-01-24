import { postData } from 'src/services/communServices';
import { Contact } from 'src/interfaces/contact';
import { Ref, ref } from 'vue';

export function useContact() {
  const contact: Ref<Contact> = ref({
    name: '',
    email: '',
    message: '',
  });

  const postContact = async (value: Contact = contact.value) => {
    return await postData(
      'contact',
      value,
      null,
      'Mensaje enviado Exitosamente!'
    ).then((resp) => {
      contact.value = {
        name: '',
        email: '',
        message: '',
      };
      return resp;
    });
  };

  return {
    postContact,
    contact,
  };
}
