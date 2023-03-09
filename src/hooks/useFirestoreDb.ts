import { collection, doc, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth } from "../firebase";
import { useState, useEffect } from 'react'
import { db } from "../firebase"
import { dbDataObject, noteType, updateNoteType } from '../types/firestoreDataTypes';

const useFirestoreDb = () => {

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

  }

  const updateNote = async ({noteType, id, title, content}: updateNoteType) => {
    try {
      await updateDoc(
        doc(db, "Users", auth.currentUser!.uid, noteType, id),
        {
          title,
          content,
          dateUpdated: new Date()
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const addReminder = async (
    title: string,
    startTime: string,
    endTime: string | null
  ) => {
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

  const addTask = async (title: string, dueDateTime: string) => {
    try {
      await setDoc(
        doc(db, "Users", auth.currentUser!.uid, "Tasks", Date.now().toString()),
        {
          dueDateTime,
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

  return {addNote, addReminder, addTask, updateNote}
}

  

export default useFirestoreDb