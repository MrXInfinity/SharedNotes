import React, { useState } from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import EachReminderList from "./eachReminderList";
import useFirestoreContext from "../../firestoreContext";
import { reminderType } from "../../types/firestoreDataTypes";
import NewReminderModal from "../../components/NewReminderModal";
import useFirestoreDb from "../../hooks/useFirestoreDb";
import UpdateReminderModal from "./updateReminderModal";

const Reminder = () => {
  const { dbData } = useFirestoreContext();
  const { updateReminder } = useFirestoreDb();

  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  const [selectedReminderData, setSelectedReminderData] =
    useState<reminderType>({} as reminderType);

  const updateReminderInitializer = ({
    title,
    startTime,
    endTime,
  }: Pick<reminderType, "title" | "startTime" | "endTime">) => {
    updateReminder({ id: selectedReminderData.id, startTime, title, endTime });
  };

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
            toggleModal={setIsReminderModalOpen}
            setData={setSelectedReminderData}
          />
        </Box>
      </Container>
      {Object.keys(selectedReminderData).length > 0 && (
        <UpdateReminderModal
          isOpen={isReminderModalOpen}
          setIsOpen={setIsReminderModalOpen}
          data={selectedReminderData}
          setData={setSelectedReminderData}
        />
      )}
    </>
  );
};

export default Reminder;
