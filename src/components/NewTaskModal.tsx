import { Button, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { useForm } from "react-hook-form";
import { ModalWrapper } from "./UIComponents";

export type FormTypes = {
  title: string;
  description: string;
  dueDate: Moment | null;
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
  } = useForm<FormTypes>({
    defaultValues: {
      title: "",
      dueDate: null,
    },
    shouldUnregister: true,
  });

  const [dueDate, setDueDate] = useState<Moment | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    setDueDate(null);
  };

  const formSubmit = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    if (dueDate) {
      setValue("dueDate", dueDate);
    }
  }, [dueDate]);

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
        {/* <TextInputComponent<FormTypes>
          label="Title"
          title="title"
          maxLength={20}
          register={register}
          errors={errors}
        /> */}

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
        <TextField
          type="text"
          variant="outlined"
          label="Description"
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
              error={errors?.dueDate ? true : false}
              helperText={errors?.dueDate?.message}
            />
          )}
          label="Due Date"
          value={dueDate}
          {...register("dueDate", {
            required: "Provide the due date of your task.",
          })}
          onChange={(e) => setDueDate(e)}
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
