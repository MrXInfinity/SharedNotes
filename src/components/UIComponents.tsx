import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { FormTypes } from "./NewTaskModal";

const ModalWrapper: React.FC<{
  isOpen: boolean;
  title: string | JSX.Element;
  closeModal: () => void;
  options?: JSX.Element;
  children: React.ReactNode;
}> = ({ isOpen, title, closeModal, children }) => {
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
          {typeof title === "string" ? (
            <Typography
              id="new-note-modal-title"
              sx={{ fontWeight: "bold", fontSize: { xs: 24, md: 32 } }}
            >
              {title}
            </Typography>
          ) : (
            title
          )}

          <IconButton onClick={() => closeModal()}>
            <CloseIcon />
          </IconButton>
        </Stack>
        {children}
      </Box>
    </Modal>
  );
};

type TextInputTypes<T extends FieldValues> = {
  label: string;
  title: Path<T>;
  register: UseFormRegister<T>;
  maxLength: number;
  errors: Partial<FieldErrorsImpl<T>>;
};

// function TextInputComponent<T>(prop: TextInputTypes<T>) {
//   const { label, title , register, maxLength, errors } = prop;
//   return (
//     <TextField
//       variant="outlined"
//       label={label}
//       aria-label={`${title}-text-field`}
//       error={errors[title as keyof typeof errors] ? true : false}
//       helperText={errors?[title as keyof typeof errors]?.message}
//       {...register(title, {
//         required: `Provide the ${title} of your task.`,
//         minLength: {
//           value: 2,
//           message: `Please provide more characters for your ${title}.`,
//         },
//         maxLength: {
//           value: maxLength,
//           message: `Please remove some characters from your ${title}.`,
//         },
//       })}
//     />
//   );
// }

export { ModalWrapper };
