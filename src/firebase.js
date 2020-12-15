import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyClDbtdE8BH-AANNtIYkWqm8kLlHuKc0mo',
	authDomain: 'whatsapp-clo-40d6b.firebaseapp.com',
	projectId: 'whatsapp-clo-40d6b',
	storageBucket: 'whatsapp-clo-40d6b.appspot.com',
	messagingSenderId: '485975965187',
	appId: '1:485975965187:web:181c321ec8f1573d235836',
	measurementId: 'G-D89R9EXCVH',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;