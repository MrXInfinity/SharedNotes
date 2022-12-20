import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewNoteModal: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const [isSharedSelected, setIsSharedSelected] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "",
      title: "",
    },
  });

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
        <Typography
          id="new-note-modal-title"
          sx={{ fontWeight: "bold", fontSize: { xs: 28, md: 32 } }}
        >
          New Note
        </Typography>
        <form>
          <FormControl>
            <FormLabel id="type-radio-label">Type</FormLabel>
            <RadioGroup
              row
              aria-labelledby="type-radio-buttons"
              defaultValue="personal"
              {...register("type")}
            >
              <FormControlLabel
                value="personal"
                control={<Radio />}
                label="Personal"
              />
              <FormControlLabel
                value="shared"
                control={<Radio />}
                label="Shared"
              />
            </RadioGroup>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default NewNoteModal;
