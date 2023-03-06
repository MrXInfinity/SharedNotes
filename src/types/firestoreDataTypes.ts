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

type reminderType = {
  startTime: any,
  endiTime: any,
  desc: string,
  favorite: boolean,
  status: "forthcoming" | "ongoing" | "finished",
  dateCreated: Timestamp,
  dateUpdated: Timestamp
}

type taskType = {
  dueDate: any,
  dueTime: any,
  desc: string,
  favorite: boolean,
  dateCreated: Timestamp,
  ateUpdated: Timestamp
}

type dbDataObject = {
  [category: string]: noteType[]
}

export type {noteType, reminderType, taskType, dbDataObject}