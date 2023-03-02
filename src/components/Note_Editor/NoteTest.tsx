// Import the `Node` helper interface from Slate.
import { useMemo, useState } from "react";
import { createEditor, Descendant, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { dbDataType } from "../../context";
import { ModalWrapper } from "../UIComponents";

// Define a serializing function that takes a value and returns a string.
const serialize = (value: any) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n: any) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join("\n")
  );
};

const NoteTest: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noteContentData: dbDataType;
}> = ({ isOpen, setIsOpen, noteContentData }) => {
  const [editor] = useState(() => withReact(createEditor()));
  // Use our deserializing function to read the data from Local Storage.
  const [initialValue, setInitialValue] = useState<any>([
    { type: "heading-one", children: [{ text: noteContentData.title }] },
    {
      type: "paragraph",
      children: [
        {
          text: noteContentData.content,
        },
      ],
    },
  ]);

  return (
    <ModalWrapper
      isOpen={isOpen}
      title=""
      options={<></>}
      closeModal={() => setIsOpen(false)}
    >
      <Slate
        editor={editor}
        value={initialValue as Descendant[]}
        onChange={(value) => {
          setInitialValue(value);
        }}
      >
        <Editable />
      </Slate>
    </ModalWrapper>
  );
};

export default NoteTest;
