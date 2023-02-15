import { addDoc, collection, doc, FieldValue, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp, where } from 'firebase/firestore';
import { auth } from "../firebase";
import { useState, useEffect } from 'react'
import { db } from "../firebase"

type dbDataType = {
  title: string,
  content: string,
  favorite: boolean,
  tags?: string[],
  dateCreated: Timestamp,
  dateUpdated: Timestamp
}

type dbDataObject = {
  [category: string]: dbDataType[]
}

console.log(new Date())
const useFirestoreDb = (category: string) => {
  const [error, setError] = useState<Error>({} as Error | (() => Error))
  
  const userCollection = collection(db, "Users")
  

   

  return {error}
}
  

export { useFirestoreDb}
export type { dbDataType }