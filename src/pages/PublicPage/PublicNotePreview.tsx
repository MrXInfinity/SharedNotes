import { Typography } from "@mui/material";
import React from "react";
import { ModalWrapper } from "../../components/UIComponents";
import { publicNoteType } from "../../types/firestoreDataTypes";

const PublicNotePreview: React.FC<{
  data: { title: string; content: string };
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, isOpen, setIsOpen }) => {
  if (data) {
    const { title, content } = data;
    return (
      <ModalWrapper
        isOpen={isOpen}
        title="Notes Preview"
        closeModal={() => setIsOpen(false)}
      >
        <Typography>{title}</Typography>
        <Typography>{content}</Typography>
      </ModalWrapper>
    );
  } else {
    return <></>;
  }
};

export default PublicNotePreview;
