import React from "react";
import { useSlate } from "slate-react";
import { Editor, Transforms, Element as SlateElement } from "slate";
import { IconButton } from "@mui/material";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: any) =>
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
