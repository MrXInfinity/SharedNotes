import { Box, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import NoteList from "./NoteList";
import useFirestoreContext from "../../firestoreContext";
import { noteType } from "../../types/firestoreDataTypes";
import NoteEditor from "./NoteEditor";
import PageLayout from "../../components/PageLayout";

const NotePage: React.FC<{ category: "Private" | "Shared" }> = ({
  category,
}) => {
  return (
    <PageLayout
      title={`${category} Notes`}
      pageList={<NoteList category={category} />}
    />
  );
};

export default NotePage;
