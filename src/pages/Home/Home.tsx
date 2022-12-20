import Typography from "@mui/material/Typography";
import { Box, Container, Fab, Stack } from "@mui/material";
import RecentComponent from "./RecentComponent";
import TodayComponent from "./TodayComponent";

const Home = () => {
  return (
    <Container sx={{ px: 3 }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold" }}
      >
        Welcome
      </Typography>
      <Typography>Johann Isaiah Mendoza</Typography>
      <Stack
        sx={{ my: 3 }}
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
        direction="column"
        spacing={{ xs: 2, md: 4 }}
      >
        <TodayComponent category="Reminder" />
        <TodayComponent category="Task" />
      </Stack>
    </Container>
  );
};

export default Home;
