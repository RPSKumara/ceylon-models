import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import Swal from "sweetalert2";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcvgD5DwZmmgw_YIvno_vUHY23WwbyXc0",
  authDomain: "ceylon-models-dsd.firebaseapp.com",
  projectId: "ceylon-models-dsd",
  storageBucket: "ceylon-models-dsd.appspot.com",
  messagingSenderId: "205361986913",
  appId: "1:205361986913:web:3ec3c154804a92154d1920",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    customAlert(`${err.message}`, "error");
  }
};

const registerWithEmailAndPassword = async (email, password, name) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/ceylon-models-dsd.appspot.com/o/users%2Fceylon-models-high-resolution-logo-black-on-transparent-background.png?alt=media&token=dc24f492-f7d3-4759-be45-ec7c6b38f951",
    });

    const user = res.user;
    await setDoc(doc(db, "albums-count", `${email}`), {
      uid: user.uid,      
      user_email: email,
      total_albums: 0,
      count: 1,
    });
  } catch (err) {
    customAlert(`${err.message}`, "error");
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("password reset");
  } catch (err) {
    customAlert(`This email haven't account`, "error");
  }
};

const logout = () => {
  signOut(auth);
};

const customAlert = (name, type) => {
  // success , error , warning , info , question
  const Toast = Swal.mixin({
    toast: true,
    position: "center",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: type,
    title: name,
  });
};
export {
  db,
  storage,
  auth,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  customAlert,
};
