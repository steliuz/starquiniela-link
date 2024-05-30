import { getMessaging, getToken } from 'firebase/messaging';
// import { api } from 'src/boot/axios';
import { firebaseapp } from 'src/boot/firebase';

export const registerWorker = async () => {
  console.log('navigator: ', navigator);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js', {
        scope: '/firebase-cloud-messaging-push-scope',
      })
      .then(() => {
        Notification.requestPermission()
          .then(() => {
            const messaging = getMessaging(firebaseapp);
            getToken(messaging)
              .then((currentToken) => {
                console.log('ESTO NO SIRVIO', currentToken);
                if (currentToken) {
                  localStorage.setItem('token_device', currentToken);
                }
              })
              .catch((err) => {
                console.log(
                  'An error occurred while retrieving  token. ',
                  err
                );
              });
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log('No token available');
  }
};
