import { Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import React, { useState } from "react";
import PageLayout from "../../components/PageLayout";
import useFirestoreContext from "../../firestoreContext";
import { publicNoteType } from "../../types/firestoreDataTypes";
import EachPublicItem from "./PublicList";
import PublicNotePreview from "./PublicNotePreview";

const PublicPage = () => {
  const { publicData: data } = useFirestoreContext();
  const [selectedOnPreview, setSelectedOnPreview] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const [isPreviewModalOpen, setisPreviewModalOpen] = useState(false);
  return (
    <>
      <Container
        sx={{ px: { xs: 4, md: 12 } }}
        disableGutters={true}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", fontSize: { xs: 24, sm: 39, md: 48 } }}
        >
          Public Page
        </Typography>
        <Box
          sx={{
            display: { xs: "flex", lg: "grid" },
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",

            flexDirection: "column",
            gap: 4,
            width: "100%",
            flexWrap: "wrap",
            paddingTop: 2,
            alignContent: "flex-end",
          }}
        >
          {data ? (
            data.map((eachData: publicNoteType, index) => (
              <EachPublicItem
                data={eachData}
                setPreviewData={setSelectedOnPreview}
                index={index}
                toggleModal={setisPreviewModalOpen}
              />
            ))
          ) : (
            <></>
          )}
        </Box>
      </Container>
      <PublicNotePreview
        data={selectedOnPreview}
        isOpen={isPreviewModalOpen}
        setIsOpen={setisPreviewModalOpen}
      />
    </>
  );
};

export default PublicPage;
