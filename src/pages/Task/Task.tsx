import React, { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
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
        sx={{ fontWeight: "bold", fontSize: { xs: 30, sm: 39, md: 48 } }}
      >
        Tasks
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex" }}
      >
        <Stack sx={{ display: "flex" }}>
          <div
            style={{
              display: "inline-flex",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <EachTaskList
              data={dbData["Tasks"]}
              setData={setSelectedTaskData}
              toggleModal={setIsTaskModalOpen}
            />
          </div>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Task;
