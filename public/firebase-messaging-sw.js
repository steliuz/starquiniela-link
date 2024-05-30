importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js'
);
// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
try {
  firebase.initializeApp({
    apiKey: 'AIzaSyBltueFqeZJCCHkbcUQZ0SjKhxlooa-JOM',
    authDomain: 'appp-68283.firebaseapp.com',
    projectId: 'appp-68283',
    storageBucket: 'appp-68283.appspot.com',
    messagingSenderId: '994336406567',
    appId: '1:994336406567:web:cab12f452d5f61ec7ce202',
  });

  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();
  // [END initialize_firebase_in_sw]

  // If you would like to customize notifications that are received in the
  // background (Web app is closed or not in browser focus) then you should
  // implement this optional method.
  // [START background_handler]
  messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload?.notification?.title || 'DEFAULT TITLE';
    const notificationOptions = {
      body: payload?.notification?.body || 'DEFAULT BODY',
      icon: 'public/icons/icon-128x128.png',
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });
  // [END background_handler]
} catch (err) {
  console.log('firebase-ws', err);
}
