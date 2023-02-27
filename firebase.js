// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  serverTimestamp,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  getMetadata,
} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwgJInC3a80tOo3T2C2mVm2kstPwXepZc",
  authDomain: "personal-portfolio-2-cb97c.firebaseapp.com",
  projectId: "personal-portfolio-2-cb97c",
  storageBucket: "personal-portfolio-2-cb97c.appspot.com",
  messagingSenderId: "295427163829",
  appId: "1:295427163829:web:9abed57576faa7c34060fc",
  measurementId: "G-B7942CJME8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//create db firebase v9

const db = getFirestore(app);

//get files from firebase storage
const storage = getStorage(app);

export async function getImageAndVideos({ setUrls, project, urlsState }) {
  const listRef = ref(storage, `portfolio/${project}`);
  const urls = [];
  const list = await listAll(listRef);
  list.items.forEach((itemRef) => {
    var url;
    var metadata;
    getDownloadURL(itemRef).then((url) => {
      url = url;

      getMetadata(itemRef).then((metadata) => {
        urls.push({
          url: url,
          metadata: metadata,
        });

        // console.log(metadata);
      });
    });
    setUrls(urls);
    urlsState = urls;
  });
}

//send To Db when user clicks on a button
export async function sendToDb({ project_button, lat, lng }) {
  await addDoc(collection(db, "usage"), {
    project_button: project_button,
    timestamp: serverTimestamp(),
    lat: lat,
    lng: lng,
  });
}
