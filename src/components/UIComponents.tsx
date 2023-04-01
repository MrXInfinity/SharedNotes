import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

const ModalWrapper: React.FC<{
  isOpen: boolean;
  title: string | JSX.Element;
  closeModal: () => void;
  options?: JSX.Element;
  children: React.ReactNode;
}> = ({ isOpen, title, closeModal, children, options }) => {
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
          sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
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
          <Stack direction="row">
            {options}
            <IconButton onClick={() => closeModal()}>
              <CloseIcon />
            </IconButton>
          </Stack>
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

export { ModalWrapper };
