importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyD4gbgHoL6c3LB_fL5j2k3R2AVcy3N8I4o",
    authDomain: "superchat-5b4f0.firebaseapp.com",
    projectId: "superchat-5b4f0",
    storageBucket: "superchat-5b4f0.appspot.com",
    messagingSenderId: "753427940697",
    appId: "1:753427940697:web:0e943349d5dc2dbe56f848",
    measurementId: "G-SZLKVF3344"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();