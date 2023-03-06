import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import EachReminderList from "./eachReminderList";

const Reminder = () => {
  return (
    <Container
      sx={{ px: { xs: 4, md: 12 } }}
      disableGutters={true}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", fontSize: { xs: 30, sm: 39, md: 48 } }}
      >
        Reminders
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
            <EachReminderList />
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Reminder;
