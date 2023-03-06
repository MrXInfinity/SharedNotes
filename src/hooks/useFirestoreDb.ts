import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth } from "../firebase";
import { useState, useEffect } from 'react'
import { db } from "../firebase"
import { dbDataObject, noteType } from '../types/firestoreDataTypes';

const useFirestoreDb = (category: string) => {
  const [error, setError] = useState<Error>({} as Error | (() => Error))
  const [dbData, setDbData] = useState<dbDataObject>({
    Shared: [],
    Private: [],
  });
  const [noteContentData, setNoteContentData] = useState<noteType>({} as noteType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
        const q = query(
          collection(db, "Users", auth.currentUser!.uid, category),
          orderBy("favorite", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
          setDbData((prev: any) => ({
            ...prev,
            [category]: querySnapshot.docs.map((doc) => {
              return  {id: doc.id, ...doc.data()}
            })
          }))
         
        });

    return () => unsubscribe()
  }, [category]);

  const updateNote = async () => {
    
    try {
      await updateDoc(
        doc(db, "Users", auth.currentUser!.uid, noteContentData.noteType, noteContentData.id),
        {
          ...noteContentData,
          dateUpdated: new Date()
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return {error, dbData, noteContentData, setNoteContentData, isModalOpen, setIsModalOpen, updateNote}
}

  const useAddNote = async (type: string, title: string, tags: string[]) => {
    try {
      await setDoc(
        doc(db, "Users", auth.currentUser!.uid, type, Date.now().toString()),
        {
          noteType: type,
          title: [{
            type: "heading-one",
            children: [
              {text: title}
            ]
          }],
          tags,
          content: "",
          favorite: false,
          dateCreated: new Date(),
          dateUpdated: new Date(),
        }
      );
    } catch (err) {
      console.log(err);
    }
}
  
const useAddReminder = async (title: string, startTime: any, endTime: any) => {
  try {
    await setDoc(doc(db, "Users", auth.currentUser!.uid, "Reminder", Date.now().toString()), {
      startTime,
      endTime,
      title,
      favorite: false,
      status: "forthcoming",
      dateCreated: new Date(),
      dateUpdated: new Date(),
    })
  } catch (err) {
    console.log(err)
  }
}

const useAddTask = async (dueDate: any, dueTime: any, title: string) => {
  try {
    await setDoc(doc(db, "Users", auth.currentUser!.uid, "Reminder", Date.now().toString()), {
      dueDate,
      dueTime,
      title,
      favorite: false,
      dateCreated: new Date(),
      dateUpdated: new Date(),
    })
  } catch (err) {
    console.log(err)
  }
}
  
  

export { useFirestoreDb, useAddNote, useAddReminder, useAddTask}