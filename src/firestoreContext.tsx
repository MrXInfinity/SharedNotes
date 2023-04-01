import {
  collection,
  collectionGroup,
  doc,
  documentId,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { ref, StorageError } from "firebase/storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useDownloadURL } from "react-firebase-hooks/storage";
import { auth, db, storage } from "./firebase";
import {
  dbDataObject,
  noteType,
  publicNoteType,
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
  publicData: publicNoteType[];
  setPublicData: React.Dispatch<React.SetStateAction<publicNoteType[]>>;
  userData: userType;
  fetchProfilePics: {
    picValue: string | undefined;
    isPicLoading: boolean;
    picError: StorageError | undefined;
  };
};

const firestoreContext = createContext<firestoreContextProps>(
  {} as firestoreContextProps
);

type userType = {
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
};

const useFirestoreContext = () => useContext(firestoreContext);

export const FirestoreProvider: React.FC<React.ReactPortal> = ({
  children,
}) => {
  const [userData, setUserData] = useState<any>({});
  const [error, setError] = useState<Error>({} as Error | (() => Error));
  const [dbData, setDbData] = useState<dbDataObject>({
    Shared: [],
    Private: [],
    Reminder: [],
    Tasks: [],
  });
  const [publicData, setPublicData] = useState<publicNoteType[]>([]);
  const [noteContentData, setNoteContentData] = useState<noteType>(
    {} as noteType
  );
  console.log(noteContentData);

  const [isNoteEditorModalOpen, setIsNoteEditorModalOpen] = useState(false);
  const [picValue, isPicLoading, picError] = useDownloadURL(
    ref(storage, `${auth.currentUser!.uid}/profilePic.jpg`)
  );
  console.log(picValue, isPicLoading, picError);

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
      collection(db, "Users", auth.currentUser!.uid, "Shared"),
      orderBy("favorite", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<any>) => {
      setDbData((prev: any) => ({
        ...prev,
        Shared: querySnapshot.docs.map((doc, index) => {
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
        Reminder: querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }),
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
        Tasks: querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        }),
      }));
    });

    return () => unsubscribe();
  }, []);

  //PUBLIC NOTES QUERY
  useEffect(() => {
    const sharedQuery = query(
      collectionGroup(db, "Shared"),
      orderBy("dateCreated", "desc")
    );

    const unsubscribe = onSnapshot(
      sharedQuery,
      (sharedQuerySnapshot: QuerySnapshot<any>) => {
        console.log("did snapshot on shared");
        const authorList: string[] = [];
        const initialDataList: any[] = [];
        sharedQuerySnapshot.forEach((doc) => {
          initialDataList.push({ id: doc.id, ...doc.data() });
          authorList.push(doc.data().author);
        });

        onSnapshot(
          query(collection(db, "Users"), where(documentId(), "in", authorList)),
          (userQuerySnapshot: QuerySnapshot<any>) => {
            console.log("did snapshot on user");
            setPublicData(
              initialDataList.map((eachData, index) => {
                console.log(eachData);
                return {
                  ...eachData,
                  profilePicId: `${authorList[index]}/profilePic.jpg`,
                  author: userQuerySnapshot.docs
                    .map((doc) => {
                      if (doc.id === eachData.author)
                        return `${doc.data().firstname} ${doc.data().lastname}`;
                    })
                    .shift(),
                };
              })
            );
          }
        );
      }
    );

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
        publicData,
        setPublicData,
        userData,
        fetchProfilePics: { picValue, isPicLoading, picError },
      }}
    >
      {children}
    </firestoreContext.Provider>
  );
};

export default useFirestoreContext;
