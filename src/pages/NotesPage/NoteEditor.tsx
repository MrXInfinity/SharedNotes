import CodeIcon from "@mui/icons-material/Code";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Editable, ReactEditor, Slate } from "slate-react";
import { MenuComponent, ModalWrapper } from "../../components/UIComponents";
import useFirestoreDb from "../../hooks/useFirestoreDb";
import { noteType } from "../../types/firestoreDataTypes";
import useNoteEditor from "./NoteEditorLogic";
import { BaseEditor } from "slate";
import { HistoryEditor } from "slate-history";

type CustomText = { text: string };
type CustomElement = { type: "paragraph"; children: CustomText[] };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

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

  const { update, remove } = useFirestoreDb();

  const { noteType, id, title, content } = noteData;

  if (Object.keys(noteData).length > 0) {
    return (
      <ModalWrapper
        isOpen={isOpen}
        closeModal={() => toggleModal(false)}
        title={
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "bold",
              fontSize: { xs: 16 },
            }}
          >
            {noteType.charAt(0).toUpperCase() + noteType.slice(1)} Notes
          </Typography>
        }
        options={
          <MenuComponent
            data={[
              {
                title: !noteData.favorite ? "Favorite" : "Unfavorite",
                icon: !noteData.favorite ? (
                  <FavoriteBorderIcon />
                ) : (
                  <FavoriteIcon />
                ),
                click: () => {
                  update({
                    id: noteData.id,
                    type: noteType,
                    favorite: !noteData.favorite,
                  });
                  toggleModal(false);
                },
              },
              {
                title: "Delete",
                icon: <DeleteIcon />,
                click: () => {
                  remove(noteType, noteData.id);
                  toggleModal(false);
                },
              },
            ]}
          />
        }
      >
        <Slate
          editor={titleEditor}
          value={noteData.title as any}
          onChange={(value: any) => {
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
          value={(noteData.content as any) ?? (initialValue as any)}
          onChange={(value: any) => {
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
            update({ type: noteType, id, title, content });
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
