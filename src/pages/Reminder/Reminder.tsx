import React, { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import EachReminderList from "./eachReminderList";
import useFirestoreContext from "../../firestoreContext";
import { reminderType } from "../../types/firestoreDataTypes";

const Reminder = () => {
  const { dbData } = useFirestoreContext();

  const [selectedReminderData, setSelectedReminderData] =
    useState<reminderType>({} as reminderType);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

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
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: 20,
            paddingTop: 10,
          }}
        >
          <EachReminderList
            data={dbData["Reminder"]}
            toggleModal={setIsReminderModalOpen}
            setData={setSelectedReminderData}
          />
        </div>
      </Stack>
    </Container>
  );
};

export default Reminder;
