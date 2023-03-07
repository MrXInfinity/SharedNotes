import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "./UIComponents";
import { useAddReminder } from "../hooks/useFirestoreDb";
import useFirestoreContext from "../firestoreContext";
import type {
  reminderFormTypes,
  reminderDateTypes,
} from "../types/modalContentTypes";

const NewReminderModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
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

  const [formDatesData, setFormDatesData] = useState<reminderDateTypes>({
    initialDate: null,
    dueDate: null,
  });

  const closeModal = () => {
    setIsOpen(false);
    setFormDatesData({ initialDate: null, dueDate: null });
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
          value={formDatesData.initialDate}
          {...register("initialDate")}
          onChange={(e) => {
            setValue("initialDate", e);
            setFormDatesData((state) => ({ ...state, initialDate: e }));
          }}
          minDateTime={moment(Date.now())}
          minTime={moment(Date.now())}
          maxDateTime={formDatesData.dueDate}
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
          value={formDatesData.dueDate}
          {...register("dueDate", {
            required: "Please select Due Date",
          })}
          onChange={(e) => {
            setValue("dueDate", e);
            setFormDatesData((state) => ({ ...state, dueDate: e }));
          }}
          minDateTime={formDatesData.initialDate}
          minTime={formDatesData.initialDate}
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
