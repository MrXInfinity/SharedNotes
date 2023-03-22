import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth } from "../firebase";
import { useState, useEffect } from 'react'
import { db } from "../firebase"
import { dbDataObject, noteType, updateNoteType, reminderType } from '../types/firestoreDataTypes';

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

  const addReminder = async ({
    title,
    startTime,
    endTime
  }: Pick<reminderType, "title" | "startTime" | "endTime">) => {
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
  // Pick<reminderType, "id" | "title" | "startTime" | "endTime">

  const updateReminder = async ({id, ...data}: any) => {
    try {
      await updateDoc(
        doc(db, "Users", auth.currentUser!.uid, "Reminder", id),
        {
          ...data,
          dateUpdated: new Date()
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const addTask = async (title: string, dueDateTime: string) => {
    try {
      await setDoc(
        doc(db, "Users", auth.currentUser!.uid, "Tasks", Date.now().toString()),
        {
          dueDateTime,
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

  const remove = async (type: "string", id: "string") => await deleteDoc(doc(db, "Users", auth.currentUser!.uid, type, id))

  return {addNote, addReminder, addTask, updateNote, updateReminder, remove}
}

  

export default useFirestoreDb