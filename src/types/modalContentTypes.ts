import { Moment } from "moment";

type reminderFormTypes = {
  title: string;
  startTime: string | null;
  endTime: string | null
}


type reminderDateTypes = {
  startTime: Moment | null;
  endTime: Moment | null;
};



export type {reminderFormTypes, reminderDateTypes}
