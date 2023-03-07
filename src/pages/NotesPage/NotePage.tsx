import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import EachNoteList from "./EachNoteList";
import useFirestoreContext from "../../firestoreContext";

const NotePage: React.FC<{ category: string }> = ({ category }) => {
  const { dbData, setNoteContentData, setIsNoteEditorModalOpen } =
    useFirestoreContext();

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
              toggleModal={setIsNoteEditorModalOpen}
              setNoteData={setNoteContentData}
            />
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotePage;
