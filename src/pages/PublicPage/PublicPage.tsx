import { Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import React from "react";
import PageLayout from "../../components/PageLayout";
import PublicList from "./PublicList";

const PublicPage = () => {
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
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
            flexWrap: "wrap",
            paddingTop: 2,
            alignContent: "flex-end",
          }}
        >
          <PublicList />
        </Box>
      </Container>
      <></>
    </>
  );
};

export default PublicPage;
