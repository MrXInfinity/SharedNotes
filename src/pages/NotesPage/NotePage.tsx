import { Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import EachNoteList from "./EachNoteList";
import useFirestoreContext from "../../firestoreContext";
import { noteType } from "../../types/firestoreDataTypes";
import NoteEditor from "./NoteEditor";

const NotePage: React.FC<{ category: "Private" | "Shared" }> = ({
  category,
}) => {
  const { dbData } = useFirestoreContext();
  const [noteContentData, setNoteContentData] = useState<noteType>(
    {} as noteType
  );

  const [isNoteEditorModalOpen, setIsNoteEditorModalOpen] = useState(false);

  return (
    <>
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
                toggleModal={setIsNoteEditorModalOpen}
                setData={setNoteContentData}
              />
            </div>
          </Stack>
        </Stack>
      </Container>
      <NoteEditor
        isOpen={isNoteEditorModalOpen}
        toggleModal={setIsNoteEditorModalOpen}
        noteData={noteContentData}
        setNoteData={setNoteContentData}
      />
    </>
  );
};

export default NotePage;
