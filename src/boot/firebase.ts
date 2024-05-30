import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = {
  apiKey: 'AIzaSyBltueFqeZJCCHkbcUQZ0SjKhxlooa-JOM',
  authDomain: 'appp-68283.firebaseapp.com',
  projectId: 'appp-68283',
  storageBucket: 'appp-68283.appspot.com',
  messagingSenderId: '994336406567',
  appId: '1:994336406567:web:cab12f452d5f61ec7ce202',
};
const firebaseapp = initializeApp(config);


export default boot(({ app }) => {
  app.config.globalProperties.$fbInit = firebaseapp
})

export { firebaseapp };
