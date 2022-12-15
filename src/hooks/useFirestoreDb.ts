import { doc, setDoc } from 'firebase/firestore';
import React from 'react'
import {db} from "../firebase"

const useFirestoreDb = () => {

    const addUserToCollection = async () => {
        await setDoc(doc(db, "cities", "new-city-id"), {
            
        });
    }

  return 
}

export default useFirestoreDb