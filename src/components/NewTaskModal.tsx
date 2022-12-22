import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import { useForm } from "react-hook-form";

type FormTypes = {
  title: string;
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
    setError,
    clearErrors,
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
    <Modal
      open={isOpen}
      onClose={() => closeModal()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
        >
          <Typography
            id="new-note-modal-title"
            sx={{ fontWeight: "bold", fontSize: { xs: 28, md: 32 } }}
          >
            New Task
          </Typography>
          <IconButton onClick={() => closeModal()}>
            <CloseIcon />
          </IconButton>
        </Stack>
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
            label="DateTimePicker"
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
      </Box>
    </Modal>
  );
};

export default NewTaskModal;
