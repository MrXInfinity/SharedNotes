import { Container, Pagination, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EachNoteList from "../../components/EachNoteList";
import { useFetchedNotes } from "../../hooks/useFirestoreDb";

const SharedNotes = () => {
  const { dbData } = useFetchedNotes("Shared");

  console.log(dbData);
  return (
    <Container
      sx={{ px: { xs: 4, md: 12 } }}
      disableGutters={true}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", fontSize: { xs: 30, sm: 39, md: 48 } }}
      >
        Shared Notes
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
            <EachNoteList data={dbData} />
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};

export default SharedNotes;
