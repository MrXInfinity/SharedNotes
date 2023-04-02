import { Box, Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { auth } from "../../firebase";
import useAppContext from "../../context";
import { reminderType, taskType } from "../../types/firestoreDataTypes";
import RecentComponent from "./RecentComponent";
import TodayComponent from "./TodayComponent";

const Home = () => {
  const {
    dbData,
    userData: { firstname, lastname },
  } = useAppContext();

  const filterList = <T,>(data: T[], category: keyof T) =>
    data.filter((eachData) =>
      moment().isSame(
        moment(parseInt(eachData[category as keyof typeof eachData])),
        "day"
      )
    );

  return (
    <Container
      sx={{ px: { xs: 4, sm: 6 }, pt: { sm: 2, md: 3 } }}
      maxWidth="lg"
      disableGutters={true}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: { xs: 48, sm: 56, md: 72, lg: 84 },
          mb: { xs: -1, sm: -2 },
        }}
      >
        Welcome
      </Typography>
      <Typography
        sx={{
          fontWeight: { sm: "light" },
          fontSize: { xs: 16, sm: 18, md: 20 },
        }}
      >
        {firstname} {lastname}
      </Typography>
      <Box
        sx={{
          my: { xs: 4, md: 4 },
          display: { xs: "flex", sm: "grid" },
          flexDirection: "column",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: { xs: 2, sm: 4, lg: 6 },
        }}
      >
        <RecentComponent category={"Private"} />
        <RecentComponent category={"Shared"} />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 2, sm: 4, lg: 6 }}
      >
        <TodayComponent
          data={filterList<reminderType>(dbData.Reminder, "startTime")}
          category="Reminder"
        />
        <TodayComponent
          data={filterList<taskType>(dbData.Tasks, "dueDateTime")}
          category="Tasks"
        />
      </Stack>
    </Container>
  );
};

export default Home;
