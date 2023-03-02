import React, { useCallback, useMemo, useState } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from "slate";
import { withHistory } from "slate-history";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ModalWrapper } from "../UIComponents";
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
import { dbDataType } from "../../hooks/useFirestoreDb";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const NoteEditor: React.FC<{
  isOpen: boolean;
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  noteData: dbDataType;
  setNoteData: React.Dispatch<React.SetStateAction<dbDataType>>;
  updateNote: () => void;
}> = ({ isOpen, toggleModal, noteData, setNoteData, updateNote }) => {
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const headerRenderElement = useCallback(
    (props: any) => <HeaderElement {...props} />,
    []
  );
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const titleEditor = useMemo(() => withHistory(withReact(createEditor())), []);
  const contentEditor = useMemo(
    () => withHistory(withReact(createEditor())),
    []
  );
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];

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
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS];
                  toggleMark(contentEditor, mark);
                }
              }
            }}
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
        <Button onClick={() => updateNote()}>Submit</Button>
      </ModalWrapper>
    );
  } else {
    return <></>;
  }
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor: any, format: any, blockType = "type") => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType as keyof typeof n] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
};

const Element: React.FC<{ attributes: any; children: any; element: any }> = ({
  attributes,
  children,
  element,
}) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          style={style}
          {...attributes}
        >
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul
          style={style}
          {...attributes}
        >
          {children}
        </ul>
      );
    case "heading-one":
      return (
        <h1
          style={style}
          {...attributes}
        >
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2
          style={style}
          {...attributes}
        >
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li
          style={style}
          {...attributes}
        >
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol
          style={style}
          {...attributes}
        >
          {children}
        </ol>
      );
    default:
      return (
        <p
          style={style}
          {...attributes}
        >
          {children}
        </p>
      );
  }
};

const HeaderElement: React.FC<{
  attributes: any;
  children: any;
  element: any;
}> = ({ attributes, children, element }) => {
  return (
    <Typography
      sx={{ fontWeight: "bold", fontSize: { xs: 24 } }}
      {...attributes}
    >
      {children}
    </Typography>
  );
};

const Leaf: React.FC<{ attributes: any; children: any; leaf: any }> = ({
  attributes,
  children,
  leaf,
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton: React.FC<{ format: any; icon: any }> = ({
  format,
  icon,
}) => {
  const editor = useSlate();
  return (
    <IconButton
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </IconButton>
  );
};

const MarkButton: React.FC<{ format: any; icon: any }> = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </IconButton>
  );
};

export default NoteEditor;
