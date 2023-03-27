import { Container, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { auth } from "../../firebase";
import useFirestoreContext from "../../firestoreContext";
import { reminderType, taskType } from "../../types/firestoreDataTypes";
import RecentComponent from "./RecentComponent";
import TodayComponent from "./TodayComponent";

const Home = () => {
  const {
    dbData,
    userData: { firstname, lastname },
  } = useFirestoreContext();

  const filterList = <T,>(data: T[], category: keyof T) =>
    data.filter((eachData) =>
      moment().isSame(
        moment(parseInt(eachData[category as keyof typeof eachData])),
        "day"
      )
    );

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
        {firstname} {lastname}
      </Typography>
      <Stack
        sx={{ my: 3, display: "flex" }}
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 4 }}
      >
        <RecentComponent category={"Private"} />
        <RecentComponent category={"Shared"} />
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 2, md: 4 }}
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
