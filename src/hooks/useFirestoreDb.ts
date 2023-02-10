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
    try {
       const q = query(collection(db, "Users", auth.currentUser!.uid, category), orderBy("favorite", "desc"));
       const documentCollection = onSnapshot(q, (querySnapshot) => {
         querySnapshot.docChanges().forEach(({type, doc}: any) => {
           if (type === "added") {
             setDbData(arr => [...arr, doc.data()])
             console.log("initial data added...")
           }
           if (type === "modified") {
             console.log("modified")
              setDbData(arr => [...arr, doc.data()])
            }
          if (type === "removed") {
                console.log("Removed city: ", doc.data());
            }
         })
       })
    } catch (err) {
      console.log(err)
     }
   }
       
  useEffect(() => {
    console.log("side effect on fetch")
    fetchDocuments()
  }, [category])

  return {dbData}
}

export { useFirestoreDb, useFetchedNotes}
export type { dbDataType }