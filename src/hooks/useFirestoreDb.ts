import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { auth } from "../firebase";
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useState, useEffect } from 'react'
import { db } from "../firebase"
import { FirebaseError } from 'firebase/app';


// type Error = { [key: "email" | "firstname" | "lastname"]: { type: string, message: string } | {} }
type Error = Record<ObjectKeys, ErrorObject>
type ObjectKeys = string
type ErrorObject = {
  type: string, message: string
}

const useFirestoreDb = () => {
  const [error, setError] = useState({
    type: "",
    message: ""
  })
  const [newError, setNewError] = useState<Error>({} as Error | (() => Error))
  const [dbData, setDbData] = useState({})

  const userCollection = collection(db, "Users")

  const login = async (email: string, password: string) => {
    setError({
      type: "", message: ""
    });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log(err)
      if (err.code == AuthErrorCodes.INVALID_PASSWORD) {
        setError({
          type: "PASSWORD",
          message: "Invalid Password."
        })
      }
      if (err.code == AuthErrorCodes.USER_DELETED) {
        setError({
          type: "EMAIL",
          message: "User Not Found."
        })
      }
    }
  };

  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser!,
        { displayName: `${firstname} ${lastname}` })
      await setDoc(doc(db, "Users", auth.currentUser!.uid), {
        firstname,
        lastname,
        email,
      })
    } catch (err: any) {
      console.log(err)
      if (err.code == AuthErrorCodes.INVALID_EMAIL) {
        setError({
          type: "EMAIL",
          message: "Invalid Email."
        })
      }
      if (err.code == AuthErrorCodes.EMAIL_EXISTS) {
        setNewError({
          email: { type: "", message: "Email already in use." }
        })
      }
    }
  };

  const logout = async () => {
    try {
      signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };



  const addNewNote = async (type: string, title: string, tags: string[]) => {
    try {
      await addDoc(collection(db, "Users", auth.currentUser!.uid, "Notes"), {
        type,
        title,
        tags,
        dateCreated: new Date(),
        dateUpdated: new Date()
      })
    } catch (err) {
      console.log(err)
    }

  }

  const getNotes = async () => {
    try {
      const documentCollection = await getDocs(collection(db, "Users", auth.currentUser!.uid, "Notes"));
      setDbData(() => documentCollection.forEach(element => {
        
      });((eachDoc: any) => eachDoc.data()))
    } catch (err) {
      console.log(err)
    }
    

  }

  // const addUserToCollection = async ({userId}) => {
  //   try {
  //       await setDoc(doc(db, "cities", "new-city-id"), {

  //       });
  //   } catch (err) {

  //     }

  //   }

  // return {addUserToCollection}
  return { login, signup, logout, error, newError, addNewNote, getNotes, dbData }
}

export { useFirestoreDb }
export type { ErrorObject, ObjectKeys, Error }