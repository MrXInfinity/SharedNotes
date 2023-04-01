import { Timestamp } from "firebase/firestore"

type textChildrenContent = {
  text: string
}

type childrenContainerContent = {
  type?: string,
  link?: string,
  children?: childrenContainerContent[] | textChildrenContent[]
}

type publicNoteType = noteType & {
  author: string
  profilePicId: string,
} 

type noteType = {
  id: string
  noteType: "private" | "shared"
  title: childrenContainerContent[]
  content: childrenContainerContent[] | string,
  favorite: boolean,
  tags?: string[],
  dateCreated: Timestamp,
  dateUpdated: Timestamp
} 

type updateNoteType = Pick<noteType, "noteType" | "id" | "title" | "content">


type reminderType = {
  id: string
  startTime: any,
  endTime: any,
  title: string,
  favorite: boolean,
  status: "forthcoming" | "ongoing" | "finished",
  dateCreated: Timestamp,
  dateUpdated: Timestamp
}

type updateReminderType = Pick<reminderType, "id" | "title" | "startTime" | "endTime">

type taskType = {
  id: string
  dueDateTime: any,
  title: string,
  status: "forthcoming" | "finished" | "missed",
  favorite: boolean,
  dateCreated: Timestamp,
  ateUpdated: Timestamp
}

type updateTaskType = Pick<taskType, "id" | "title" | "dueDateTime">

type dbDataObject = {
   Shared: noteType[];
    Private: noteType[];
    Reminder: reminderType[];
    Tasks: taskType[];
}


export type {noteType, reminderType, taskType, dbDataObject, updateNoteType, updateReminderType, updateTaskType, publicNoteType}