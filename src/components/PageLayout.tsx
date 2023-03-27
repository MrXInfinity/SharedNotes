import { Typography } from "@mui/material";
import { Container, Box } from "@mui/system";

const PageLayout: React.FC<{
  title: string;
  pageList: JSX.Element;
  modal?: JSX.Element;
}> = ({ title, pageList, modal }) => {
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
          {title}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
              lg: "repeat(5, minmax(0, 1fr))",
              xl: "repeat(6, minmax(0, 1fr))",
            },
            gap: 4,
            width: "100%",
            flexWrap: "wrap",
            paddingTop: 2,
            alignContent: "flex-end",
          }}
        >
          {pageList}
        </Box>
      </Container>
      {modal}
    </>
  );
};

export default PageLayout;
