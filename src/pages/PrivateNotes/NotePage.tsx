import { Container, Pagination, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EachNoteList from "../../components/EachNoteList";
import { dbDataType, useFirestoreDb } from "../../hooks/useFirestoreDb";
import NoteEditor from "../../components/Note_Editor/NoteEditor";
import NoteTest from "../../components/Note_Editor/NoteTest";
import { Node } from "slate";
import NewNoteEditor from "../../components/Note_Editor/NewNoteEditor";

const NotePage: React.FC<{ category: string }> = ({ category }) => {
  const {
    dbData,
    noteContentData,
    setNoteContentData,
    isModalOpen,
    setIsModalOpen,
    updateNote,
  } = useFirestoreDb(category);
  console.log(noteContentData);

  return (
    <Container
      sx={{ px: { xs: 4, md: 12 } }}
      disableGutters={true}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", fontSize: { xs: 30, sm: 39, md: 48 } }}
      >
        {category} Notes
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex" }}
      >
        <Stack sx={{ display: "flex" }}>
          <Typography sx={{ margin: 1, fontWeight: "medium" }}>
            to me
          </Typography>
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <EachNoteList
              data={dbData[category]}
              toggleModal={setIsModalOpen}
              setNoteData={setNoteContentData}
            />
          </div>
        </Stack>
      </Stack>
      <NoteEditor
        isOpen={isModalOpen}
        toggleModal={setIsModalOpen}
        noteData={noteContentData}
        setNoteData={setNoteContentData}
        updateNote={updateNote}
      />
    </Container>
  );
};

export default NotePage;
