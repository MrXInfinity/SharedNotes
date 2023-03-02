import { addDoc, collection, doc, DocumentData, FieldValue, getDocs, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp, where } from 'firebase/firestore';
import { auth } from "../firebase";
import { useState, useEffect } from 'react'
import { db } from "../firebase"

type textChildrenContent = {
  text: string
}

type childrenContainerContent = {
  type?: string,
  link?: string,
  children?: childrenContainerContent[] | textChildrenContent[]
}

type dbDataType = {
  id: string
  noteType: "private" | "shared"
  title: childrenContainerContent[]
  content: childrenContainerContent[] | string,
  favorite: boolean,
  tags?: string[],
  dateCreated: Timestamp,
  dateUpdated: Timestamp
} 

type dbDataObject = {
  [category: string]: dbDataType[]
}

const useFirestoreDb = (category: string) => {
  const [error, setError] = useState<Error>({} as Error | (() => Error))
  const [dbData, setDbData] = useState<dbDataObject>({
    Shared: [],
    Private: [],
  });
  const [noteContentData, setNoteContentData] = useState<dbDataType>({} as dbDataType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  console.log(dbData)
  
  useEffect(() => {
    console.log("fetchingg");
        const q = query(
          collection(db, "Users", auth.currentUser!.uid, category),
          orderBy("favorite", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      console.log("unsubbing")
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
    console.log(auth.currentUser!.uid, noteContentData.noteType, noteContentData.id)
    try {
      await setDoc(
        doc(db, "Users", auth.currentUser!.uid, noteContentData.noteType, noteContentData.id),
        {
          noteContentData
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  return {error, dbData, noteContentData, setNoteContentData, isModalOpen, setIsModalOpen, updateNote}
}

  const useAddNewNote = async (type: string, title: string, tags: string[]) => {
    try {
      await setDoc(
        doc(db, "Users", auth.currentUser!.uid, type, Date.now().toString()),
        {
          noteType: type,
          title: {
            type: "heading-one",
            children: [
              {text: title}
            ]
          },
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
  
  
  

export { useFirestoreDb, useAddNewNote}
export type { dbDataType }