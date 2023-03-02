import React, { useState, useEffect, useContext, createContext } from "react";
import { auth } from "./firebase";
import { db } from "./firebase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";

type firestoreContextProps = {
  dbData: dbDataObject;
  setLocalCategory: React.Dispatch<React.SetStateAction<string>>;
  addNewNote: (type: string, title: string, tags: string[]) => void;
};

export type dbDataType = {
  title: string;
  content: string;
  favorite: boolean;
  tags?: string[];
  dateCreated: Timestamp;
  dateUpdated: Timestamp;
};

type dbDataObject = {
  [index: string]: dbDataType[];
};

const firestoreContext = createContext<firestoreContextProps>(
  {} as firestoreContextProps
);

const useFirestoreContext = () => useContext(firestoreContext);

export const FirestoreProvider: React.FC<React.ReactPortal> = ({
  children,
}) => {
  const [dbData, setDbData] = useState<dbDataObject>({
    Shared: [],
    Private: [],
  });
  const [localCategory, setLocalCategory] = useState("Shared");

  console.log(dbData);

  useEffect(() => {
    console.log("fetchingg");
    if (auth.currentUser) {
      try {
        const q = query(
          collection(db, "Users", auth.currentUser!.uid, localCategory),
          orderBy("favorite", "desc")
        );
        onSnapshot(q, (querySnapshot) => {
          querySnapshot.docChanges().forEach(({ type, doc }: any) => {
            if (type === "added") {
              console.log("data added...");
              setDbData((prev) => ({
                ...prev,
                [localCategory]: [doc.data(), ...prev[localCategory]],
              }));
            }
            // if (type === "modified") {
            //   console.log("modified");
            //   setDbData((prev) => ({
            //     ...prev,
            //     [category]: [doc.data(), ...prev[category]],
            //   }));
            // }
            // if (type === "removed") {
            //   console.log("Removed city: ", doc.data());
            // }
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const addNewNote = async (type: string, title: string, tags: string[]) => {
    try {
      await setDoc(
        doc(db, "Users", auth.currentUser!.uid, type, Date.now().toString()),
        {
          title,
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

  return (
    <firestoreContext.Provider value={{ dbData, setLocalCategory, addNewNote }}>
      {children}
    </firestoreContext.Provider>
  );
};

export default useFirestoreContext;
