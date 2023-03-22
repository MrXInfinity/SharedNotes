import React, { useState } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import useFirestoreContext from "../../firestoreContext";
import { taskType } from "../../types/firestoreDataTypes";
import EachTaskList from "./eachTaskList";

const Task = () => {
  const { dbData } = useFirestoreContext();
  const [selectedTaskData, setSelectedTaskData] = useState<taskType>(
    {} as taskType
  );
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <Container
      sx={{ px: { xs: 4, md: 12 } }}
      disableGutters={true}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", fontSize: { xs: 24, sm: 39, md: 48 } }}
      >
        Tasks
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
        <EachTaskList
          data={dbData["Tasks"]}
          setData={setSelectedTaskData}
          toggleModal={setIsTaskModalOpen}
        />
      </Box>
    </Container>
  );
};

export default Task;
