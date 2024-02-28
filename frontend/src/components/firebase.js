import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDG-LuoD6Sci95oPn2Vg9Xft71uY3lOvvk",
	authDomain: "kalingablogging.firebaseapp.com",
	projectId: "kalingablogging",
	storageBucket: "kalingablogging.appspot.com",
	messagingSenderId: "609820150737",
	appId: "1:609820150737:web:d654668a4aafd51d84eef0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export const database = firebase.database();
export default firebase;
