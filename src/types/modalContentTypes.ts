import { Moment } from "moment";

type reminderFormTypes = {
  title: string;
  startTime: string | null;
  endTime: string | null
}

type taskFormTypes = {
  title: string;
  dueDateTime: string | null;
};



export type {reminderFormTypes, taskFormTypes}
