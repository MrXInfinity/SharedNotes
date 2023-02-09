import { doc, setDoc  } from 'firebase/firestore';
import { auth } from "../firebase";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from 'react'
import { db } from "../firebase"


type ErrorType = Record<ErrorKeys, ErrorValues>
type ErrorKeys = string
type ErrorValues = {
  type: string, message: string
}

const useAuth = () => {
  const [error, setError] = useState<ErrorType>({} as ErrorType | (() => ErrorType))

    const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.log(err)
      if (err.code == AuthErrorCodes.INVALID_PASSWORD) {
        setError({
          password: { type: "INVALID_PASSWORD", message: "Password is invalid." }
        })
      }
      if (err.code == AuthErrorCodes.USER_DELETED) {
        setError({
          email: { type: "USER_NOT_FOUND", message: "User Not Found." }
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
          email: { type: "INVALID_EMAIL", message: "Email is invalid." }
        })
      }
      if (err.code == AuthErrorCodes.EMAIL_EXISTS) {
        setError({
          email: { type: "EMAIL_EXISTS", message: "Email already in use." }
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

  return {login, signup, logout, error}
}

export default useAuth
export type { ErrorKeys, ErrorValues, ErrorType }