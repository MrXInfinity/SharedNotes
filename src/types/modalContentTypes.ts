import { Moment } from "moment";

type reminderFormTypes = {
  title: string;
} & reminderReducerStateTypes;

type reminderReducerStateTypes = {
  initialDate: Moment | null;
  dueDate: Moment | null;
};

type reminderReducerActionTypes = {
  type: string;
  payload: Moment | null;
};

export type {reminderFormTypes, reminderReducerStateTypes, reminderReducerActionTypes}
