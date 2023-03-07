import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useReducer } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "./UIComponents";
import { useAddReminder } from "../hooks/useFirestoreDb";
import useFirestoreContext from "../firestoreContext";
import type {
  reminderFormTypes,
  reminderReducerStateTypes,
  reminderReducerActionTypes,
} from "../types/modalContentTypes";

const dateReducer = (
  state: reminderReducerStateTypes,
  { type, payload }: reminderReducerActionTypes
) => {
  switch (type) {
    case "SET_INITIAL_DATE": {
      return { ...state, initialDate: payload };
    }
    case "SET_DUE_DATE": {
      return { ...state, dueDate: payload };
    }
    case "DELETE_ALL": {
      return { initialDate: payload, dueDate: payload };
    }
    default:
      return state;
  }
};

const NewReminderModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<reminderFormTypes>({
    defaultValues: {
      title: "",
      initialDate: null,
      dueDate: null,
    },
    shouldUnregister: true,
  });

  const { addReminder } = useFirestoreContext();

  const [state, dispatch] = useReducer(dateReducer, {
    initialDate: null,
    dueDate: null,
  });

  const closeModal = () => {
    setIsOpen(false);
    dispatch({ type: "DELETE_ALL", payload: null });
  };

  const formSubmit = ({ title, initialDate, dueDate }: reminderFormTypes) => {
    addReminder(
      title,
      initialDate ? typeof initialDate.format("x") : null,
      dueDate!.format("x")
    );
    closeModal();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="New Reminder"
      closeModal={closeModal}
    >
      <form
        onSubmit={handleSubmit(formSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          marginTop: "1rem",
        }}
      >
        <TextField
          variant="outlined"
          required
          label="Title"
          aria-label="title-text-field"
          error={errors?.title ? true : false}
          helperText={errors?.title?.message}
          {...register("title", {
            required: "Provide the title of your task.",
            minLength: {
              value: 2,
              message: "Please provide more characters for your title.",
            },
            maxLength: {
              value: 20,
              message: "Please remove some characters from your title.",
            },
          })}
        />

        <DateTimePicker
          renderInput={(props) => (
            <TextField
              {...props}
              error={errors?.initialDate ? true : false}
              helperText={
                errors?.initialDate?.message ??
                "An initial date is optional for reminders that have a start and an end."
              }
            />
          )}
          label="Initial-Date-Time-Picker"
          value={state.initialDate}
          {...register("initialDate")}
          onChange={(e) => {
            setValue("initialDate", e);
            dispatch({ type: "SET_INITIAL_DATE", payload: e });
          }}
          minDateTime={moment(Date.now())}
          minTime={moment(Date.now())}
          maxDateTime={state.dueDate}
        />
        <DateTimePicker
          renderInput={(props) => (
            <TextField
              required
              {...props}
              error={errors?.dueDate ? true : false}
              helperText={errors?.dueDate?.message ?? ""}
            />
          )}
          label="Due-Date-Time-Picker"
          value={state.dueDate}
          {...register("dueDate", {
            required: "Please select Due Date",
          })}
          onChange={(e) => {
            setValue("dueDate", e);
            dispatch({ type: "SET_DUE_DATE", payload: e });
          }}
          minDateTime={state.initialDate}
          minTime={state.initialDate}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ alignSelf: "flex-end", mt: 2.5 }}
        >
          Create New Reminder
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default NewReminderModal;
