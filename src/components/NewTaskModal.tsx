import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "./UIComponents";
import useFirestoreDb from "../hooks/useFirestoreDb";
import { taskFormTypes } from "../types/modalContentTypes";

export type FormTypes = {
  title: string;
  dueDateTime: Moment | null;
};

const NewTaskModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<taskFormTypes>({
    defaultValues: {
      title: "",
      dueDateTime: null,
    },
    shouldUnregister: true,
  });

  const [dueDateTime, setDueDateTime] = useState<Moment | null>(null);
  const { addTask } = useFirestoreDb();

  const closeModal = () => {
    setIsOpen(false);
    setDueDateTime(null);
  };

  const formSubmit = ({ title, dueDateTime }: taskFormTypes) => {
    addTask(title, dueDateTime!);
    closeModal();
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="New Task"
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
          label="Title"
          aria-label="title-text-field"
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
              error={errors?.dueDateTime ? true : false}
              helperText={errors?.dueDateTime?.message}
            />
          )}
          label="Due Date"
          value={dueDateTime}
          {...register("dueDateTime", {
            required: "Provide the due date of your task.",
          })}
          onChange={(data) => {
            setValue("dueDateTime", data!.format("x"));
            setDueDateTime(data);
          }}
          minDateTime={moment(Date.now())}
          minTime={moment(Date.now())}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{ alignSelf: "flex-end", mt: 2.5 }}
        >
          Create New Task
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default NewTaskModal;
