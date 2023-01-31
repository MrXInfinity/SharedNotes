import Typography from "@mui/material/Typography";
import { Box, Container, Fab, Stack } from "@mui/material";
import RecentComponent from "./RecentComponent";
import TodayComponent from "./TodayComponent";
import { auth } from "../../firebase";

const Home = () => {
  console.log(auth.currentUser);
  return (
    <Container
      sx={{ px: { xs: 4, md: 12 } }}
      maxWidth="lg"
      disableGutters={true}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: { xs: 48, sm: 56, md: 64 },
          mb: { xs: -1, sm: -2 },
        }}
      >
        Welcome
      </Typography>
      <Typography
        sx={{
          fontWeight: { xs: "medium", sm: 400 },
          fontSize: { xs: 20, sm: 20, md: 24 },
        }}
      >
        {auth.currentUser?.displayName}
      </Typography>
      <Stack
        sx={{ my: 3, display: "flex" }}
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 4 }}
      >
        <RecentComponent
          header={"Created"}
          category={"createdAt"}
        />
        <RecentComponent
          header={"Updated"}
          category={"updatedAt"}
        />
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 4 }}
      >
        <TodayComponent category="Reminder" />
        <TodayComponent category="Task" />
      </Stack>
    </Container>
  );
};

export default Home;
