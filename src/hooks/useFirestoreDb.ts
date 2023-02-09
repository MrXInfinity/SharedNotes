import { addDoc, collection, doc, FieldValue, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore';
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
console.log(new Date())
const useFirestoreDb = () => {
  const [error, setError] = useState<Error>({} as Error | (() => Error))

  const userCollection = collection(db, "Users")

  const addNewNote = async (type: string, title: string, tags: string[]) => {

    try {
      await setDoc(doc(db, "Users", auth.currentUser!.uid, type, Date.now().toString()), {
        title,
        tags,
        content: "",
        favorite: false,
        dateCreated: new Date(),
        dateUpdated: new Date()
      })
    } catch (err) {
      console.log(err)
    }

  }

  return {error, addNewNote}
}

const useFetchedNotes = (category: string) => {
  const [dbData, setDbData] = useState<dbDataType[]>([])
  
  const fetchDocuments = async () => {
  let dbCollection: any[] = []
      try {
        const documentCollection = await getDocs(collection(db, "Users", auth.currentUser!.uid, category));
        documentCollection.forEach((eachDocument) => {
          dbCollection.push(eachDocument.data())
        })
        setDbData(dbCollection)
      } catch (err) {
        console.log(err)
      }
  }
  useEffect(() => {
  fetchDocuments()
  }, [])
  
  return {dbData}
}

export { useFirestoreDb, useFetchedNotes}
export type { dbDataType }