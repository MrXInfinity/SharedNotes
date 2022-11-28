import { useState, useEffect } from "react"
import { auth } from "../firebase"
import {signInWithEmailAndPassword, UserCredential} from "firebase/auth"


type AuthFunctionType = (email: string, password: string) => void

const UseAuthenticate = () => {
    const [currentUser, setCurrentUser] = useState<UserCredential | (() => UserCredential)>()

    const login: AuthFunctionType = async (email, password) => {
        try {
            const user =  await signInWithEmailAndPassword(auth, email, password)
            setCurrentUser(user)
        } catch (err) {
            console.log(err)
        }
    }

  return {currentUser, login}
      
}

export default UseAuthenticate