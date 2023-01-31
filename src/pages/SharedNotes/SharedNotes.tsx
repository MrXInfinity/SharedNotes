import { Container, Pagination, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EachNoteList from "../../components/EachNoteList";
import { useFirestoreDb } from "../../hooks/useFirestoreDb";

const SharedNotes = () => {
  const { getNotes, dbData } = useFirestoreDb();

  useEffect(() => {
    getNotes();
  }, []);

  console.log(dbData);
  return (
    <Container sx={{ px: 3 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", fontSize: { xs: 30, sm: 39, md: 48 } }}
      >
        Shared Notes
      </Typography>
      <EachNoteList category={"to me"} />
    </Container>
  );
};

export default SharedNotes;
