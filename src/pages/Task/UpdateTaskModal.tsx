import { TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "../../components/UIComponents";
import useFirestoreDb from "../../hooks/useFirestoreDb";
import { taskType } from "../../types/firestoreDataTypes";
import { taskFormTypes } from "../../types/modalContentTypes";

const UpdateTaskModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: taskType;
  setData: React.Dispatch<React.SetStateAction<taskType>>;
}> = ({ isOpen, setIsOpen, data: { id, dueDateTime, title }, setData }) => {
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    dueDateTime: string;
  }>({
    shouldUnregister: true,
  });

  const { update } = useFirestoreDb();

  const formSubmit = (data: taskFormTypes) => {
    update({ id, type: "Task", ...data });
    setIsOpen(false);
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      title="Update Task"
      closeModal={() => {
        setIsOpen(false);
        reset();
      }}
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
          defaultValue={title}
          variant="outlined"
          label="Title"
          aria-label="title-text-field"
          onChange={(e) => {
            setValue("title", e.target.value);
            setData((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
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
          value={
            typeof dueDateTime === "string"
              ? parseInt(dueDateTime)
              : dueDateTime
          }
          onChange={(data) => {
            setValue("dueDateTime", data!.format("x"));
            setData((prev) => ({
              ...prev,
              dueDateTime: data,
            }));
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
          Update Task
        </Button>
      </form>
    </ModalWrapper>
  );
};

export default UpdateTaskModal;
