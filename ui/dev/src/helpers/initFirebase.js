import * as Firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBpfdSxd7b3pC5oZN-oSGog7ff5sLGCG_g',
  authDomain: 'quasar-easy-forms.firebaseapp.com',
  databaseURL: 'https://quasar-easy-forms.firebaseio.com',
  projectId: 'quasar-easy-forms',
  storageBucket: 'quasar-easy-forms.appspot.com',
  messagingSenderId: '591951846746',
  appId: '1:591951846746:web:9cba4ac15716bac106e763',
}

function initFirebase () {
  const firebase = Firebase.initializeApp(firebaseConfig)
  return firebase
}

export { Firebase, initFirebase }
