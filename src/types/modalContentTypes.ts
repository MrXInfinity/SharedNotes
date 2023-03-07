import { Moment } from "moment";

type reminderFormTypes = {
  title: string;
} & reminderDateTypes;


type reminderDateTypes = {
  initialDate: Moment | null;
  dueDate: Moment | null;
};



export type {reminderFormTypes, reminderDateTypes}
