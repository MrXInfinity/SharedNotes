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
} from "firebase/firestore";
import {
  dbDataObject,
  noteType,
  reminderType,
  taskType,
} from "./types/firestoreDataTypes";

type firestoreContextProps = {
  error: Error;
  dbData: {
    Shared: noteType[];
    Private: noteType[];
    Reminder: reminderType[];
    Tasks: taskType[];
  };
  noteContentData: noteType;
  setNoteContentData: React.Dispatch<React.SetStateAction<noteType>>;
  isNoteEditorModalOpen: boolean;
  setIsNoteEditorModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isNewReminderModalOpen: boolean;
  setIsNewReminderModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

  const [isNoteEditorModalOpen, setIsNoteEditorModalOpen] = useState(false);
  const [isNewReminderModalOpen, setIsNewReminderModalOpen] = useState(false);
  console.log(dbData);

  // SHARED NOTES QUERY
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

  //PRIVATE NOTES QUERY
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

  //REMINDER NOTES QUERY
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

  useEffect(() => {
    const q = query(
      collection(db, "Users", auth.currentUser!.uid, "Tasks"),
      orderBy("favorite", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      setDbData((prev: any) => ({
        ...prev,
        Tasks: querySnapshot.docs.map((doc) => {
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
        isNoteEditorModalOpen,
        setIsNoteEditorModalOpen,
        isNewReminderModalOpen,
        setIsNewReminderModalOpen,
      }}
    >
      {children}
    </firestoreContext.Provider>
  );
};

export default useFirestoreContext;
