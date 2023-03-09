import { Timestamp } from "firebase/firestore"

type textChildrenContent = {
  text: string
}

type childrenContainerContent = {
  type?: string,
  link?: string,
  children?: childrenContainerContent[] | textChildrenContent[]
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

type taskType = {
  id: string
  dueDate: any,
  dueTime: any,
  title: string,
  favorite: boolean,
  dateCreated: Timestamp,
  ateUpdated: Timestamp
}

type dbDataObject = {
   Shared: noteType[];
    Private: noteType[];
    Reminder: reminderType[];
    Tasks: taskType[];
}


export type {noteType, reminderType, taskType, dbDataObject, updateNoteType}