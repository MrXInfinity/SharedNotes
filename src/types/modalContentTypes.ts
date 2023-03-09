import { Moment } from "moment";

type reminderFormTypes = {
  title: string;
} & reminderDateTypes;


type reminderDateTypes = {
  startingDueDate: Moment | null;
  endingDueDate: Moment | null;
};



export type {reminderFormTypes, reminderDateTypes}
