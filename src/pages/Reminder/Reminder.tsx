import React, { useState } from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import EachReminderList from "./eachReminderList";
import useFirestoreContext from "../../firestoreContext";
import { reminderType } from "../../types/firestoreDataTypes";
import NewReminderModal from "../../components/NewReminderModal";

const Reminder = () => {
  const { isNewReminderModalOpen, setIsNewReminderModalOpen, dbData } =
    useFirestoreContext();

  const [selectedReminderData, setSelectedReminderData] =
    useState<reminderType>({} as reminderType);

  return (
    <>
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
          }}
        >
          <EachReminderList
            data={dbData["Reminder"]}
            toggleModal={setIsNewReminderModalOpen}
            setData={setSelectedReminderData}
          />
        </Box>
      </Container>
      <NewReminderModal
        isOpen={isNewReminderModalOpen}
        setIsOpen={setIsNewReminderModalOpen}
      />
    </>
  );
};

export default Reminder;
