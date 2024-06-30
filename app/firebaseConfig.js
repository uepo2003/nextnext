
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAtWlVzfqHDhvet-ReGwBa1HmG_4Hpa23E",
  authDomain: "react-prac-f6336.firebaseapp.com",
  projectId: "react-prac-f6336",
  storageBucket: "react-prac-f6336.appspot.com",
  messagingSenderId: "815216470461",
  appId: "1:815216470461:web:ebca107a95b82d15de0ad4",
  measurementId: "G-B803NB4F9P"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
