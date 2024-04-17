import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBmYB-kEuUdUdmNHHvObvuAdYKnwLZLjbQ",
  authDomain: "smail-efcfa.firebaseapp.com",
  projectId: "smail-efcfa",
  storageBucket: "smail-efcfa.appspot.com",
  messagingSenderId: "749504988826",
  appId: "1:749504988826:web:339a37a21608a00db60123"
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyAk-GpQFe7TaXqnN7q6qkL6CmqL-Ixaerg',
//   authDomain: 'vue-vuetify-vuefire-firebase.firebaseapp.com',
//   projectId: 'vue-vuetify-vuefire-firebase',
//   storageBucket: 'vue-vuetify-vuefire-firebase.appspot.com',
//   messagingSenderId: '623048341265',
//   appId: '1:623048341265:web:1264633a63081f79b23eb0'
// }

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }