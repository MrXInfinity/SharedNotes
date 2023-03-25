import { collection, deleteDoc, doc, onSnapshot, orderBy, query, QuerySnapshot, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { auth } from "../firebase";
import { useState, useEffect } from 'react'
import { db } from "../firebase"
import { dbDataObject, noteType, updateNoteType, reminderType, updateTaskType } from '../types/firestoreDataTypes';
import moment from 'moment';

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

  const updateReminder = async ({id, ...data}: Pick<reminderType, "id" | "title" | "startTime" | "endTime">) => {
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
        doc(db, "Users", auth.currentUser!.uid, "Task", Date.now().toString()),
        {
          dueDateTime,
          title,
          favorite: false,
          status: moment().isBefore(parseInt(dueDateTime)) ? "forthcoming" : "missed",
          dateCreated: new Date(),
          dateUpdated: new Date(),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const toggleFinishTask = async (id: string, status: string) => {
    try {
      await updateDoc(
        doc(db, "Users", auth.currentUser!.uid, "Task", id),
        {
          status: status,
          dateUpdated: new Date()
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const updateTask = async ({ id, ...data }: any) => {
 
    try {
      await updateDoc(
        doc(db, "Users", auth.currentUser!.uid, "Task", id),
        {
          ...data,
          dateUpdated: new Date()
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const update = async ({ type, id, ...data }: { type: string, id: string, [key: string]: any }) => {
    try {
      await updateDoc(
        doc(db, "Users", auth.currentUser!.uid, type, id),
        {
          ...data,
          dateUpdated: new Date()
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const remove = async (type: string, id: string) => {
    try {
      await deleteDoc(doc(db, "Users", auth.currentUser!.uid, type, id))
    } catch (err) {
      console.log(err)
    }
   
  }

  return {addNote, addReminder, addTask, updateNote, updateReminder, remove, update, updateTask}
}

  

export default useFirestoreDb