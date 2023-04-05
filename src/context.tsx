import {
  collection,
  collectionGroup,
  doc,
  documentId,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { ref, StorageError } from "firebase/storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { auth, db, storage } from "./firebase";
import {
  noteType,
  publicNoteType,
  reminderType,
  taskType,
} from "./types/firestoreDataTypes";

type contextProps = {
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
  userData: userType;
  fetchProfilePics: {
    picValue: string | undefined;
    isPicLoading: boolean;
    picError: StorageError | undefined;
  };
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<contextProps>({} as contextProps);

type userType = {
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
};

const useAppContext = () => useContext(AppContext);

export const ContextProvider: React.FC<React.ReactPortal> = ({ children }) => {
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState<Error>({} as Error | (() => Error));
  const [dbData, setDbData] = useState<{
    Shared: noteType[];
    Private: noteType[];
    Reminder: reminderType[];
    Tasks: taskType[];
  }>({
    Shared: [],
    Private: [],
    Reminder: [],
    Tasks: [],
  });
  const [noteContentData, setNoteContentData] = useState<noteType>(
    {} as noteType
  );

  const [isNoteEditorModalOpen, setIsNoteEditorModalOpen] = useState(false);
  const [picValue, isPicLoading, picError] = useDownloadURL(
    ref(storage, `${auth.currentUser!.uid}/profilePic.jpg`)
  );
  const [isLoading, setIsLoading] = useState(true);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("inside timer");
      setIsLoading(false);
    }, 3000);
    return () => {
      setIsLoading(true);
      clearTimeout(timer);
    };
  }, []);

  // USER DATA
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "Users", auth.currentUser!.uid),
      (doc: any) => {
        setUserData({ ...doc.data() });
      },
      (err) => {
        console.log(err);
        setError(err);
      }
    );

    return () => unsubscribe();
  }, []);

  // SHARED NOTES QUERY
  useEffect(() => {
    const q = query(
      collection(db, "Shared"),
      orderBy("favorite", "desc"),
      where("author", "==", auth.currentUser!.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      setDbData((prev: any) => ({
        ...prev,
        Shared: querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
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
        Private: querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      }));
    });

    return () => unsubscribe();
  }, []);

  //REMINDER QUERY
  useEffect(() => {
    const q = query(
      collection(db, "Users", auth.currentUser!.uid, "Reminder"),
      orderBy("favorite", "desc"),
      orderBy("startTime", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      setDbData((prev: any) => ({
        ...prev,
        Reminder: querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      }));
    });

    return () => unsubscribe();
  }, []);

  //TASK QUERY
  useEffect(() => {
    const q = query(
      collection(db, "Users", auth.currentUser!.uid, "Task"),
      orderBy("favorite", "desc"),
      orderBy("dueDateTime", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      setDbData((prev: any) => ({
        ...prev,
        Tasks: querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        error,
        dbData,
        noteContentData,
        setNoteContentData,
        isNoteEditorModalOpen,
        setIsNoteEditorModalOpen,
        userData,
        fetchProfilePics: { picValue, isPicLoading, picError },
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default useAppContext;
