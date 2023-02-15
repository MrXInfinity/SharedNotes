import { Container, Pagination, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import EachNoteList from "../../components/EachNoteList";
import { useFirestoreDb } from "../../hooks/useFirestoreDb";
import useFirestoreContext from "../../context";

const NotePage: React.FC<{ category: string }> = ({ category }) => {
  const { dbData, fetchDocuments } = useFirestoreContext();

  useEffect(() => {
    fetchDocuments(category);
  }, [category]);

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
            <EachNoteList data={dbData[category]} />
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotePage;
