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
import React, { useState } from "react";
import moment, { Moment } from "moment";
import { useForm } from "react-hook-form";

const NewReminderModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      initialDate: null,
      dueDate: null,
    },
  });
  const [initialDate, setInitialDate] = useState<Moment | null>(
    moment(Date.now())
  );
  const [dueDate, setDueDate] = useState<Moment | null>(null);

  console.log(watch());

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
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
            New Reminder
          </Typography>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <form
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
            {...register("title")}
          />

          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={initialDate}
            {...register("initialDate", {
              required: "Please specify the Initial Date",
            })}
            onChange={(e) => setInitialDate(e)}
            minDateTime={moment(Date.now())}
            minTime={moment(Date.now())}
          />
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            disabled={initialDate ? false : true}
            value={dueDate}
            onChange={(e) => setDueDate(e)}
            minDateTime={initialDate}
            minTime={initialDate}
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

export default NewReminderModal;
