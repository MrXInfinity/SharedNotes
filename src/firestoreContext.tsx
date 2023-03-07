import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";
import { db } from "./firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { dbDataObject, noteType } from "./types/firestoreDataTypes";

type firestoreContextProps = {
  error: Error;
  dbData: dbDataObject;
  noteContentData: noteType;
  setNoteContentData: React.Dispatch<React.SetStateAction<noteType>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateNote: () => Promise<void>;
  addNote: (type: string, title: string, tags: string[]) => Promise<void>;
  addReminder: (title: string, startTime: any, endTime: any) => Promise<void>;
  addTask: (dueDate: any, dueTime: any, title: string) => Promise<void>;
};

const firestoreContext = createContext<firestoreContextProps>(
  {} as firestoreContextProps
);

const useFirestoreContext = () => useContext(firestoreContext);

export const FirestoreProvider: React.FC<React.ReactPortal> = ({
  children,
}) => {
  const [error, setError] = useState<Error>({} as Error | (() => Error));
  const [dbData, setDbData] = useState<dbDataObject>({
    Shared: [],
    Private: [],
    Reminder: [],
    Tasks: [],
  });
  const [noteContentData, setNoteContentData] = useState<noteType>(
    {} as noteType
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(dbData);

  const addNote = async (type: string, title: string, tags: string[]) => {
    try {
      await setDoc(
        doc(db, "Users", auth.currentUser!.uid, type, Date.now().toString()),
        {
          noteType: type,
          title: [
            {
              type: "heading-one",
              children: [{ text: title }],
            },
          ],
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
  };

  const updateNote = async () => {
    try {
      await updateDoc(
        doc(
          db,
          "Users",
          auth.currentUser!.uid,
          noteContentData.noteType,
          noteContentData.id
        ),
        {
          ...noteContentData,
          dateUpdated: new Date(),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addReminder = async (title: string, startTime: any, endTime: any) => {
    try {
      await setDoc(
        doc(
          db,
          "Users",
          auth.currentUser!.uid,
          "Reminder",
          Date.now().toString()
        ),
        {
          startTime,
          endTime,
          title,
          favorite: false,
          status: "forthcoming",
          dateCreated: new Date(),
          dateUpdated: new Date(),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async (dueDate: any, dueTime: any, title: string) => {
    try {
      await setDoc(
        doc(
          db,
          "Users",
          auth.currentUser!.uid,
          "Reminder",
          Date.now().toString()
        ),
        {
          dueDate,
          dueTime,
          title,
          favorite: false,
          dateCreated: new Date(),
          dateUpdated: new Date(),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "Users", auth.currentUser!.uid, "Shared"),
      orderBy("favorite", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      setDbData((prev: any) => ({
        ...prev,
        Shared: querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }),
      }));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "Users", auth.currentUser!.uid, "Private"),
      orderBy("favorite", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      setDbData((prev: any) => ({
        ...prev,
        Private: querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }),
      }));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "Users", auth.currentUser!.uid, "Reminder"),
      orderBy("favorite", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      setDbData((prev: any) => ({
        ...prev,
        Reminder: querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }),
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <firestoreContext.Provider
      value={{
        error,
        dbData,
        noteContentData,
        setNoteContentData,
        isModalOpen,
        setIsModalOpen,
        updateNote,
        addNote,
        addReminder,
        addTask,
      }}
    >
      {children}
    </firestoreContext.Provider>
  );
};

export default useFirestoreContext;
