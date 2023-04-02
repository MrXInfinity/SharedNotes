import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useState } from "react";
import moment from "moment";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "./UIComponents";
import type {
  reminderFormTypes,
  reminderDateTypes,
} from "../types/modalContentTypes";
import useFirestoreDb from "../hooks/useFirestoreDb";
import { modalStateTypes } from "./Navigation";

const NewReminderModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<modalStateTypes>>;
}> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<reminderFormTypes>({
    defaultValues: {
      title: "",
      startTime: null,
      endTime: null,
    },
    shouldUnregister: true,
  });

  const { add } = useFirestoreDb();

  const [formDatesData, setFormDatesData] = useState<reminderDateTypes>({
    startTime: null,
    endTime: null,
  });

  const closeModal = () => {
    setIsOpen({
      isOpen: false,
      type: "",
    });
    setFormDatesData({ startTime: null, endTime: null });
  };

  const formSubmit = (data: reminderFormTypes) => {
    add({ type: "Reminder", status: "forthcoming", ...data });
    closeModal();
  };
  console.log(formDatesData);

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
              error={errors?.startTime ? true : false}
              helperText={errors?.startTime?.message}
            />
          )}
          label="Starting Due Date"
          value={formDatesData.startTime}
          {...register("startTime", {
            required: "Please select a due date",
          })}
          onChange={(data) => {
            setValue("startTime", data!.format("x"));
            setFormDatesData((state) => ({ ...state, startTime: data }));
          }}
          minDateTime={moment(Date.now())}
          minTime={moment(Date.now())}
          maxDateTime={formDatesData.endTime}
        />
        <DateTimePicker
          renderInput={(props) => (
            <TextField
              {...props}
              error={errors?.endTime ? true : false}
              helperText={
                errors?.endTime?.message ??
                "This is optional for reminders that have a start and end time"
              }
            />
          )}
          label="Ending Due Date"
          value={formDatesData.endTime}
          {...register("endTime")}
          onChange={(data) => {
            setValue("endTime", data ? data!.format("x") : null);
            setFormDatesData((state) => ({ ...state, endTime: data }));
          }}
          minDateTime={formDatesData.startTime}
          minTime={formDatesData.startTime}
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
