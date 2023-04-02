import { Timestamp } from "firebase/firestore"

type childrenContainerContent = {
  type?: string,
  link?: string,
  children?: childrenContainerContent[] | { text: string }[]
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
  dueDateTime: any,
  title: string,
  status: "forthcoming" | "finished" | "missed",
  favorite: boolean,
  dateCreated: Timestamp,
  ateUpdated: Timestamp
}


export type {noteType, reminderType, taskType, publicNoteType}