import React from "react";


// ! step :1 importing createContext  
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { db } from "./firbase";
// import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithRedirect,
} from "firebase/auth";
// import { async } from "regenerator-runtime";
// import {doc, setDoc} from "firebase/firestore"
import { ToastContainer, toast } from "react-toastify";


// ! step: 2 Create a custom context: Define your custom context using the createContext function from React.

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  let auth = getAuth();

  // const collectionRef = collection(db, "users")

  const [user, setUser] = useState({});

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      savedShows: [],
      // savedMovies:[]
    });
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    auth.signOut();
    toast.warn("You have logged out");
  }

  // let googleProvider = new GoogleAuthProvider();
 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // alert("logged out successfully")
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}



// ? The UserAuth function in the provided code is a helper function that allows components to access the values and functions provided by the AuthContext context. It uses the useContext hook from React to consume the context and return the context value.

// ? By using the UserAuth function, you can easily access the context values and functions in any component without having to manually import and use the useContext hook