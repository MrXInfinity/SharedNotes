import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import RecentComponent from "./RecentComponent";

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

      <div>
        <RecentComponent
          title={"created"}
          category={"createdAt"}
        />
        <RecentComponent
          title={"Updated"}
          category={"updatedAt"}
        />
      </div>
    </Container>
  );
};

export default Home;
