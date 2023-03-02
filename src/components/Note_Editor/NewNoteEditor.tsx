import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewNoteEditor = () => {
  const [value, setValue] = useState("");
  console.log(typeof value);
  const reactQuillRef = useRef();

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
};

export default NewNoteEditor;
