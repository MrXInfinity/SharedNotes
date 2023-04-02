import { Typography } from "@mui/material";
import parse from "html-react-parser";
import React from "react";
import { ModalWrapper } from "../../components/UIComponents";

const PublicNotePreview: React.FC<{
  data: { title: string; content: string };
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ data, isOpen, setIsOpen }) => {
  if (data) {
    const { title, content } = data;
    console.log(content);
    return (
      <ModalWrapper
        isOpen={isOpen}
        title="Notes Preview"
        closeModal={() => setIsOpen(false)}
      >
        <Typography sx={{ fontSize: { xs: 16, sm: 20 }, fontWeight: "medium" }}>
          {title}
        </Typography>
        <Typography>{parse(content)}</Typography>
      </ModalWrapper>
    );
  } else {
    return <></>;
  }
};

export default PublicNotePreview;
