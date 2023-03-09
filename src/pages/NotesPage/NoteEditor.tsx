import React from "react";
import { Editable, Slate } from "slate-react";
import { Box, Button, Typography } from "@mui/material";
import { ModalWrapper } from "../../components/UIComponents";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import CodeIcon from "@mui/icons-material/Code";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import useNoteEditor from "./NoteEditorLogic";
import { noteType, updateNoteType } from "../../types/firestoreDataTypes";
import useFirestoreDb from "../../hooks/useFirestoreDb";

const NoteEditor: React.FC<{
  isOpen: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  noteData: noteType;
  setNoteData: React.Dispatch<React.SetStateAction<noteType>>;
}> = ({ isOpen, toggleModal, noteData, setNoteData }) => {
  const {
    keyDownEvent,
    renderLeaf,
    renderElement,
    headerRenderElement,
    titleEditor,
    contentEditor,
    initialValue,
    MarkButton,
    BlockButton,
  } = useNoteEditor();

  const { updateNote } = useFirestoreDb();

  const { noteType, id, title, content } = noteData;

  if (Object.keys(noteData).length > 0) {
    return (
      <ModalWrapper
        isOpen={isOpen}
        title={
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: { xs: 16 },
            }}
          >
            Shared Notes
          </Typography>
        }
        options={<></>}
        closeModal={() => toggleModal(false)}
      >
        <Slate
          editor={titleEditor}
          value={noteData.title}
          onChange={(value) => {
            setNoteData((prev) => ({
              ...prev,
              title: value,
            }));
          }}
        >
          <Editable
            renderElement={headerRenderElement}
            placeholder="Enter title..."
          />
        </Slate>
        <Slate
          editor={contentEditor}
          value={
            typeof noteData.content === "string"
              ? initialValue
              : noteData.content
          }
          onChange={(value) => {
            setNoteData((prev) => ({
              ...prev,
              content: value,
            }));
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter text..."
            spellCheck
            autoFocus
            onKeyDown={(event) => keyDownEvent(event, contentEditor)}
          />
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}>
            <MarkButton
              format="bold"
              icon={<FormatBoldIcon />}
            />
            <MarkButton
              format="italic"
              icon={<FormatItalicIcon />}
            />
            <MarkButton
              format="underline"
              icon={<FormatUnderlinedIcon />}
            />
            <MarkButton
              format="code"
              icon={<CodeIcon />}
            />
            <BlockButton
              format="heading-one"
              icon={<LooksOneIcon />}
            />
            <BlockButton
              format="heading-two"
              icon={<LooksTwoIcon />}
            />
            <BlockButton
              format="block-quote"
              icon={<FormatQuoteIcon />}
            />

            <BlockButton
              format="numbered-list"
              icon={<FormatListNumberedIcon />}
            />
            <BlockButton
              format="bulleted-list"
              icon={<FormatListBulletedIcon />}
            />
            <BlockButton
              format="left"
              icon={<FormatAlignLeftIcon />}
            />
            <BlockButton
              format="center"
              icon={<FormatAlignCenterIcon />}
            />
            <BlockButton
              format="right"
              icon={<FormatAlignRightIcon />}
            />
            <BlockButton
              format="justify"
              icon={<FormatAlignJustifyIcon />}
            />
          </Box>
        </Slate>
        <Button
          onClick={() => {
            toggleModal(false);
            updateNote({ noteType, id, title, content });
          }}
        >
          Submit
        </Button>
      </ModalWrapper>
    );
  } else {
    return <></>;
  }
};

export default NoteEditor;
