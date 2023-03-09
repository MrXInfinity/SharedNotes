import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "./UIComponents";
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
      startingDueDate: null,
      endingDueDate: null,
    },
    shouldUnregister: true,
  });

  const { addReminder } = useFirestoreContext();

  const [formDatesData, setFormDatesData] = useState<reminderDateTypes>({
    startingDueDate: null,
    endingDueDate: null,
  });

  const closeModal = () => {
    setIsOpen(false);
    setFormDatesData({ startingDueDate: null, endingDueDate: null });
  };

  const formSubmit = ({
    title,
    startingDueDate,
    endingDueDate,
  }: reminderFormTypes) => {
    addReminder(
      title,
      startingDueDate!.format("x"),
      endingDueDate ? endingDueDate!.format("x") : null
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
              required
              error={errors?.startingDueDate ? true : false}
              helperText={errors?.startingDueDate?.message}
            />
          )}
          label="Starting Due Date"
          value={formDatesData.startingDueDate}
          {...register("startingDueDate", {
            required: "Please select a due date",
          })}
          onChange={(e) => {
            setValue("startingDueDate", e);
            setFormDatesData((state) => ({ ...state, startingDueDate: e }));
          }}
          minDateTime={moment(Date.now())}
          minTime={moment(Date.now())}
          maxDateTime={formDatesData.endingDueDate}
        />
        <DateTimePicker
          renderInput={(props) => (
            <TextField
              {...props}
              error={errors?.endingDueDate ? true : false}
              helperText={
                errors?.endingDueDate?.message ??
                "This is optional for reminders that have a start and end time"
              }
            />
          )}
          label="Ending Due Date"
          value={formDatesData.endingDueDate}
          {...register("endingDueDate")}
          onChange={(e) => {
            setValue("endingDueDate", e);
            setFormDatesData((state) => ({ ...state, endingDueDate: e }));
          }}
          minDateTime={formDatesData.startingDueDate}
          minTime={formDatesData.startingDueDate}
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
